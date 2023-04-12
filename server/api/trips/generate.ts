import type { Trip } from '@prisma/client';
import { Configuration, OpenAIApi } from "openai";
import { extractJsonData } from '~~/server/utils/extractJson';

const { OPENAI_API_KEY } = useRuntimeConfig();
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});

const model = "gpt-3.5-turbo";

const openai = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {
  let startTime = Date.now();
  const { prompt, date } = await readBody(event) as GenerateTripsBody;

  if (!prompt)
    return {
      status: 400,
      statusText: "Request must include prompt string in the body. Expected body: { prompt: string }",
    };
  if (!date)
    return {
      status: 400,
      statusText: "Request must include date string in the body. Expected body: { date: string }",
    };

  console.log("Generating trips...");
  const messages = generateMessage(prompt, date);

  console.info("Sending request to OpenAI...");
  let chatContent: string;
  try {
    const content = await openai.createChatCompletion({ model, messages }).then((completion) => completion.data.choices[0].message?.content);
    if (!content) throw new Error("No content returned from OpenAI");
    console.info("OpenAI response received successfully.");
    chatContent = content;
  } catch (e: Error) {
    console.error("Error generating trips:", e);
    sendError(event, "Error generating trips. This was not expected.");
  }

  console.info("Extracting JSON data from OpenAI response...");
  let data: Trip[];
  try {
    const extractedData = extractJsonData(chatContent);
    if (!extractedData) throw new Error("No JSON data found in OpenAI response");
    console.info("JSON data extracted successfully.");
    data = extractedData;
  } catch (e: Error) {
    console.error("Error extracting JSON data from OpenAI response:", e);
    sendError(event, e);
  }

  console.info("Checking for missing data...");

  if (data.length === 0) createError(event, "No trips were generated. This may be because the number of trips were too large for one response. Please try again with a smaller batches of trips.");

  const missingRequiredFields = checkForMissingData(data);
  if (missingRequiredFields) {
    try {
      const fixedData = await attemptToFixMissingData(data, prompt, event);
      if (!fixedData) throw new Error("Failed to fix missing data");
      console.info("Missing data fixed successfully.");
      data = fixedData;
    } catch (e: Error) {
      console.error("Error fixing missing data:", e);
      sendError(event, e);
    }
  }

  logRequestDuration(startTime, data);
  console.info("Trips generated successfully. Responding with trips...");
  return data;
});

function logRequestDuration(startTime: number, data: Trip[]) {
  const requestDuration = Date.now() - startTime;
  const minutes = Math.floor(requestDuration / 60000);
  const seconds = ((requestDuration % 60000) / 1000).toFixed(0);
  const milliseconds = requestDuration % 1000;
  const requestDurationString = `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s ${milliseconds.toString().padStart(3, '0')}ms`;
  log(`'/api/trips/generate'\tGenerated ${data.length} trip${data.length > 1 ? 's' : ''} in ${requestDurationString}`);
}

function checkForMissingData(data) {
  let missingFields = false;
  const requiredFields = [
    "raw",
    "date",
    "pickup_time",
    "passenger_name",
    "pickup_location_city",
    "pickup_location_street",
    "drop_off_location_city",
    "drop_off_location_street",
  ];

  // Check for missing fields
  data.forEach((trip) => {
    requiredFields.forEach((fieldName) => {
      if (!trip[fieldName] || trip[fieldName] === "") {
        missingFields = true; // indicates we have missing fields
        trip[fieldName] = "!!!!!!!!!!";
      }
    });
  });
  return missingFields;
}

