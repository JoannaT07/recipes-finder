export interface Ingredient {
    id: string
    name: string
}

export type Ingredients = Ingredient[]
export type Recipes = Recipe[]

export interface RecipeIngredient {
    id: string
    name: string
    quantity: string | null
}
export interface Recipe {
    id: string
    name: string
    ingredients: RecipeIngredient[]
    instructions: string[]
    image: string
}