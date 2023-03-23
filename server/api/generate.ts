// import { Configuration, OpenAIApi } from "openai";
// import { z } from "zod";

// const runtimeConfig = useRuntimeConfig();
// const { OPENAI_API_KEY } = runtimeConfig;

// if (!OPENAI_API_KEY) {
//   console.error("No API key. Are you sure you included it in your environment variables?");
// }

// const configuration = new Configuration({
//   organization: "org-9xVOsgyw2Y03jr4gVALdi0z2",
//   apiKey: OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const messagesSchema = z.object({
//   role: z.enum(["system", "user", "assistant"]),
//   content: z.string().nonempty().required(),
// });
// type MessageObject = z.infer<typeof messagesSchema>;

// // https://platform.openai.com/docs/api-reference/chat/create
// const chatCompletionRequestBodySchema = z.object({
//   information: z.string().nonempty().required(),
//   temperature: z.number().optional().min(0).max(2).default(1),
//   top_p: z.number().optional().min(0).max(1).default(1),
//   n: z.number().optional().int().positive().default(1),
//   stream: z.optional().default(false),
//   stop: z..union([z.string(), z.array(z.string().nonempty().max(4))]).optional().nullable().default(null),
//   max_tokens: z.number().optional().int().min(1).default(Infinity),
//   presence_penalty: z.number().optional().min(-2).max(2).default(0),
//   frequency_penalty: z.number().optional().min(-2).max(2).default(0),
//   user: 
// });
// type ChatCompletionRequestBody = z.infer<typeof chatCompletionRequestBodySchema>;

// async function getPromptResponse(chatRequestBody: ChatCompletionRequestBody) {
//   // Validation
//   chatCompletionRequestBodySchema.parse(chatRequestBody);

//   const { information, model, };
//   const model = "gpt-4";

//   const pre_prompt = `I'm about to give you a list of stops for a driver to make. Included in the data for each stop should be the arrival time, the full name of the individual being picked up, the location where they are being picked up and the address they are being taken to. Sometimes the address may include the unit number and/or the city. If no city is included, it is assumed to be Nanaimo. Sometimes there may be instructions for the driver like calling to confirm a pickup time. Sometimes there may be information about the passenger uses a wheelchair or walker. Sometimes there may be information about the passenger's vision. Sometimes there may be additional information about the passenger, trip, directions, or other general information. Trip information sometimes also includes the phone number for the passenger. I would like you to extract data from the stops and put it into a structured format. I will include examples of the format that I expect from you below.
  
//   There are two common named drop off locations that will not typically have the address provided with them. I would like you to recognize that Nanaimo Dialysis, also referred to as "Community Dialysis" or "Nanaimo Community" or "Nanaimo Dialysis" is the same location. The address for this location should be included in the structured data. The address is 1351 Estevan Rd, Nanaimo. The other location is the Nanaimo Regional General Hospital, or NRGH for short. The address for this location should be included in the structured data. The address is 1200 Dufferin Crescent, Nanaimo.

//   Even if there is only one trip, be sure to include the trip in a JSON array like this:

//   [
//     {
//       ...
//     },
//   ]

//   If we have multiple trips, do the same:

//   [
//     {
//       ...
//     },
//     {
//       ...
//     },
//   ]
  
//   Here is an example of the data structure for one trip:
//   {
//     "arrival_time": "09:00",
//     "passenger_name": "John Smith",
//     "passenger_phone": "250-555-5555",
//     "pickup_name": "Home",
//     "pickup_unit": "",
//     "pickup_street": "123 Main Street",
//     "pickup_city": "Nanaimo",
//     "drop_off_name": "NRGH",
//     "drop_off_unit": "",
//     "drop_off_street": "1200 Dufferin Crescent",
//     "drop_off_city": "Nanaimo",
//     "appointment_time": "09:15",
//     "wheelchair": false,
//     "walker": false,
//     "vision_impairment": false,
//     "trip_info": "Call to confirm pickup time",
//     "other_info": "Passenger is a little hard of hearing"
//   }

//   Here is an example of the data structure for another trip:
//   {
//     "arrival_time": "14:15",
//     "passenger_name": "Jane Doe",
//     "passenger_phone": "250-555-5555",
//     "pickup_name": "Community Dialysis",
//     "pickup_unit": "",
//     "pickup_street": "1351 Estevan Road",
//     "pickup_city": "Nanaimo",
//     "drop_off_name": "Home",
//     "drop_off_unit": "123",
//     "drop_off_street": "123 Main Street",
//     "drop_off_city": "Nanaimo",
//     "appointment_time": "",
//     "wheelchair": true,
//     "walker": false,
//     "vision_impairment": false,
//     "trip_info": "",
//     "other_info": ""
//   }
//   `;
//   const prompt = { "role": "user", "content": };

//   const result = await openai.createChatCompletion({
//     model,
//     prompt,
//     temperature,
//     max_tokens,
//     top_p,
//     frequency_penalty,
//     presence_penalty,
//     stop,
//   });

//   return result.data.choices[0].text;
// }

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const { prompt, otherParams } = body;
//   const valid = typeof prompt === "string" && typeof otherParams === "object";

//   const response = await getPromptResponse(prompt, otherParams);

//   return response;
// });