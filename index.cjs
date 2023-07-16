const { Configuration, OpenAIApi } = require("openai");
const { HttpsProxyAgent } = require('https-proxy-agent');
require('dotenv/config')

// const agent = new HttpProxyAgent('https://c19s3.jjcruises.com:39967');
const agent = new HttpsProxyAgent('http://localhost:8001');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function main() {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": "hello"
        }
      ],
      temperature: 0,
      // stream: true,
    }, {
      // timeout: 5000,
      // httpAgent: agent,
      httpsAgent: agent
    });

    console.log(response.data.choices)
  } catch (e) {
    console.log('---- error ----', e);
  }
}

main();
