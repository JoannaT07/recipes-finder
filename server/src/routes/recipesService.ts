import * as fs from "fs";
import RecipeModel from "../models/Recipes";
import IngredientsModel from "../models/Ingredients";

export const processRawRecipes = async () => {
  await IngredientsModel.deleteMany({});
  const rawData = loadData();
  if (rawData) {
    await parseIngredients(rawData);
    const recipes = await parseRecipe(rawData);
    await updateRecipesInDb(recipes);
  }
};

const loadData = () => {
  try {
    const data = fs.readFileSync("output/data/recipes0.json", "utf8");
    return data.split(/\r?\n/).map((line) => {
      if (line) {
        return JSON.parse(line);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const distinct = (value: string, index: number, arr: string[]) =>
  index === arr.findIndex((el: string) => el === value);

const parseIngredients = async (rawData: RawReceipe[]) => {
  console.log(rawData[0])
  const ingredients = rawData
    .map(({ ingredients }: RawReceipe) => ingredients.map((ingredient: RawIngredient) => ingredient.name))
    .reduce((acc: string[], currValue: string[]) => [...acc, ...currValue])
    .filter(distinct);
  for (const ingredient of ingredients) {
    const ingredientDb = await IngredientsModel.findOne({
      name: ingredient,
    });
    if(!ingredientDb){
    await IngredientsModel.create({
      name: ingredient,
    });
    }
  }
};

const getIngredientId = async (name: string) => {
  const ingredient = await IngredientsModel.findOne({ name: name });
  return ingredient?.id;
};

const parseRecipe = async (rawData: RawReceipe[]) => {
  return await Promise.all(
    rawData.map(async (recipe: RawReceipe) => ({
      name: recipe.name,
      ingredients: await Promise.all(
        recipe.ingredients.map(async (rawIngredient: RawIngredient) => ({
          quantity: rawIngredient.quantity,
          id: await getIngredientId(rawIngredient.name),
        }))
      ),
      instructions: recipe.instructions,
    }))
  );
};

const updateRecipesInDb = async (recipes: Recipe[]) => {
  await RecipeModel.deleteMany({});
  await RecipeModel.insertMany(recipes);
};

interface RawReceipe {
  name: string | null;
  ingredients: RawIngredient[];
  instructions: string[] | null;
  image: string | null;
}

type RawIngredient = {
  name: string;
  quantity: string;
};

type Ingredient = {
  id: string;
  quantity: string;
}

interface Recipe {
  name: string | null;
  ingredients: Ingredient[];
  instructions: string[] | null;
}