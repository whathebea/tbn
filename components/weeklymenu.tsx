import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { DayMenu, WeeklyMenu } from '../types/weeklyMealsResponse';


interface Props {
  data: WeeklyMenu;
  daysToBeShown: string[];
  calculateDailyTotals: (dayData: DayMenu) => { totalCalories: number };
}

const getDayMenuKey = (day: string): keyof WeeklyMenu => {
  const validDays: (keyof WeeklyMenu)[] = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  return validDays.includes(day as keyof WeeklyMenu) ? (day as keyof WeeklyMenu) : 'Monday';
};
  

const WeeklyMenuComponent: React.FC<{
    data: WeeklyMenu;
    daysToBeShown: string[];
    calculateDailyTotals: (dayMenu: DayMenu) => any;
  }> = ({ data, daysToBeShown, calculateDailyTotals }) => {
    return (
      <>
        {daysToBeShown.map(day => (
          <Card key={day} className="mb-4">
            <CardHeader>
              <CardTitle>{day}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meal</TableHead>
                    <TableHead>Food</TableHead>
                    <TableHead className="text-right">Grams</TableHead>
                    <TableHead className="text-right">Calories</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.[getDayMenuKey(day)]?.breakfast.map((item, index) => (
                    <TableRow key={`breakfast-${index}`}>
                      <TableCell>Breakfast</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.grams}</TableCell>
                      <TableCell>{item.calories}</TableCell>
                    </TableRow>
                  ))}
                  {data?.[getDayMenuKey(day)]?.lunch.map((item, index) => (
                    <TableRow key={`lunch-${index}`}>
                      <TableCell>Lunch</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.grams}</TableCell>
                      <TableCell>{item.calories}</TableCell>
                    </TableRow>
                  ))}
                  {data?.[getDayMenuKey(day)]?.dinner.map((item, index) => (
                    <TableRow key={`dinner-${index}`}>
                      <TableCell>Dinner</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.grams}</TableCell>
                      <TableCell>{item.calories}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total Calories</TableCell>
                    <TableCell>
                    {calculateDailyTotals(data[getDayMenuKey(day)]).totalCalories}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        ))}
      </>
    );
  };
  
  

export default WeeklyMenuComponent;
