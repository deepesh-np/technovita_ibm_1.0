import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/llm/query", async (req, res) => {
  const { prompt, selectedLLMs } = req.body;
  const responses = {};

  for (const llm of selectedLLMs) {
    try {
      if (llm === "openai") {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        });
        responses["openai"] = completion.choices[0]?.message?.content || "";
      }

      if (llm === "deepseek") {
        const completion = await axios.post(
          "https://api.deepseek.com/chat/completions",
          {
            model: "deepseek-chat",
            messages: [{ role: "user", content: prompt }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            },
          }
        );
        responses["deepseek"] =
          completion.data.choices[0]?.message?.content || "";
      }

      if (llm === "meta") {
        const completion = await axios.post(
          "https://api.meta.ai.com/v1/chat/completions",
          {
            model: "meta-llama/Meta-Llama-3-70B-Instruct",
            messages: [{ role: "user", content: prompt }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.META_API_KEY}`,
            },
          }
        );
        responses["meta"] = completion.data.choices[0]?.message?.content || "";
      }
    } catch (err) {
      console.error(`${llm} failed:`, err.message);
      responses[llm] = "Error fetching response.";
    }
  }

  res.json(responses);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🧠 LLM Aggregator backend running on port ${PORT}`);
});
