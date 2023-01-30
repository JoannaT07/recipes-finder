import axios, { AxiosError } from "axios"
import { Ingredients } from "../model/types";

const API_URL = "http://localhost:3000/api"

export const getIngredients = async() => {
    try{
        const res = await axios.get(`${API_URL}/ingredients`)
        return res.data;
    } catch(e){
        handleApiError(e as AxiosError)
    }
}

export const getRecipes = async(ingredients?: Ingredients, tag?: string) => {
    try{
        if (tag && !ingredients) {
            return (await axios.get(`${API_URL}/recipes?tag=${tag}`)).data
        } else if(ingredients && ingredients.length > 0 && !tag){
            return (await axios.get(`${API_URL}/recipes?ingredients=${ingredients.map(({id}) => id).join(",")}`)).data
        } else if (ingredients && ingredients.length > 0 && tag) {
            return (await axios.get(`${API_URL}/recipes?ingredients=${ingredients.map(({id}) => id).join(",")}&tag=${tag}`)).data
        }
        return (await axios.get(`${API_URL}/recipes`)).data
    } catch(e){
        handleApiError(e as AxiosError)
    }
}

export const getFoundedRecipe = async(recipeId?: string) => {
    try{
        const res = await axios.get(`${API_URL}/recipes/przepis?recipeId=${recipeId}`)
        return res.data;
    } catch(e){
        handleApiError(e as AxiosError)
    }
}

const handleApiError = (e: AxiosError) => {
    alert(e.message);
}