async function attemptToFixMissingData(data, prompt, event) {
  log('First ChatGPT response had missing fields. Sending back to ChatGPT to fill in the missing fields.');
  const messages: ChatConversation = [{
    role: "system", content: `The following trips were generated using regular text describing one or more trips, but they are missing some required fields. Please fill in the missing fields and return the trips as a JSON array of objects.
      For context, the text might contain a location with only a name and no address. In this instance, you'll need to extract the address from one of the following provided addresses:

      "NRGH" or "Nanaimo General" or "Nanaimo General Hospital", etc. (case may vary)
        location name: NRGH
        location address: 1200 Dufferin Crescent
        location city: Nanaimo

      "Nanaimo Dialysis" or "Community Dialysis", etc. (case may vary)
        location name: Nanaimo Dialysis
        location address: 1351 Estevan Rd
        location city: Nanaimo
      
      The user will now provide you with the original text input and the returned JSON data that is missing required fields. Format your response in JSON format and make sure that all data is inside of an array, even if there is only one object.`
  },
  {
    role: "user", content: `The input was as follows:
    ${prompt}
    
    What was returned was as follows:
    ${JSON.stringify(data, null, 2)}

    Can you please use the input to find the missing required fields and respond with a JSON array of object(s) representing each trip?` },
  ];

  const completion = await openai.createChatCompletion({
    model,
    messages
  });

  const content = completion.data.choices[0].message?.content;
  if (!content) return createError(event, "No content returned from OpenAI 🤷");

  const newData = await extractJsonData(content);
  return newData;
}

