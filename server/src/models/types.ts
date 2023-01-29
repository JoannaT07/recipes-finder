export interface IngredientsConfig {
  forbiddenValues: string[];
  ingredients: BasicIngredient[];
}

export interface BasicIngredient {
  id: string;
  name: string;
  searchValue?: string;
}

export interface RawRecipe {
  name: string | null;
  ingredients: RawIngredient[];
  instructions: string[] | null;
  image: string | null;
  tags: string | null;
}

export type RawIngredient = {
  name: string;
  quantity: string;
};
