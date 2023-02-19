import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./database";
import ingredientsRouter from "./routes/ingredients"
import recipesRouter from "./routes/recipes"
import { processRawRecipes } from "./routes/recipesService";
dotenv.config();

const port = 8081;
export const app = express();

const main = async() => {
  await connectDB();
  app.listen(port, () => console.log("Server connected", port));
}

app.use(express.json());
app.use(cors());
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes", recipesRouter);
app.use(express.static('./static'));

main();
processRawRecipes();
