import { openai } from "./openai.js";

async function getCompletion(prompt) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  })

  return response.choices[0].message.content
}

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

const prompt = `
  Translate the text
  that is delimited by double quote
  into a style that is ${style}.
  text: "${customEmail}"
`

console.log(await getCompletion(prompt))
