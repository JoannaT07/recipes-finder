import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Ingredient, Ingredients, Recipes } from "../model/types";
import { getRecipes } from "../service/apiService";

export const useRecipes = ( page:number,setPage:Dispatch<SetStateAction<number>>, ingredients:Ingredients, tag:string | undefined) => {
  const [recipes, setRecipes] = useState<Recipes>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if(page > 1){
        setIsLoading(true)

        getRecipes(page, ingredients, tag)
        .then(data=>{
            data?.length && setRecipes(prevState => [...prevState, ...data])
            setHasNextPage(Boolean(data?.length))
            setIsLoading(false)
        })
    }

  }, [page])

  useEffect(()=>{
    setPage(1)
    setIsLoading(true)

    getRecipes(1, ingredients, tag)
    .then(data=>{
        data?.length ? setRecipes(data) : setRecipes([])
        setHasNextPage(Boolean(data?.length))
        setIsLoading(false)
    })
  }, [ingredients, tag])


  return { recipes, isLoading, hasNextPage };
};
