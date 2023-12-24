// import React, { useEffect, useState } from "react";
import Meal from "./meal";
import useHttp from "./Hooks/useHttp";
import Error from "./Error";



const reqCongig={}
export default function Meals() {
  // const [meals, setMeals] = useState([]);
  // useEffect(() => {
  //   async function fetchMeal() {
  //     const res = await fetch("http://localhost:3000/meals");
  //     const data = await res.json();

  //     console.log(data);
  //     setMeals(data);
  //   }
  //   fetchMeal();
  // }, []);

const {data:meals,isLoading,error}=useHttp('http://localhost:3000/meals',reqCongig,[])
if(error){

  return(<Error title="failed to fecth" message={error}/>)
}

if(isLoading){


  return(<p className="center">feytching data</p>)
}
  return (
    <ul id="meals">
      {meals.length > 0 &&
        meals.map((meal) => {
          return(<Meal key={meal.id}  meal={meal}/>)
        })
      }
    </ul>
  );
}
