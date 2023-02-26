import RecipeModel from "../models/Recipes";
import { Recipe } from "../models/types";
import { getQueryObject, getStartIndex } from "./commonService";

export const findOneRecipe = async (query?: object) => {
  return await RecipeModel.findOne(query);
};

export const findRecipes = async (
  ingredient: string | undefined,
  category: string | undefined,
  page: number
) => {
  return await RecipeModel.aggregate([
    {
      $addFields: {
        hasValue: { $ifNull: ["$image", {}] },
      },
    },
    {
      $sort: {
        hasValue: 1,
        image: 1,
      },
    },
    {
      $match: getQueryObject(ingredient, category),
    },
  ])
    .skip(getStartIndex(page, 48))
    .limit(48);
};

export const insertRecipes = async (recipes: Recipe[]) => {
  return await RecipeModel.insertMany(recipes);
};

export const deleteRecipes = async () => {
    return await RecipeModel.deleteMany({});
  };