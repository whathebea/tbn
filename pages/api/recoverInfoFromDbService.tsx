import { child, getDatabase, ref, set, get } from "firebase/database";
import { ShoppingItem, WeeklyMenu } from "../../types/weeklyMealsResponse";
import type { NextApiRequest, NextApiResponse } from 'next';

function saveWeeklyMenu(data: WeeklyMenu, endpoint: String) {
    const db = getDatabase();
    set(ref(db, 'menu/' + endpoint), data);
}

export function recoverWeeklyMenu(endpoint: string) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, endpoint)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val;
        } else {
            return null;
        }
    }).catch((error) => {
        console.error(error);
    });
}

function saveShoppingList(data: ShoppingItem[], endpoint: String) {
    const db = getDatabase();
    set(ref(db, 'shopping/' + endpoint), data);
}

function recoverShoppingList(endpoint: String) {

}

function saveWorkout() {

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const result = await saveWeeklyMenu;
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