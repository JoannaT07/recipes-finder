import express, { Request, Response } from "express";
import cors from 'cors';
import { connectDB } from "./database";
import recipesRouter from './routes/recipes'
import { processRawRecipes } from "./service/recipesSource";


const PORT = 5000;
export const app = express();
app.use(express.json());

app.use(cors());

app.use('/recipes', recipesRouter)

// app.use(express.static('./src/static'));
const main = async () => {
    // await connectDB();
    app.listen(PORT, () => console.log("Server connected", PORT));
}

main()

processRawRecipes()

