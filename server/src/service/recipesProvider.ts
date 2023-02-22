import * as fs from "fs";
import { IngredientsConfig, BasicIngredient, RawRecipe } from "../models/types";
import { deleteIngredients, findOneIngredient, insertIngredients } from "./ingredientsRepository";
import { deleteRecipes, findOneRecipe, insertRecipes } from "./recipesRepository";
// import logger from "../../winstonconfig";
const short = require("short-uuid");

const loadData = (): RawRecipe[] => {
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
    .filter((element) => element);
};

const loadIngredients = (): IngredientsConfig => {
  const fileContent = fs.readFileSync("output/ingredients.json", "utf-8");
  const configIngredients = JSON.parse(fileContent);
  configIngredients.ingredients.forEach(
    (ing: BasicIngredient) => (ing.id = short.generate())
  );
  return configIngredients;
};

const getIngredientId = (
  ingredientName: string,
  ingredientsConfig: IngredientsConfig
) => {
  const foundedIngredient = ingredientsConfig.ingredients.find((ing) =>
    ing.searchValue
      ? ingredientName.match(new RegExp(ing.searchValue))
      : ingredientName.includes(ing.name)
  );
  return foundedIngredient?.id;
};

const distinctRecipes = (value: RawRecipe, index: number, arr: RawRecipe[]) =>
  index === arr.findIndex((el) => el.name === value.name);

const parseRecipe = (
  rawData: RawRecipe[],
  ingredientsConfig: IngredientsConfig
) => {
  return rawData.filter(distinctRecipes).map((recipe) => ({
    id: short.generate(),
    name: recipe.name,
    ingredients: recipe.ingredients.map((rawIngredient) => ({
      id: getIngredientId(rawIngredient.name, ingredientsConfig),
      name: rawIngredient.name,
      quantity: rawIngredient.quantity,
    })),
    instructions: recipe.instructions,
    image: recipe.image?.slice(1),
    tags: recipe.tags
  }));
};

const parseIngredients = (ingredientsConfig: IngredientsConfig) => {
  return ingredientsConfig.ingredients.map((ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
  }));
};

export const isDatabaseEmpty = async () => {
  const ingredientDb = await findOneIngredient();
  const recipeDb = await findOneRecipe();
  return !ingredientDb || !recipeDb;
};

export const processRawRecipes = async () => {
  // await deleteIngredients();
  // await deleteRecipes();

  if (await isDatabaseEmpty()) {
    const rawData = loadData();
    const ingredientsConfig = loadIngredients();
    if (rawData) {
      const recipes = parseRecipe(rawData, ingredientsConfig);
      const ingredients = parseIngredients(ingredientsConfig);
      await insertRecipes(recipes);
      await insertIngredients(ingredients);
    }
  }
};
