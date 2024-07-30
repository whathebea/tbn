import { MenuData, ShoppingItem, WeeklyMenu } from "../types/weeklyMealsResponse";

export class WeeklyMenuObject {
  weeklyMenu: WeeklyMenu;
  shoppingList: ShoppingItem[];
  
    constructor(data: MenuData) {
        this.weeklyMenu = data.weeklyMenu;
        this.shoppingList = data.shoppingList;
      }
    
      getMenuForDay(day: keyof WeeklyMenu) {
        return this.weeklyMenu[day];
      }
    
      getShoppingList() {
        return this.shoppingList;
      }
  }