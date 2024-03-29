import axios, { AxiosError } from "axios";
import { Ingredients, Recipes } from "../model/types";
import { API_URL } from "../cfg";

export const getIngredients = async () => {
  try {
    const res = await axios.get(`${API_URL}/ingredients`);
    return res.data;
  } catch (e) {
    handleApiError(e as AxiosError);
  }
};

export const getQueryString = (  page: number,
  ingredients?: Ingredients,
  category?: string) => {

    const queryObject = {
      page,
      ...(ingredients?.length && {
        ingredients: ingredients.map((ing) => ing.id).join(","),
      }),
      ...(category && { category }),
    }
  return (
    "?" +
    Object.keys(queryObject)
      .map((key) => `${key}=${(queryObject as any)[key]}`)
      .join("&")
  );
};

export const getRecipes = async (
  page: number,
  ingredients?: Ingredients,
  category?: string
): Promise<Recipes | undefined> => {
  const query = getQueryString(page, ingredients, category);
  try {
    return (await axios.get(`${API_URL}/recipes${query}`)).data;
  } catch (e) {
    handleApiError(e as AxiosError);
  }
};

export const getFoundedRecipe = async (recipeId?: string) => {
  try {
    const res = await axios.get(
      `${API_URL}/recipes/przepis?recipeId=${recipeId}`
    );
    return res.data;
  } catch (e) {
    handleApiError(e as AxiosError);
  }
};

const handleApiError = (e: AxiosError) => {
  alert(e.message);
};