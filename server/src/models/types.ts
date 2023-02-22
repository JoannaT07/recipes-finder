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

export type Ingredient = {
  id: string;
  name: string;
}

export type Recipe = {
  id: string;
  name: string | null;
  ingredients: {
      id: string | undefined;
      name: string;
      quantity: string;
  }[];
  instructions: string[] | null;
  image: string | undefined;
  tags: string | null;
}
