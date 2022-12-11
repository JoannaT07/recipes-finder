import axios from "axios";
import { RecipesModel } from "../models/recipes";

export const processRecipes = async () => {
  const rawData = await getDataFromApi();
  if (rawData) {
    const parseData = await parseRawData(rawData);
    console.log(parseData)
    updateDataInDb(parseData);
  }
};

const getDataFromApi = async () => {
  try {
    const options = {
      method: "GET",
      url: "https://tasty.p.rapidapi.com/recipes/list",
      params: { from: "0", size: "20", tags: "under_30_minutes" },
      headers: {
        "X-RapidAPI-Key": "05eca59d77msh08269870e87fa7cp18d311jsn203a1d285d2b",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    return response.data.results;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const parseRawData = (rawData: any) => {
  return rawData.map((recipe: any) => ({
    name: recipe.name,
  }));
};

const updateDataInDb = async (parseNews:any) => {
  try {
    await RecipesModel.deleteMany({});
    await RecipesModel.insertMany(parseNews);
  } catch (err) {
    console.log(err);
  }
};