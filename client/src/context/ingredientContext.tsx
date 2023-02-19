import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { Ingredient, Ingredients } from "../model/types";
import { getIngredients } from "../service/apiService";

export const IngredientContext = createContext<Ingredient[]>([]);

type Props = {
  children: ReactNode;
};

export const IngredientContextProvider: FC<Props> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredients>([]);

  useEffect(() => {
    getIngredients().then(setIngredients);
  }, []);

  return (
    <IngredientContext.Provider value={ingredients}>
      {children}
    </IngredientContext.Provider>
  );
};
