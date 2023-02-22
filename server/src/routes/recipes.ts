import { Request, Response, Router } from "express";
import { findOneRecipe, findRecipes } from "../service/recipesRepository";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const ingredient = req.query.ingredients as string | undefined;
    const category = req.query.category as string;
    const page = Number(req.query.page);
    
    const recipes = await findRecipes(ingredient, category, page)
    res.json(recipes);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/przepis", async (req: Request, res: Response) => {
  try {
    const recipeId = req.query.recipeId as string;
    const recipe = await findOneRecipe({
      id: recipeId
    })
    res.json(recipe);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
