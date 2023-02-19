import { Request, Response, Router } from "express";
import IngredientsModel from "../models/Ingredients";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const ingredients = await IngredientsModel.find();
    res.json(ingredients);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;