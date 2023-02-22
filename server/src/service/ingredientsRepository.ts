import IngredientModel from "../models/Ingredients";
import { Ingredient } from "../models/types";

export const findAllIngredients = async() => {
    return await IngredientModel.find()
}

export const findOneIngredient = async() => {
  return await IngredientModel.findOne({})
}

export const insertIngredients = async(ingr: Ingredient[]) => {
  return await IngredientModel.insertMany(ingr)
}

export const deleteIngredients = async() => {
  return await IngredientModel.deleteMany({})
}
