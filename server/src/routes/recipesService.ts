import * as fs from "fs";
import RecipeModel from "../models/Recipes";
import IngredientsModel from "../models/Ingredients";
import { RawIngredient, RawRecipe, Recipe } from "../models/types";
const short = require("short-uuid");

export const processRawRecipes = async () => {
  // await IngredientsModel.deleteMany(});
  // await RecipeModel.deleteMany({})
  if(await isDatabaseEmpty()){
    const rawData = loadData();
    if (rawData) {
      await parseIngredients(rawData);
      const recipes = await parseRecipe(rawData);
      await updateRecipesInDb(recipes);
    }
  }
};

export const isDatabaseEmpty = async() => {
  const ingredientDb = await IngredientsModel.findOne({})
  const recipeDb = await RecipeModel.findOne({})
  return !ingredientDb || !recipeDb
}

const loadData = () => {
    const path = "output/data/";
    return fs
      .readdirSync(path)
      .map((filename) => {
        const files = fs.readFileSync(path + filename, "utf-8");
        return files.split(/\r?\n/).map((line) => {
          if (line) {
            return JSON.parse(line);
          }
        });
      })
      .flat()
      .filter(element => element)
};

const distinct = (value: string, index: number, arr: string[]) =>
  index === arr.findIndex((el: string) => el === value);

const parseIngredients = async (rawData: RawRecipe[]) => {
  const ingredients = rawData
    .map(({ ingredients }: RawRecipe) =>
      ingredients.map((ingredient: RawIngredient) => ingredient.name)
    )
    .reduce((acc: string[], currValue: string[]) => [...acc, ...currValue])
    .filter(distinct);
  for (const ingredient of ingredients) {
    const ingredientDb = await IngredientsModel.findOne({
      name: ingredient,
    });
    if (!ingredientDb) {
      await IngredientsModel.create({
        id: short.generate(),
        name: ingredient
      });
    }
  }
};

const getIngredientId = async (name: string) => {
  const ingredient = await IngredientsModel.findOne({ name: name });
  return ingredient?.id;
};

const distinctRecipes = (value: RawRecipe, index: number, arr: RawRecipe[]) => 
  index === arr.findIndex(el => el.name === value.name);

const parseRecipe = async (rawData: RawRecipe[]) => {
  return await Promise.all(
    rawData
    .filter(distinctRecipes)
    .map(async recipe => ({
      id: short.generate(),
      name: recipe.name,
      ingredients: await Promise.all(
        recipe.ingredients.map(async rawIngredient => ({
          id: await getIngredientId(rawIngredient.name),
          quantity: rawIngredient.quantity
        }))
      ),
      instructions: recipe.instructions,
    }))
  );
};

const updateRecipesInDb = async (recipes: Recipe[]) => {
  await RecipeModel.insertMany(recipes);
};