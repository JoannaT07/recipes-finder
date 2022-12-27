import axios from "axios";
import cheerio, { AnyNode, CheerioAPI } from "cheerio";
import { Ingredient } from ".";

export const getLastPageNumber = async (url: string) => {
  try {
    const res = await axios(url);
    const html = res.data;
    const mainPage = cheerio.load(html);
    return Number(mainPage(".pagination__btn--outer", html).last().text());
  } catch (e) {
    console.error(e);
  }
};

export const getRecipeUrlSuffixes = async (url: string) => {
  try {
    const res = await axios(url);
    const html = res.data;
    const paginationPage = cheerio.load(html);
    return paginationPage(".recipe-box", html)
      .map(function () {
        return paginationPage(this).find("a").attr("href");
      })
      .toArray();
  } catch (e) {
    console.error(e);
  }
};

export const getRecipe = async(recipeUrlSuffix:string) => {
    try{
        const res = await  axios(`https://www.przepisy.pl/${recipeUrlSuffix}`)
        const html = res.data;
        const recipePage = cheerio.load(html);
        return {
          name: getName(recipePage, html),
          ingredients: getIngredients(recipePage, html),
          instructions: getInstructions(recipePage, html),
          image: getImageUrl(recipePage, html)
        };
    } catch (e) {
        console.error(e);
      }
}

const getName = (recipePage: CheerioAPI, html: AnyNode): string => {
    return recipePage("div.recipe-desc h1", html).first().text()
  };
  
  const getIngredients = (recipePage: any, html: AnyNode): Ingredient[] => {
    return recipePage(".ingredients-list-content-item", html)
      .map(function (this: AnyNode) {
        return {
          name: recipePage(this).find(".ingredient-name").text().trim(),
          quantity: recipePage(this).find(".quantity").text().trim(),
        };
      })
      .toArray();
  };
  
  const getInstructions = (recipePage: any, html: AnyNode): string[] => {
    return recipePage(".step-info-description", html)
      .map(function (this: AnyNode) {
        return recipePage(this).text().trim();
      })
      .toArray();
  };

  const getImageUrl = (recipePage: CheerioAPI, html: AnyNode): string | undefined => {
    const imageUrl =  recipePage(".recipe-img", html).map(function (this: AnyNode) {
      return recipePage(this).find("img.ng-star-inserted").attr("src");
    })[0];
    return imageUrl?.match(/^https:.*$/) ? imageUrl : undefined
  }