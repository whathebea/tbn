import { child, ref, set, get } from "firebase/database";
import type { NextApiRequest, NextApiResponse } from 'next';
import { WeeklyMenu } from "../../../types/weeklyMealsResponse";
import { database } from "@firebase/firebase";

function saveWeeklyMenu(data: WeeklyMenu, endpoint: string) {
    set(ref(database, 'menu/' + endpoint), data);
}

async function recoverWeeklyMenu(endpoint: string): Promise<WeeklyMenu | null> {
    const dbRef = ref(database);
    try {
        const snapshot = await get(child(dbRef, endpoint));
        if (snapshot.exists()) {
            return snapshot.val() as WeeklyMenu;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { input } = req.body;

            if (!input) {
                return res.status(400).json({ error: 'Input is required' });
            }

            await saveWeeklyMenu(input, "teste");
            res.status(200).json({ message: 'Data saved successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            const result = await recoverWeeklyMenu("menu/teste");
            if (result) {
                res.status(200).json(result);
            } else {
                console.log(res)
                res.status(404).json({ error: 'Data not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
