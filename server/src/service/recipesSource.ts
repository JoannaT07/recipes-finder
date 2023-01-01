import * as fs from "fs";
import RecipeModel from "../models/Recipes";
import IngredientsModel from "../models/Ingredients";

export const processRawRecipes = async () => {
  await IngredientsModel.deleteMany({});
  const rawData = loadData();
  if (rawData) {
    // findIngredient(rawData)
    await parseIngredients(rawData);
    const recipes = await parseRecipe(rawData);
 
    // updateRecipesInDb(recipes, ingredients);
    console.log(JSON.stringify(recipes))
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

const extractIngredients = (rawData: RawReceipe[]) => {
 return rawData
    .map(({ ingredients }: any) => ingredients)
    .reduce((acc: any, currValue: any) => [...acc, ...currValue]);
};

const getUniqueValue = (arr: any) => {
  return arr.filter(
    (value: any, index: any, arr: any) =>
      index ===
      arr.findIndex((el: any) => el.ingredient === value.ingredient)
  );
};

const parseIngredients = async(rawData: RawReceipe[]) => {
  // const ingredients = extractIngredients(rawData).map((ingredient: any) => ({
  //   ingredient: ingredient.name,
  // }));
  // return getUniqueValue(ingredients);
  const ingredients = rawData
    .map(({ ingredients }: any) => ingredients.map((ingredient:any) => ingredient.name))
    .reduce((acc: any, currValue: any) => [...acc, ...currValue])
    .filter(distinct);
    console.log("ingredients", ingredients)
  for(const ingredient of ingredients){
    const ingredientDb = await IngredientsModel.find({
      ingredient: ingredient
    })
    // if(!ingredientDb){
      await IngredientsModel.create({
        ingredient:ingredient
      })
    // }
  }
};

const distinct = (value: any, index: any, arr: any) => index === arr.findIndex((el: any) => el === value)

const parseRawIngredients = (rawData: any) => {
 return rawData.map(({ingredients}:any) => ingredients)
 .map((ingredient: any) => {
  return ingredient.map((ingr:any) => ({
    ingredient: getIngredientId(ingr.name),
    quantity: ingr.quantity
  }))
 });
};



const assignIngredientId = (rawData: RawReceipe[]) => {
 
}

const prepareRecipesData = () => {

}

const parseRecipe = async (rawData: any) => {
  return await Promise.all(rawData.map(async (recipe: any) => ({
    name: recipe.name,
    ingredients: await Promise.all(recipe.ingredients.map(async(rawIngredient: any) => ({
      quantity: rawIngredient.quantity,
      id: await getIngredientId(rawIngredient.name)
    }))),
    instructions: recipe.instructions[0],
  })));
};

const test = (arr:string[])=>{
  for(const val of arr){
    getIngredientId(val)
  }
}

const getIngredientId = async (name: string) => {
 const ingredient = await IngredientsModel.findOne({ingredient: name})
 console.log(ingredient)
 return ingredient._id
}

// const mapIngredients = (rawIngredients: RawIngredient[] ) => {
//   ret
// }


const updateRecipesInDb = async (
  recipes: any,
  ingredients: any,
) => {
  await RecipeModel.deleteMany({});
  await IngredientsModel.deleteMany({});
  RecipeModel.insertMany(recipes);
  IngredientsModel.insertMany(ingredients);
};

const findIngredient = async (rawData: any) => {
  const s = parseRawIngredients(rawData)
  const zzz = s.map((w:any) => {
    return w.filter((q:any) => q.ingredient === 'jajka')
  })
  console.log(zzz)
  try {
    const ingredient = await IngredientsModel.find({
      ingredient: "jajka"
    })
    console.log(ingredient)
  } catch (e) {
    console.error(e)
  }
}

interface RawReceipe {
  name: string | null;
  ingredients: RawIngredient[];
  instructions: string[] | null;
  image: string | null;
}

type RawIngredient = {
  name: string | null;
  quantity: string | null;
};

interface Recipe {
  name: string | null;
  instructions: string[] | null
}
