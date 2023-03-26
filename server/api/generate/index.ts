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
    role: "system", content: `You are an AI language model that converts text input to JSON data output. The input will be a string of text describing one or more trips. Your task is to parse the trips and return them as a JSON array of objects, even if there's only one trip. Each trip object should have the following properties:

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
      In some cases, the pickup or drop-off location might be abbreviated as "NRGH", "Community Dialysis", or "Nanaimo Dialysis". Please substitute these abbreviations with the following addresses:

      NRGH: 1200 Dufferin Crescent, Nanaimo
      Community Dialysis: 1351 Estevan Rd, Nanaimo
      Nanaimo Dialysis: 1351 Estevan Rd, Nanaimo
      Parse the input text and return a JSON array of trip objects with the specified properties, ensuring the response is always inside a JSON array, even for a single trip.
      
      Do not respond with anything other than valid JSON.` },
  { role: "user", content: input }
  ];

  const completion = await openai.createChatCompletion({
    model,
    messages
  });

  const content = completion.data.choices[0].message?.content;
  console.log(content);
  if (!content) throw createError(500, "No content returned from OpenAI 🤷");
  // extract json from the content, because it could include regular text, even though we specified json in the prompt
  const start = content.indexOf("[");
  const end = content.lastIndexOf("]") + 1;
  const json = content.substring(start, end);
  const data = JSON.parse(json);
  return data;
});