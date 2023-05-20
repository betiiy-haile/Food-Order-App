import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import { useCallback, useEffect, useState } from 'react';

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
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
];

const AvailableMeals = () => {

  const [meals, setMeals] = useState(DUMMY_MEALS)
  const [isMealsLoading, setIsMealsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  const fetchMeals = useCallback(async () => {
    try {
      const response = await fetch(
        "https://food-order-app-f617e-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meals.");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsMealsLoading(false)
    } catch (error) {
      console.log(error);
      setHttpError(error.message)
    }
  }, []);

  useEffect(() => {
    fetchMeals().catch(error =>{
      setIsMealsLoading(false);
      setHttpError(error.message);
    })
  }, [fetchMeals])

  if(isMealsLoading){
    return <section>
      <p className={classes.mealsLoading}>Loading...</p>
    </section>
  } 

  if(httpError){
    return <section>
      <p className={classes.mealsError} >{httpError}</p>
    </section>
  }

  //  const mealsList = meals && meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals &&
            meals.map((meal) => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
