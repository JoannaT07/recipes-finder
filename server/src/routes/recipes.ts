import { Request, Response, Router } from "express";
import { RecipesModel } from "../models/recipes";
import {processRecipes} from "./recipesService";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const recipes = await RecipesModel.find()
        res.json(recipes)
    }catch(err){
        res.json({message: err})
    }
})

// processRecipes();

export default router;