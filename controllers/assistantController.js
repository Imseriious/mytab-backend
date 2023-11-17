const User = require("../models/userModel");
const getAssistant = require("../ai/assistant/assistant");

const { OpenAI } = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  api_key: process.env.OPENAI_API_KEY,
});

async function talkAssistant(req, res) {
  try {
    if (!req.user._id) {
      res.status(401).json({ message: "User not found" });
    }
    const user = await User.findById(req.user._id);
    const userDailyLimit = 20;
    let threadId;
    if (user.assistant && user.assistant.threadId) {
      threadId = user.assistant.threadId;
    } else {
      const newThread = await openai.beta.threads.create();
      threadId = newThread.id;
      user.assistant = user.assistant || {};
      user.assistant.threadId = threadId;
      await user.save();
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let todayMessageCount = user.assistant.messagesCount.find(
      (mc) => mc.date.toISOString() === today.toISOString()
    );

    if (todayMessageCount) {
      if (todayMessageCount.count >= userDailyLimit) {
        return res.status(429).json({
          message: `Wow, time flies when we're having fun 🚀. You have hit your ${userDailyLimit}-message limit for today. Let's catch up again tomorrow`,
          role: "assistant",
          id: "limit-message",
        });
      }
      todayMessageCount.count++;
    } else {
      user.assistant.messagesCount.push({ count: 1, date: today });
    }

    await user.save();

    const userQuestion = req.body.message;

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userQuestion,
    });

    const assistant = await getAssistant(user.username);

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistant.id,
    });

    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    const maxAttempts = 10;
    let attempts = 0;

    while (runStatus.status !== "completed" && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      attempts++;
    }

    if (runStatus.status === "completed") {
      const messages = await openai.beta.threads.messages.list(threadId);
      res.json(messages.data);
    } else {
      res
        .status(202)
        .json({ message: "Run is still in progress or timed out" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  talkAssistant,
};
