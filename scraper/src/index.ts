import axios from "axios";
import cheerio, { AnyNode, CheerioAPI } from "cheerio";

const rootUrls = ["https://www.przepisy.pl/przepisy/na-skroty/prosty-przepis"];

const scrap = () => {
  rootUrls.forEach((mainUrl) =>
    axios(mainUrl).then((response) => {
      const html = response.data;
      const mainPage = cheerio.load(html);
      const lastPageNumber = Number(
        mainPage(".pagination__btn--outer", html).last().text()
      );
      if (lastPageNumber) {
        for (let i = 1; i <= lastPageNumber; i++) {
          let paginationUrlSuffix = "";
          if (i > 1) {
            paginationUrlSuffix = `?page=${paginationUrlSuffix}`;
          }
          axios(`${mainUrl}${paginationUrlSuffix}`).then((response) => {
            const html = response.data;
            const paginationPage = cheerio.load(html);
            paginationPage(".recipe-box", html).each(function () {
              const recipeUrlSuffix = paginationPage(this)
                .find("a")
                .attr("href");
              axios(`https://www.przepisy.pl/przepisy${recipeUrlSuffix}`).then(
                (response) => {
                  const receipePage = cheerio.load(response.data);
                  receipePage();
                }
              );
            });
          });
        }
      }
    })
  );
};

const recipes = [];
const scrapRecipe = () => {
  axios("https://www.przepisy.pl/przepis/magiczne-ciasto").then((reponse) => {
    const html: AnyNode = reponse.data;
    const recipePage = cheerio.load(html);
    // const recipe = {} as Recipe
    const recipe = {
      name: "magiczne-ciasto",
      ingredients: getIngredients(recipePage, html),
      instructions: getInstructions(recipePage, html)
    };

    console.log(recipe)
  });
};

const getIngredients = (recipePage: any, html: AnyNode): Ingredient[] => {
  return recipePage(".ingredients-list-content-item", html).map(function (this: AnyNode) {
    return {
      name: recipePage(this).find(".ingredient-name").text(),
      quantity: recipePage(this).find(".quantity").text(),
    };
  })
  .toArray();
};

const getInstructions = (recipePage: any, html: AnyNode): string[] => {
    return recipePage(".step-info-description", html).map(function(this: AnyNode){
        return recipePage(this).text().trim()
    })
    .toArray();
}

scrapRecipe();

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
  instructions: string[]
}
