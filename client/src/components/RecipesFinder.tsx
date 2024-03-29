import { FC, useState } from "react";
import { Recipes as Recipes } from "./Recipes";
import { IngredientsSelector, options } from "./IngredientsSelector";
import { Ingredients } from "../model/types";


const RecipesFinder: FC = () => {
  const [chosenIngredients, setChosenIngredients] = useState<Ingredients>(() => JSON.parse(localStorage.getItem("ingredients")!) || []);
  const [selectedCategory, setSelectedCategory] = useState<any>(() => JSON.parse(localStorage.getItem("category")!) || options[0].value);
  
  return (
    <div className="main-container">
      <div className="top-section">
        <div className="nav">
          <div className="logo-sm">
            <a href="/">
            <img
              src="/img/logo.png"
              alt=""
              style={{ height: "74px" }}
            /></a>
          </div>
        </div>
      </div>
      <div className="background-img"></div>
      <IngredientsSelector
        chosenIngredients={chosenIngredients}
        setChosenIngredients={setChosenIngredients}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Recipes
        chosenIngredients={chosenIngredients}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default RecipesFinder;
