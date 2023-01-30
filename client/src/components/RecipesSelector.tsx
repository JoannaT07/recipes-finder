import { FC, MouseEvent, useEffect, useState } from "react";
import { getRecipes } from "../service/apiService";
import { Ingredients, Recipes } from "../model/types";
import { useNavigate } from "react-router-dom";

type Props = {
  choosenIngredients: Ingredients;
  selectedCategory?: string;
};

export const RecipesSelector: FC<Props> = ({ choosenIngredients, selectedCategory }) => {
  const [recipes, setRecipes] = useState<Recipes>([]);
  let navigateToRecipe = useNavigate();

  useEffect(() => {
    getRecipes(choosenIngredients, selectedCategory).then(setRecipes);
  }, [choosenIngredients, selectedCategory]);

  const handleRecipeClick = (e: MouseEvent) => {
    navigateToRecipe(`/${e.currentTarget.id}`);
  }

  return (
    <div className="recipe-list">
      {recipes.map(
        (recipe, index) =>
            <div className="recipe" id={recipe.id} onClick={handleRecipeClick}>
              <div className="recipe-img">
                <img
                  src={`../public/img/${
                    recipe.image !== undefined ? recipe.image : "default"
                  }.jpg`}
                  alt=""
                />
              </div>
              <p>{recipe.name}</p>
            </div>
      )}
    </div>
  );
};
