import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";
import { Fragment } from "react";

const Meals = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
