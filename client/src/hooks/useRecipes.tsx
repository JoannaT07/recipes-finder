import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Ingredients, Recipes } from "../model/types";
import { getRecipes } from "../service/apiService";
import useEffectUpdate from "./useEffectUpdate";

export const useRecipes = (
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  ingredients: Ingredients,
  category: string | undefined
) => {
  const [recipes, setRecipes] = useState<Recipes>(
    JSON.parse(localStorage.getItem("recipes")!) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    if (!recipes.length) {
      getRecipes(page).then((data) => data && setRecipes(data));
    }
  }, []);

  useEffectUpdate(() => {
    if (page > 1) {
      setIsLoading(true);
      getRecipes(page, ingredients, category).then((data) => {
        data?.length && setRecipes((prevState) => [...prevState, ...data]);
        setHasNextPage(Boolean(data?.length));
        setIsLoading(false);
      });
    }
  }, [page]);

  useEffectUpdate(() => {
    setPage(1);
    setIsLoading(true);
    getRecipes(1, ingredients, category).then((data) => {
      data?.length ? setRecipes(data) : setRecipes([]);
      setHasNextPage(Boolean(data?.length));
      setIsLoading(false);
    });
  }, [ingredients, category]);

  return { recipes, isLoading, hasNextPage };
};