import { Request, Response, Router } from "express";
import { findAllIngredients } from "../service/ingredientsRepository";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const ingredients = await findAllIngredients();
    res.json(ingredients);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;