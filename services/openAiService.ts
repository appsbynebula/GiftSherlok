import OpenAI from 'openai';
import { ProfilingInputs, GiftIdea } from "../types";

// Initialize OpenAI Client
// Note: In a real production app, this call would likely be proxied through a backend 
// to protect the API key, but for this client-side demo, we use the env variable directly.
// Make sure to set VITE_OPENAI_API_KEY in your .env file
const key = import.meta.env.VITE_OPENAI_API_KEY;

if (!key) console.error("Missing OpenAI API Key in .env (VITE_OPENAI_API_KEY)");

const openai = new OpenAI({
  apiKey: key || '',
  dangerouslyAllowBrowser: true // Required for client-side usage if not proxied
});

export const generateGiftIdeas = async (inputs: ProfilingInputs): Promise<GiftIdea[]> => {
  try {
    const prompt = `
      Input Profile:
      1. Frequent Complaint: "${inputs.complaint}"
      2. Ideal Sunday: "${inputs.sunday}"
      3. Debate Topic: "${inputs.debate}"
      4. Price Budget: "${inputs.priceRange}"
      
      Task: Deduce a deep psychological need based on these inputs and suggest 5 specific, physical products that strictly fall within the Price Budget.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Or gpt-3.5-turbo if preferred for cost
      messages: [
        {
          role: "system",
          content: "You are a supreme gift-giver and psychologist. You ignore generic gifts like mugs or socks unless they are ironic. Based on the 3 inputs (Complaint, Sunday, Debate), deduce a deep psychological need and suggest a specific, physical product that solves it or celebrates it. Ensure the price is within the user's budget. Be witty. Return ONLY valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "gift_ideas_response",
          strict: true,
          schema: {
            type: "object",
            properties: {
              gift_ideas: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    product_name: { type: "string" },
                    search_term_for_amazon: { type: "string" },
                    description: { type: "string", description: "Short & Punchy description" },
                    psychological_hook: { type: "string", description: "The 'Why' - connect the complaint/hobby to the product psychologically" },
                    estimated_price: { type: "string" }
                  },
                  required: ["product_name", "search_term_for_amazon", "description", "psychological_hook", "estimated_price"],
                  additionalProperties: false
                }
              }
            },
            required: ["gift_ideas"],
            additionalProperties: false
          }
        }
      }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    const data = JSON.parse(content);
    return data.gift_ideas || [];

  } catch (error) {
    console.error("Sherlock failed to deduce:", error);
    throw error;
  }
};