import { FC, useEffect, useState } from "react";
import axios from "axios";
import { getRecipes } from "../service/apiService";
import { Ingredients, Recipes } from "../model/types";
import { TiDelete } from "react-icons/ti";

type Props = {
  choosenIngredients: Ingredients
};

export const RecipesSelector: FC<Props> = ({choosenIngredients}) => {
  const [recipes, setRecipes] = useState<Recipes>([]);

  // useEffect(() => {
  //   getRecipes().then(setRecipes);
  // }, []);

  useEffect(()=>{
    getRecipes(choosenIngredients).then(setRecipes);
  },[choosenIngredients])

  return (
  <div className="recipe-list">
    {recipes.map((recipe, index) => (
      index <= 50 && (
        <div className="recipe">
          <div className="recipe-img">
              {/* <img src="../../server/output/img/3-bit-ciasto.jpg" alt=""/> */}
              <img src={`../public/img/${recipe.image}`} alt=""/>
              </div>
             <p>{recipe.name}</p>
           </div>
      )
    ))}
  </div>
  )
};