import { Request, Response } from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generateMessage = async (req: Request, res: Response): Promise<any> => {
  const { name, job_title, company, location, summary } = req.body;

  if (!name || !job_title || !company) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `Write a short, friendly and business-relevant LinkedIn outreach message for a person named ${name}, who is a ${job_title} at ${company}, located in ${location}. Their bio says: "${summary}".

  Mention how my company that is OutFlo helps automate outreach and increase meetings & sales. The tone should be conversational and concise. End with a soft call to connect on LinkedIn and mentioning my name or any kind of placeholders for my name can be avoided.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gemma2-9b-it",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const message = completion.choices[0].message?.content;
    res.json({ message });
  } catch (err) {
    console.error("❌ AI Generation failed:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
};
