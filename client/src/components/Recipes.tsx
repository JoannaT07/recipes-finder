import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Ingredients } from "../model/types";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes";

type Props = {
  choosenIngredients: Ingredients;
  selectedCategory?: string;
};

export const Recipes: FC<Props> = ({ choosenIngredients, selectedCategory }) => {

  let navigateToRecipe = useNavigate();
  const [page, setPage] = useState(() => Number(JSON.parse(localStorage.getItem("page")!)) || 1)
  const {recipes, isLoading, hasNextPage} = useRecipes(page,setPage, choosenIngredients,  selectedCategory);

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page))
  }, [page])

  const observer = useRef<IntersectionObserver>()
  const recipeRef = useCallback((recipeNode: any)=>{
    if(isLoading) return;
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((recipeNodes)=>{
      if(recipeNodes[0].isIntersecting && hasNextPage){
        setPage(prevValue => prevValue + 1)
      }
    })
    if(recipeNode) observer.current.observe(recipeNode)
  }, [isLoading, hasNextPage])

  const handleRecipeClick = (e: MouseEvent) => {
    navigateToRecipe(`/${e.currentTarget.id}`);
  }

  return (
    <div className="recipe-list">
      {recipes.map(
        (recipe, index) =>
            <div ref={index === recipes.length - 10 ? recipeRef : null} key={index} className="recipe" id={recipe.id} onClick={handleRecipeClick}>
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
      {isLoading && <div>...</div>}
    </div>
  );
};
