import { Request, Response, Router } from "express";
import IngredientsModel from "../models/Ingredients";
// import {processRawRecipes} from "./recipesSource";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const ingredients = await IngredientsModel.find()
        res.json(ingredients)
    }catch(err){
        res.json({message: err})
    }
})



// processRawRecipes();

export default router;