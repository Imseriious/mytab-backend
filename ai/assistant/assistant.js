const { OpenAI } = require("openai");
const assistantInstructions = require("./instructions");

require("dotenv").config(); 

const openai = new OpenAI({
  api_key: process.env.OPENAI_API_KEY
});


const assistantName = "Dona";
const assistantModel = "gpt-4-1106-preview";

async function getAssistant(username) {
  const instructions = assistantInstructions(assistantName, username);
  const assistant = await openai.beta.assistants.create({
    name: assistantName,
    instructions: instructions,
    model: assistantModel,
  });

  return assistant;
}

module.exports = getAssistant;
