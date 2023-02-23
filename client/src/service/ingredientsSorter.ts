import { Ingredients } from "../model/types";

export const sortIngredients = (ingredients: Ingredients) => {
    return ingredients.sort((a, b) => a.name > b.name ? 1 : -1)
}