import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const input = body.prompt.trim();
  const model = "gpt-3.5-turbo";

  const { OpenAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OpenAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const messages = [{
    role: "system", content: `You are an AI language model that converts text input to JSON data output. Each user provided input will be a text describing one or more trips. Your task is to parse the trips and return them as a formatted JSON array of objects. Even if there's only one trip you must always return an array of the JSON object(s). All time values need to be converted from am/pm into the 24-hour format HH:MM (examples: "8:15 pm" becomes "20:15" and "6:00 am" becomes "06:00"). Ensure that each trip object has the following properties, formatted accordingly:

      pickup_time: A string representing the time to arrive at the pickup location in 24-hour format "HH:MM".
      passenger_name: A string containing the passenger's name.
      passenger_phone: A string containing the passenger's phone number in the format "###-###-####".
      pickup_name: A string for the pickup location name. Use "Home" for home addresses, the facility name for medical facilities, and the business name for businesses.
      pickup_location_unit: A string for the unit number of the pickup location address or an empty string if there is no unit number.
      pickup_location_street: A string for the street name of the pickup location address.
      pickup_location_city: A string for the city of the pickup location address.
      drop_off_name: A string for the drop-off location name. Use "Home" for home addresses, the facility name for medical facilities, and the business name for businesses.
      drop_off_location_unit: A string for the unit number of the drop-off location address or an empty string if there is no unit number.
      drop_off_location_street: A string for the street name of the drop-off location address.
      drop_off_location_city: A string for the city of the drop-off location address.
      drop_off_time: A string for the start time of the passenger's appointment in 24-hour format "HH:MM" or an empty string if there is no appointment start time.
      notes: A string for any additional notes about the trip or an empty string if there are no additional notes. Notes may include information about the passenger's mobility aids, directions to find locations, or other helpful details for the driver.

    Please expand the following locations to include the full address:

    "NRGH"
      location name: NRGH
      location address: 1200 Dufferin Crescent
      location city: Nanaimo

    "Nanaimo Dialysis" or "Community Dialysis"
      location name: Nanaimo Dialysis
      location address: 1351 Estevan Rd
      location city: Nanaimo`
  },
  { role: "user", content: input }
  ];

  const completion = await openai.createChatCompletion({
    model,
    messages
  });

  const content = completion.data.choices[0].message?.content;
  if (!content) throw createError(500, "No content returned from OpenAI 🤷");
  // extract json from the content, because it could include regular text, even though we specified json in the prompt
  const start = content.indexOf("[");
  const end = content.lastIndexOf("]") + 1;
  const json = content.substring(start, end);
  const data = JSON.parse(json);
  return data;
});