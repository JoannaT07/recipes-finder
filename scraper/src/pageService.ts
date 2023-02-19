import axios, { AxiosError } from "axios";
import cheerio, { AnyNode, CheerioAPI } from "cheerio";
import { Ingredient } from ".";

export const getLastPageNumber = async (url: string) => {
  try {
    const res = await axios(url);
    const html = res.data;
    const mainPage = cheerio.load(html);
    let lastPageNumber = Number(
      mainPage(".pagination__btn--outer", html).last().text()
    );
    if (!lastPageNumber) {
      lastPageNumber = Number(
        mainPage(".pagination__btn:not(.pagination__btn--arrow)", html)
          .last()
          .text()
      );
    }
    return lastPageNumber;
  } catch (e) {
    handleApiError(e as AxiosError);
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
    handleApiError(e as AxiosError);
  }
};

export const getRecipe = async (recipeUrlSuffix: string) => {
  try {
    const res = await axios(`https://www.przepisy.pl${recipeUrlSuffix}`);
    const html = res.data;
    const recipePage = cheerio.load(html);
    return {
      name: getName(recipePage, html),
      ingredients: getIngredients(recipePage, html),
      instructions: getInstructions(recipePage, html),
      image: getImageUrl(recipePage, html),
      tags: getTags(recipePage, html)
    };
  } catch (e) {
    handleApiError(e as AxiosError);
  }
};

const getName = (recipePage: CheerioAPI, html: AnyNode): string => {
  return recipePage("div.recipe-desc h1", html).first().text().trim();
};

const getIngredients = (recipePage: CheerioAPI, html: AnyNode): Ingredient[] => {
  return recipePage(".ingredients-list-content-item", html)
    .map(function (this: AnyNode) {
      return {
        name: recipePage(this).find(".ingredient-name").text().trim().toLowerCase(),
        quantity: recipePage(this).find(".quantity").text().trim(),
      };
    })
    .toArray();
};

const getInstructions = (recipePage: CheerioAPI, html: AnyNode): string[] => {
  return recipePage(".step-info-description", html)
    .map(function (this: AnyNode) {
      return recipePage(this).text().trim();
    })
    .toArray();
};

const getImageUrl = (
  recipePage: CheerioAPI,
  html: AnyNode
): string | undefined => {
  const imageUrl = recipePage(".recipe-img", html).map(function (
    this: AnyNode
  ) {
    return recipePage(this).find("img.ng-star-inserted").attr("src");
  })[0];
  return imageUrl?.match(/^https:.*$/) ? imageUrl : undefined;
};

const getTags = (recipePage: CheerioAPI, html: AnyNode): string[] => {
  return recipePage(".tags > a", html)
  .map(function (this: AnyNode) {
    return recipePage(this).text().trim().toLowerCase();
  })
  .toArray();
}

const handleApiError = (e: AxiosError) => {
  console.error(`API error with code ${e.code} for url ${e.config?.url}`);
};
