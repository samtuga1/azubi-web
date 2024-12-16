import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect, useCallback } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/v1/products");

      if (!response.ok) {
        throw new Error("Unable to fetch");
      }
      const responseData = await response.json();

      // console.log(responseData);

      let loadedData = [];
      for (const key in responseData.data.products) {
        let item = responseData.data.products[key];
        loadedData.push({
          id: item.id,
          photo: item.photo,
          name: item.title,
          price: item.price,
          description: item.description,
        });
      }

      console.log(loadedData);
      setMeals(loadedData);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      photo={meal.photo}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {error != null && <p className={classes.MealsError}>{error}</p>}
      {isLoading && <p className={classes.MealsLoading}>Fetching meals</p>}
      {!isLoading && error === null && (
        <ul>
          <Card>{mealsList}</Card>
        </ul>
      )}
    </section>
  );
};

export default AvailableMeals;
