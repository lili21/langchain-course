import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate, HumanMessagePromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { z } from 'zod'
import 'dotenv/config';

const chat = new ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY }, {
  baseOptions: {
    httpsAgent: new HttpsProxyAgent('http://localhost:8001')
  }
});

const customeReview = `
  This leaf blower is pretty amazing.  It has four settings:\
  candle blower, gentle breeze, windy city, and tornado. \
  It arrived in two days, just in time for my wife's \
  anniversary present. \
  I think my wife liked it so much she was speechless. \
  So far I've been the only one using it, and I've been \
  using it every other morning to clear the leaves on our lawn. \
  It's slightly more expensive than the other leaf blowers \
  out there, but I think it's worth it for the extra features.
`

const reviewTemplate = `
  For the following text, extract the following information:

  gift: Was the item purchased as a gift for someone else? \
  Answer True if yes, False if not or unknown.

  delivery_days: How many days did it take for the product \
  to arrive? If this information is not found, output -1.

  price_value: Extract any sentences about the value or price,\
  and output them as a comma separated Array.

  Format the output as JSON with the following keys:
  gift
  delivery_days
  price_value

  text: {text}

  {format_instructions}
`

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate(reviewTemplate)
])


const parser = StructuredOutputParser.fromZodSchema(z.object({
  gift: z.boolean().describe(`Was the item purchased as a gift for someone else? Answer True if yes, False if not or unknown.`),
  delivery_days: z.string().describe(`How many days did it take for the product to arrive? If this information is not found, output -1.`),
  price_value: z.array(z.string()).describe(`Extract any sentences about the value or price, and output them as a comma separated Array.`)
}))

const format_instructions = parser.getFormatInstructions();

const messages = await chatPrompt.formatMessages({ text: customeReview, format_instructions });

// console.log(messages)
const response = await chat.call(messages);

const output = await parser.parse(response.content);

console.log(output)
