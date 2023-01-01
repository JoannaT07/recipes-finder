import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./database";
import ingredientsRouter from "./service/recipes"
import { processRawRecipes } from "./service/recipesSource";
dotenv.config();

const port = process.env.PORT || 8080;
export const app = express();

const main = async() => {
  await connectDB();
  app.listen(port, () => console.log("Server connected", port));
}

app.use(express.json());
app.use(cors());
app.use("/recipes", ingredientsRouter);
// app.use(express.static('./src/static'));

main();
processRawRecipes();
