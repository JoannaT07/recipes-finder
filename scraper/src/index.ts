import axios from "axios";
import fs from "fs";
import {
  getLastPageNumber,
  getRecipe,
  getRecipeUrlSuffixes,
} from "./pageService";

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  instructions: string[];
  image: string | undefined;
}

const rootUrls = [
  "https://www.przepisy.pl/przepisy/na-skroty/przepisy-z-4-skladnikow",
  "https://www.przepisy.pl/przepisy/na-skroty/przepisy-z-5-skladnikow",
  "https://www.przepisy.pl/przepisy/na-skroty/szybkie-przepisy",
  "https://www.przepisy.pl/przepisy/na-skroty/tanie-dania",
  "https://www.przepisy.pl/przepisy/na-skroty/prosty-przepis"
];

const getPaginationUrlSuffix = (pageNumber: number) => {
  let paginationUrlSuffix = "";
  if (pageNumber > 1) {
    paginationUrlSuffix = `?page=${pageNumber}`;
  }
  return paginationUrlSuffix;
};

const getRecipeUrls = async (url: string, lastPageNumber: number) => {
  const recipeUrlSuffixes: string[] = [];
  for (let i = 1; i <= lastPageNumber; i++) {
    const paginationUrlSuffix = getPaginationUrlSuffix(i);
    const recipeUrlSuffixesPortion = await getRecipeUrlSuffixes(
      `${url}${paginationUrlSuffix}`
    );
    if (recipeUrlSuffixesPortion?.length) {
      recipeUrlSuffixes.push(...recipeUrlSuffixesPortion);
    }
  }
  return recipeUrlSuffixes;
};

const saveImage = async (imageUrl: string, imageName: string) => {
  try {
    const res = await axios({
      method: "get",
      url: imageUrl,
      responseType: "stream",
    });
    const stream = res.data;
    const fileStream = fs.createWriteStream(
      `../server/output/img/${imageName}.jpg`,
      "utf-8"
    );
    stream.pipe(fileStream);
  } catch (e) {
    console.error(e);
  }
};

const appendRecipes = (recipe: Recipe | undefined, i: number) => {
  fs.appendFileSync(
    `../server/output/data/recipes${i}.json`,
    JSON.stringify(recipe) + "\n"
  );
};

// const sleep = async(seconds: number) => {
//   return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
// }

const scrap = async (url: string, i: number) => {
  console.log(`Processing url ${url}`)
  const lastPageNumber = await getLastPageNumber(url);
  if (lastPageNumber) {
    console.log(`Last page number for url ${url} is ${lastPageNumber}`)
    const recipeUrlSuffixes: string[] = await getRecipeUrls(url, lastPageNumber);
    console.log(`For recipes url ${url} was founded ${recipeUrlSuffixes.length} recipes`)
    for (const recipeUrlSuffix of recipeUrlSuffixes) {
      const recipe = await getRecipe(recipeUrlSuffix);
      if (recipe) {
        let imageName: string | undefined;
        if (recipe.image) {
          imageName = recipeUrlSuffix.replace("przepis/", "");
          if (!fs.existsSync(`../server/output/img/${imageName}.jpg`)) {
            await saveImage(recipe.image, imageName);
          }
          recipe.image = imageName
        }
        appendRecipes(recipe, i)
      }
    }
    console.log(`End of url ${url} processing`)
  }
};

const scrapeAllRecipes = async () => {
  for (let i = 0; i <= rootUrls.length; i++) {
    let url = rootUrls[i]
    await scrap(url, i)
  }
}

scrapeAllRecipes();