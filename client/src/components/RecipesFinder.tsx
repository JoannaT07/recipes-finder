import { FC, useEffect, useState } from "react";
import { Recipes as Recipes } from "./Recipes";
import { IngredientsSelector, options } from "./IngredientsSelector";
import { Ingredients } from "../model/types";
import { useNavigate } from "react-router-dom";


const RecipesFinder: FC = () => {
  const [choosenIngredients, setChoosenIngredients] = useState<Ingredients>(() => JSON.parse(localStorage.getItem("ingredients")!) || []);
  const [selectedCategory, setSelectedCategory] = useState<any>((JSON.parse(localStorage.getItem("category")!)) || options[0].value);
  let restart = useNavigate();

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(choosenIngredients));
  }, [choosenIngredients]);

  return (
    <div className="main-container">
      <div className="top-section">
        <div className="nav">
          <div className="logo-sm">
            <img
              src="../public/logo_pom.png"
              alt=""
              style={{ height: "74px" }}
            />
          </div>
        </div>
      </div>
      <div className="background-img"></div>
      <IngredientsSelector
        choosenIngredients={choosenIngredients}
        setChoosenIngredients={setChoosenIngredients}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Recipes
        choosenIngredients={choosenIngredients}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default RecipesFinder;
