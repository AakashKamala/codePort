const axios = require('axios');
require("dotenv").config();

const openaiApiKey = process.env.OPENAIAPIKEY;

async function sendMessageToChatGPT(userMessage, targetLanguage) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a code converter, which converts the code from one language to another, and you have only two types of responses, either you reply with just the code and nothing else, or if the input is not a code or unrecognizable code you simply return "cannot recognize code".' },
          { role: 'user', content: userMessage },
          { role: 'user', content: `Destination Language: ${targetLanguage}` },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

async function codeConverterController(req, res) {
  try {
    const userMessage = req.query.message || '';
    const targetLanguage = req.query.targetLanguage || 'defaultLanguage'; 
    const chatGptResponse = await sendMessageToChatGPT(userMessage, targetLanguage);

    res.status(200).json({ response: chatGptResponse });
  } catch (error) {
    console.error('Error in codeConverterController:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = codeConverterController;
