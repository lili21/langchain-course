import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
import "dotenv/config";

const agent = new HttpsProxyAgent("http://localhost:8001");

export const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  httpAgent: agent,
});


async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "what is 3+3*5?" }],
    temperature: 0,
    // stream: true,
  });

  console.log(completion.choices[0].message);
}
main().catch(console.error);
