export interface Meal {
    grams: number;
    calories: number;
    name: string;
  }
  
  export interface DayMenu {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
  }
  
  export interface WeeklyMenu {
    Monday: DayMenu;
    Tuesday: DayMenu;
    Wednesday: DayMenu;
    Thursday: DayMenu;
    Friday: DayMenu;
    Saturday: DayMenu;
    Sunday: DayMenu;
  }
  
  export interface ShoppingItem {
    ingredient: string;
    amount: string;
  }
  
  export interface MenuData {
    weeklyMenu: WeeklyMenu;
    shoppingList: ShoppingItem[];
  }
  