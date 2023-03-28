import { Configuration, OpenAIApi } from "openai";
import type { Trip } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const { DEV } = useRuntimeConfig();
  const DEBUG_IN_DEV = DEV.toLowerCase() === "true" ? true : false;
  const startTime = Date.now();
  console.log("'/api/trips/generate'\tGenerating Trips...");

  const MODEL = "gpt-3.5-turbo";
  const { OPENAI_API_KEY } = useRuntimeConfig();

  const body = await readBody(event);
  const input = body.prompt.trim();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const messages = [{
    role: "system", content: `You are an AI language model that converts text input to JSON data output. Each user provided input will be a text describing one or more trips. Your task is to parse the trips and return them as a formatted JSON array of objects. Even if there's only one trip you must always return an array of the JSON object(s). All time values need to be converted from am/pm into the 24-hour format HH:MM (examples: "8:15 pm" becomes "20:15" and "6:00 am" becomes "06:00"). Ensure that each trip object has the following properties, formatted accordingly:

      raw: (Required) A string containing the raw tex representing this trip.
      pickup_time: (Required) A string representing the time to arrive at the pickup location in 24-hour format "HH:MM".
      passenger_name: (Required) A string containing the passenger's name.
      passenger_phone: A string containing the passenger's phone number in the format "###-###-####".
      pickup_location_name: A string for the pickup location name. Use "Home" for home addresses, the facility name for medical facilities, and the business name for businesses.
      pickup_location_unit: A string for the unit number of the pickup location address or an empty string if there is no unit number.
      pickup_location_street: (Required) A string for the street name of the pickup location address.
      pickup_location_city: (Required) A string for the city of the pickup location address.
      drop_off_name: A string for the drop-off location name. Use "Home" for home addresses, the facility name for medical facilities, and the business name for businesses.
      drop_off_location_unit: A string for the unit number of the drop-off location address or an empty string if there is no unit number.
      drop_off_location_street: (Required) A string for the street name of the drop-off location address.
      drop_off_location_city: (Required) A string for the city of the drop-off location address.
      drop_off_time: A string for the start time of the passenger's appointment in 24-hour format "HH:MM" or an empty string if there is no appointment start time.
      notes: A string for any additional notes about the trip or an empty string if there are no additional notes. Notes may include information about the passenger's mobility aids, directions to find locations, or other helpful details for the driver.

    ## Common Pickup and Drop Off Locations Mentioned Only By Name

    - NRGH
      This location may be referred to (ignoring case) as nrgh, nanaimo general, nanaimo general hospital, or similar names. The data for this location is as follows:
      name: "NRGH"
      unit: ""
      address: "1200 Dufferin Crescent"
      city: "Nanaimo"

    - Nanaimo Dialysis
      This location may be referred to (ignoring case) as nanaimo dialysis, community dialysis, or similar names. The data for this location is as follows:
        name: "Nanaimo Dialysis"
        unit: ""
        address: "1351 Estevan Rd"
        city: "Nanaimo"
      
    ## Here is one example:

    ### Input:
    "5:45 pm Glen K home from Community dialysis to 555 Aurora Street in Parksville.  Please call the unit and get his actual time so you know exactly what time to be there."
    
    ### Expected Response:
    [
      {
        "raw": "5:45 pm Glen K home from Community dialysis to 555 Aurora Street in Parksville. Please call the unit and get his actual time so you know exactly what time to be there."
        "passenger_name": "Glen K"
        "passenger_phone": ""
        "pickup_location_name": "Nanaimo Dialysis"
        "pickup_location_unit": ""
        "pickup_location_street": "1351 Estevan Rd"
        "pickup_location_city": "Nanaimo"
        "drop_off_location_name": "Home"
        "drop_off_location_unit": ""
        "drop_off_location_street": "555 Aurora Street"
        "drop_off_location_city": "Parksville"
        "drop_off_time": ""
        "notes": "Please call the unit and get his actual time so you know exactly what time to be there."
      }
    ]
    
    The user will now provide you with the original text input and the returned JSON data that is missing required fields. Remember to format your response into JSON and make sure that all the data is inside of an array of objects, even if there is only one object.`
  },
  { role: "user", content: input }
  ];

  const completion = await openai.createChatCompletion({
    model: MODEL,
    messages
  });

  const content = completion.data.choices[0].message?.content;
  if (!content) return createError(event, "No content returned from OpenAI 🤷", DEBUG_IN_DEV);
  // extract json from the content, because it could include regular text, even though we specified json in the prompt
  let data: Trip[] = await extractJsonData(content);
  // Make sure that we have all the required fields in each trip returned.
  // If we're missing a field, we need to fill it with "!!!!!!!!!!" to get the user's attention.
  let missingFields = false;
  const requiredFields = [
    "raw",
    "pickup_time",
    "passenger_name",
    "pickup_location_unit",
    "pickup_location_street",
    "pickup_location_city",
    "drop_off_location_unit",
    "drop_off_location_street",
    "drop_off_location_city",
  ];

  // TODO fix this
  data.forEach((trip) => {
    requiredFields.forEach((fieldName) => {
      if (!trip[fieldName] || trip[fieldName] === "") {
        console.log('missing field:', fieldName, trip[fieldName]);
        missingFields = true;
        trip[fieldName] = "!!!!!!!!!!";
      }
    });
  });

  // If we have missing fields, let's send a message back to ChatGPT to see if it can fill in the missing data. Include the conversation history for context.
  if (missingFields) {
    console.log('First response had missing fields. Sending back to ChatGPT to fill in the missing fields.');
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
      
      If an address name mentions a city name like "Victoria", "Courtenay", "Cumberland", etc., you can leave the address blank if you don't know it, but try to find an address for it if you know it, and always make sure you remember to include the city.
      
      The user will now provide you with the original text input and the returned JSON data that is missing required fields. Format your response in JSON format and make sure that all data is inside of an array, even if there is only one object.`
    },
    {
      role: "user", content: `The input was as follows:
    ${input}
    
    What was returned was as follows:
    ${JSON.stringify(data, null, 2)}

    Can you please use the input to find the missing required fields and respond with a JSON array of object(s) representing each trip?` },
    ];

    const completion = await openai.createChatCompletion({
      model: MODEL,
      messages
    });

    const content = completion.data.choices[0].message?.content;
    if (!content) return createError(event, "No content returned from OpenAI 🤷", DEBUG_IN_DEV);

    // extract json from the content, because it could include regular text, even though we specified json in the prompt
    data = await extractJsonData(content);
  }

  // Logging
  const requestDuration = Date.now() - startTime;
  const minutes = Math.floor(requestDuration / 60000);
  const seconds = ((requestDuration % 60000) / 1000).toFixed(0);
  const milliseconds = requestDuration % 1000;
  const requestDurationString = `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s ${milliseconds.toString().padStart(3, '0')}ms`;
  console.log(`'/api/trips/generate'\tGenerated ${data.length} trip${data.length > 1 ? 's' : ''} in ${requestDurationString}`);

  return data;
});

function extractJsonData(content: string) {
  const start = content.indexOf("[");
  const end = content.lastIndexOf("]");
  const json = content.substring(start, end + 1);
  const data: Trip[] = JSON.parse(JSON.stringify(json));
  return data;
}