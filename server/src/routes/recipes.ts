import { Request, Response, Router } from "express";
import RecipeModel from "../models/Recipes";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const ingredient = req.query.ingredients as string;
    if (ingredient) {
      const query = ingredient.split(",").map((ingredient) => ({
        $elemMatch: { id: ingredient },
      }));
      const recipes = await RecipeModel.find({
        ingredients: { $all: query },
      });
      res.json(recipes);
    } else {
      const recipes = await RecipeModel.find();
      res.json(recipes);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
