import { Request, Response, Router } from "express";
import RecipeModel from "../models/Recipes";
import { getStartIndex, getTags } from "./queryStringHelper";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const ingredient = req.query.ingredients as string;
    const category = req.query.category as string;
    const page = Number(req.query.page);
    const query = ingredient?.split(",").map((ingredient) => ({
      $elemMatch: { id: ingredient },
    }));
    let recipes = await RecipeModel.find({
      ...(ingredient && { ingredients: { $all: query } }),
      ...(category && { tags: {$in: getTags(category)} }),
    })
      .skip(getStartIndex(page, 50))
      .limit(50);
    res.json(recipes);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/przepis", async (req: Request, res: Response) => {
  try {
    const recipeId = req.query.recipeId as string;
    const recipe = await RecipeModel.findOne({
      id: recipeId,
    });
    res.json(recipe);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
