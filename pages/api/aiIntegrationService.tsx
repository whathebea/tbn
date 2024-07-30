// pages/api/ai-integration.ts
import { WeeklyMenuObject } from '@utils/WeeklyMenuObject';
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { parse } from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const modelJson = `{
    "weeklyMenu": {
      "Monday": {
        "breakfast": [{"grams": 50, "calories": 120, "name": "Pão"},
    {"grams": 200, "calories" 10, "name": "Café"}],
        "lunch": [{"grams": 50, "calories": 120, "name": "Arroz"},
        {"grams": 50, "calories": 120, "name": "Feijao"},
        {"grams": 50, "calories": 120, "name": "Frango"},
        {"grams": 300, "calories": 120, "name": "Salada de alface com tomate"}],
        "dinner": [{"grams": 250, "calories": 400, "name": "Sopa de legumes"}]
      },
      "Tuesday": {
        "breakfast": [{"grams": 200, "calories": 250, "name": "Tapioca"}],
        "lunch": [{"grams": 50, "calories": 120, "name": "Arroz"},
        {"grams": 50, "calories": 120, "name": "Feijao"},
        {"grams": 50, "calories": 120, "name": "Carne moida"}],
        "dinner": [{"grams": 200, "calories": 100, "name": "Alface"},
        {"grams": 200, "calories": 100, "name": "Atum"},
        {"grams": 200, "calories": 100, "name": "Molho"}]
      }
    },
    "shoppingList": [
      {"ingredient": "Pão", "amount": "14 slices"},
      {"ingredient": "Manteiga", "amount": "100g"}
    ]
  }`;


async function aiIntegration() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are now an expert nutritionist. Please provide the answer for the questions following this specification: ' + modelJson },
      {"role": "user", "content": "Answer ONLY with a JSON. Make a weekly menu for a brazilian make sure to include things that are commonly eaten in their country and that are not expensive to buy. Also make sure that the amount of food is clear and that it has breakfast, lunch and dinner and it is not over 2000 calories. Return it as a json with the keys breakfast, lunch, dinner containing in each key the keys grams, calories, name of food.  After you do that, please also make a shopping list for the necessary ingredients, return it as an array containing the name of the ingredient and the amount necessary for the week."},
    ],
    model: 'gpt-4o-mini'
  });
  console.log(completion);
  const rawJsonString = completion.choices[0].message.content;
  console.log("RESPOSTA: " + rawJsonString)
  let json;
  let jsonObj;
  if (rawJsonString != null) {
    json = rawJsonString.slice(7);
    json = json.slice(0, -3);
    console.log(json)
    try {
      jsonObj = JSON.parse(json);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      jsonObj = {};
    }
  }

  return new WeeklyMenuObject(jsonObj);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const result = await aiIntegration();
      res.status(200).json(result);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
