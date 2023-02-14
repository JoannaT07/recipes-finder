import axios, { AxiosError } from "axios";
import { Ingredients, Recipes } from "../model/types";

const API_URL = "http://localhost:3000/api";

export const getIngredients = async () => {
  try {
    const res = await axios.get(`${API_URL}/ingredients`);
    return res.data;
  } catch (e) {
    handleApiError(e as AxiosError);
  }
};

const getQueryString = (input: any) => {
  return (
    "?" +
    Object.keys(input)
      .map((key) => `${key}=${input[key]}`)
      .join("&")
  );
};

export const getRecipes = async (
  page: number,
  ingredients?: Ingredients,
  category?: string
): Promise<Recipes | undefined> => {
  const query = getQueryString({
    page,
    ...(ingredients?.length && {
      ingredients: ingredients.map((ing) => ing.id).join(","),
    }),
    ...(category && { category }),
  });
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