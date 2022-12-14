import { Request, Response, Router } from "express";
import RecipeModel from "../models/Recipes";
// import {processRawRecipes} from "./recipesSource";
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const recipes = await RecipeModel.find()
        res.json(recipes)
    }catch(err){
        res.json({message: err})
    }
})

export default router;