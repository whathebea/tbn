import { WeeklyMenuObject } from "@utils/WeeklyMenuObject";
import { WeeklyMenu } from "../types/weeklyMealsResponse";

export async function getWeeklyMenu(): Promise<WeeklyMenu | null> {
    try {
        const res = await tryRecoveringFromFirebase();
        if (res === null) {
            const resAi = await makeAiCall();
            if (resAi) {
                saveWeeklyMenu(resAi.weeklyMenu);
                return resAi.weeklyMenu;
            }
            null;
        }
        return res;
    } catch (error) {
        console.error("Error in getWeeklyMenu: ", error);
        return null;
    }
}

async function tryRecoveringFromFirebase(): Promise<WeeklyMenu | null> {
    try {
        const response = await fetch('/api/firebase/weeklyMenuService', {
            method: 'GET',
          });          
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result: WeeklyMenu = await response.json();
        return result;
    } catch (err) {
        console.error("Error in tryRecoveringFromFirebase: ", err);
        return null;
    }
}

async function makeAiCall(): Promise<WeeklyMenuObject | null> {
    try {
        const response = await fetch('/api/aiIntegrationService', {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result: WeeklyMenuObject = await response.json();
        return result;
    } catch (error) {
        console.error("Error in makeAiCall: ", error);
        return null;
    }
}

async function saveWeeklyMenu(body: WeeklyMenu): Promise<void> {
    try {
        await fetch('/api/firebase/weeklyMenuService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: body }),
        });
    } catch (error) {
        console.error('Error saving weekly menu:', error);
        // Optionally, you can rethrow the error if you want to handle it elsewhere
        throw error;
    }
}
