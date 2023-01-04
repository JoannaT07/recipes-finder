export interface RawRecipe {
  name: string | null;
  ingredients: RawIngredient[];
  instructions: string[] | null;
  image: string | null;
}

export type RawIngredient = {
  name: string;
  quantity: string;
};

export type Ingredient = {
  id: string;
  quantity: string;
};

export interface Recipe {
  name: string | null;
  ingredients: Ingredient[];
  instructions: string[] | null;
}
