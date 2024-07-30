import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/ui/tabs";
import { Toggle } from "@components/ui/toggle";
import { useEffect, useState } from "react";
import { getWeeklyMenu } from "@service/getMealMenuService";
import { DayMenu, Meal, WeeklyMenu } from "../types/weeklyMealsResponse";
import { Skeleton } from "@components/ui/skeleton";
import WeeklyMenuComponent from "@components/weeklymenu";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  
  const [data, setData] = useState<WeeklyMenu | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [daysToBeShown, setDaysToBeShown] = useState<string[]>([]);

  function addToList(day: string, pressed: boolean) {
    setDaysToBeShown((prevDays) => 
      pressed ? [...prevDays, day] : prevDays.filter(d => d !== day)
    );
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getWeeklyMenu();
        setData(response);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotalCalories = (meals: Meal[]) => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };

  const calculateDailyTotals = (dayMenu: DayMenu) => {
    const breakfastTotal = calculateTotalCalories(dayMenu.breakfast);
    const lunchTotal = calculateTotalCalories(dayMenu.lunch);
    const dinnerTotal = calculateTotalCalories(dayMenu.dinner);

    return {
      breakfastTotal,
      lunchTotal,
      dinnerTotal,
      totalCalories: breakfastTotal + lunchTotal + dinnerTotal,
    };
  };

  return (
    <div className="container mx-auto my-4">
      <div className="flex justify-between">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">User area</h3>
      <Button>Logout</Button>
      </div>
      <Tabs defaultValue="meals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 my-4">
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="workout">Workout</TabsTrigger>
          <TabsTrigger value="shopping-list">Shopping List</TabsTrigger>
        </TabsList>
        <TabsContent value="meals">
          <div className="grid w-full grid-cols-[30%_70%]">
            <div>
              <ul>
                {daysOfWeek.map(day => (
                  <li key={day}>
                    <Toggle onPressedChange={(pressed) => addToList(day, pressed)} className="my-2 w-[90px] lg:min-w-[100px]">
                      {day}
                    </Toggle>
                  </li>
                ))}
              </ul>
            </div>
              {loading ? (
                <Skeleton className="h-[100%] w-[100%] rounded-xl" />
              ) : (
                <div className="grid gap-x-4 lg:grid-cols-2 gap-y-4">
                <WeeklyMenuComponent
                  data={data}
                  daysToBeShown={daysToBeShown}
                  calculateDailyTotals={calculateDailyTotals}
                />
              </div>
              )}
          </div>
        </TabsContent>
        <TabsContent value="workout">
          <div className="grid w-full grid-cols-[40%_60%]">
            <div>
              <ul>
                {daysOfWeek.map(day => (
                  <li key={day}>
                    <Toggle className="min-w-[100px] my-1">{day}</Toggle>
                  </li>
                ))}
              </ul>
            </div>
            <div>card</div>
          </div>
        </TabsContent>
        <TabsContent value="shopping-list">
          list 1 list 2
        </TabsContent>
      </Tabs>
    </div>
  );
}