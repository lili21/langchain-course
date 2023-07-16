import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate, HumanMessagePromptTemplate } from 'langchain/prompts'
import { HttpsProxyAgent } from 'https-proxy-agent'
import 'dotenv/config';

const chat = new ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY }, {
  baseOptions: {
    httpsAgent: new HttpsProxyAgent('http://localhost:8001')
  }
});

const templateString = `
  Translate the text
  that is delimited by double quote
  into a style that is {style}.
  text: "{text}"
`

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate(templateString)
])

const customEmail = `
  Arrr, I be fuming that me blender lid
  flew off and splattered me kitchen walls
  with smoothie! And to make matters worse,
  the warranty don't cover the cost of
  cleaning up me kitchen. I need yer help
  right now, matey!
`

const style = `
  American English
  in a calm and respectful tone
`

const messages = await chatPrompt.formatMessages({ style, text: customEmail });

const response = await chat.call(messages);

console.log(response)