function generateMessage(prompt: string, date: string) {
  return [{
    role: "system", content: `You are an AI that converts text to JSON output, parsing trips into an array of JSON objects. Convert time to 24-hour format (e.g. "8:15 pm" to "20:15"). Each trip object should have:
    - raw: (Required) Raw text of the trip.
    - date: ${date} (Required) Date should always be "${date}". It is always the same for all trips.
    - pickup_time: (Required) 24-hour format time to arrive at the pickup location.
    - passenger_name: (Required) Passenger's name.
    - passenger_phone: Passenger's phone number in "###-###-####" format or empty.
    - pickup_location_name: (Required) Name of the pickup location.
    - pickup_location_unit: Unit number of the pickup location or empty.
    - pickup_location_street: (Required) Street name of the pickup location.
    - pickup_location_city: (Required) City of the pickup location.
    - drop_off_location_name: (Required) Name of the drop-off location.
    - drop_off_location_unit: Unit number of the drop-off location or empty.
    - drop_off_location_street: (Required) Street name of the drop-off location.
    - drop_off_location_city: (Required) City of the drop-off location.
    - drop_off_time: Appointment start time in 24-hour format or empty.
    - notes: Additional notes about the trip or empty.
    
    # Common Locations (ignore case)
    - NRGH: NRGH, nanaimo general, nanaimo general hospital
      - name: "NRGH"
      - unit: ""
      - address: "1200 Dufferin Crescent"
      - city: "Nanaimo"
    - Nanaimo Dialysis: nanaimo dialysis, community dialysis
      - name: "Nanaimo Dialysis"
      - unit: ""
      - address: "1351 Estevan Rd"
      - city: "Nanaimo"

    # Examples:

    ## Input:
    "5:45 pm Glen K home from Community dialysis to 555 Aurora Street in Parksville. Please call the unit and get his actual time so you know exactly what time to be there."
    
    ## Expected Response:
    [
    {
    "raw": "5:45 pm Glen K home from Community dialysis to 555 Aurora Street in Parksville. Please call the unit and get his actual time so you know exactly what time to be there.",
    "date": "${date}",
    "passenger_name": "Glen K",
    "passenger_phone": "",
    "pickup_time": "17:45",
    "pickup_location_name": "Nanaimo Dialysis",
    "pickup_location_unit": "",
    "pickup_location_street": "1351 Estevan Rd",
    "pickup_location_city": "Nanaimo",
    "drop_off_location_name": "Home",
    "drop_off_location_unit": "",
    "drop_off_location_street": "555 Aurora Street",
    "drop_off_location_city": "Parksville",
    "drop_off_time": "",
    "notes": "Please call the unit and get his actual time so you know exactly what time to be there."
    }
    ]

    ## Input:
    "7:00 am John Doe home from NRGH to 85-847 Prideaux Street Nanaimo. Call John when you arrive."
    
    ## Expected Response:
    [
    {
    "raw": "7:00 am John Doe home from NRGH to 85-847 Prideaux Street Nanaimo. Call John when you arrive.",
    "date": "${date}",
    "passenger_name": "John Doe",
    "passenger_phone": "",
    "pickup_time": "07:00",
    "pickup_location_name": "NRGH",
    "pickup_location_unit": "",
    "pickup_location_street": "1200 Dufferin Crescent",
    "pickup_location_city": "Nanaimo",
    "drop_off_location_name": "Home",
    "drop_off_location_unit": "85",
    "drop_off_location_street": "847 Prideaux Street",
    "drop_off_location_city": "Nanaimo",
    "drop_off_time": "",
    "notes": "Call John when you arrive."
    }
    ]

    ## Input:
    "2:30 pm Mark Johnson home from #45-1234 Somename Drive Nanaimo to NRGH.
    
    Call Mark when close. 3:45 pm Emily Adams home from NRGH to 5678 Oceanview Lane Nanaimo."

    ## Expected Response:
    [
    {
    "raw": "2:30 pm Mark Johnson home from #45-1234 Somename Drive Nanaimo to NRGH. Call Mark when close.",
    "date": "${date}",
    "passenger_name": "Mark Johnson",
    "passenger_phone": "",
    "pickup_time": "14:30",
    "pickup_location_name": "Home",
    "pickup_location_unit": "45",
    "pickup_location_street": "1234 Somename Drive",
    "pickup_location_city": "Nanaimo",
    "drop_off_location_name": "NRGH",
    "drop_off_location_unit": "",
    "drop_off_location_street": "1200 Dufferin Crescent",
    "drop_off_location_city": "Nanaimo",
    "drop_off_time": "",
    "notes": "Call Mark when close."
    },
    {
    "raw": "3:45 pm Emily Adams home from NRGH to 5678 Oceanview Lane Nanaimo.",
    "date": "${date}",
    "passenger_name": "Emily Adams",
    "passenger_phone": "",
    "pickup_time": "15:45",
    "pickup_location_name": "NRGH",
    "pickup_location_unit": "",
    "pickup_location_street": "1200 Dufferin Crescent",
    "pickup_location_city": "Nanaimo",
    "drop_off_location_name": "Home",
    "drop_off_location_unit": "",
    "drop_off_location_street": "5678 Oceanview Lane",
    "drop_off_location_city": "Nanaimo",
    "drop_off_time": "",
    "notes": ""
    }
    ]

    ## Input:
    "10:15 am Jane Davis from 159-37 Adams Rd. in Campbell River ph 250-923-9452 to NRGH dialysis for 12:15 pm start"

    ## Expected Response:
    [
    {
    "raw": "10:15 am Jane Davis from 159-37 Adams Rd. in Campbell River ph 250-923-9452 to NRGH dialysis for 12:15 pm start",
    "date": "${date}",
    "passenger_name": "Jane Davis",
    "passenger_phone": "250-923-9452",
    "pickup_time": "10:15",
    "pickup_location_name": "Home",
    "pickup_location_unit": "159",
    "pickup_location_street": "37 Adams Rd.",
    "pickup_location_city": "Campbell River",
    "drop_off_location_name": "NRGH",
    "drop_off_location_unit": "",
    "drop_off_location_street": "1200 Dufferin Crescent",
    "drop_off_location_city": "Nanaimo",
    "drop_off_time": "12:15",
    "notes": ""
    }
    ]

    ## Input:
    "7:45 pm Lisa Martin home from Cumberland dialysis to 104-538 Dogwood Street in Campbell River"

    ## Expected Response:
    [
    {
    "raw": "7:45 pm Lisa Martin home from Cumberland dialysis to 104-538 Dogwood Street in Campbell River",
    "date": "${date}",
    "passenger_name": "Lisa Martin",
    "passenger_phone": "",
    "pickup_time": "19:45",
    "pickup_location_name": "Cumberland Dialysis",
    "pickup_location_unit": "";
    "pickup_location_street": "2696 Windermere Ave",
    "pickup_location_city": "Cumberland",
    "drop_off_location_name": "Home",
    "drop_off_location_unit": "104",
    "drop_off_location_street": "538 Dogwood Street",
    "drop_off_location_city": "Campbell River",
    "drop_off_time": "",
    "notes": ""
    }
    ]

    If you are missing an address but the location has a name like "Nanaimo Seniors Village", and it is not one of our common locations like "NRGH", do your best to find the address. If you can't find it, use "Nanaimo Seniors Village" as the street name.
    
    Format response as JSON array of objects even if there's only one object.`
  },
  { role: "user", content: prompt }
  ];
}