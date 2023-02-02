import { Request, Response, Router } from "express";
import RecipeModel from "../models/Recipes";
const router = Router();

export const getStartIndex = (pageNumber: number, length: number) => {
  if(pageNumber) return ((pageNumber - 1)* length)
  return 0
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const ingredient = req.query.ingredients as string;
    const tag = req.query.tag as string;
    const page = Number(req.query.page)
      const query = ingredient?.split(",").map((ingredient) => ({
        $elemMatch: { id: ingredient },
      }));
      let recipes = await RecipeModel.find({
        ...(ingredient && {ingredients: { $all: query }}),
        ...(tag && {tags: tag}),
      }).skip(getStartIndex(page, 50)).limit(50);

      // console.log(page)
      // console.log(recipes.length)
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
