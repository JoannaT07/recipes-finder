import { FC, useState } from "react";
import { RecipesSelector } from "./RecipesSelector";
import { IngredientsSelector } from "./IngredientsSelector";
import { Ingredients } from "../model/types";
import { useNavigate } from "react-router-dom";

const RecipesFinder: FC = () => {
  const [choosenIngredients, setChoosenIngredients] = useState<Ingredients>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  let restart = useNavigate(); 

  return (
    <div className="main-container">
      <div className="top-section">
        <div className="nav">
          <div className="logo-sm">
            <img src="../public/logo_pom.png" alt="" style={{ height: "74px" }} />
          </div>    
        </div>
      </div>
      <div className="background-img"></div>
      <IngredientsSelector
            choosenIngredients={choosenIngredients}
            setChoosenIngredients={setChoosenIngredients}
            setSelectedCategory={setSelectedCategory}
          />
      <RecipesSelector choosenIngredients={choosenIngredients} selectedCategory={selectedCategory} />
    </div>
  );
};

export default RecipesFinder;
