import axios from "axios";
import cheerio, { AnyNode, CheerioAPI } from "cheerio";
import fs from "fs";

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
        for (let i = 1; i <= 3; i++) {
          let paginationUrlSuffix = "";
          if (i > 1) {
            paginationUrlSuffix = `?page=${i}`;
          }
          console.log(paginationUrlSuffix);
          axios(`${mainUrl}${paginationUrlSuffix}`).then((response) => {
            const html = response.data;
            const paginationPage = cheerio.load(html);
            paginationPage(".recipe-box", html).each(function () {
              //   const imgUrl = paginationPage(this).find("img").last().attr('src');
              const recipeUrlSuffix = paginationPage(this)
                .find("a")
                .attr("href");
              scrapRecipe(recipeUrlSuffix);
              });
          });
        }
      }
    })
  );
};

const recipes: any = [];
const images: any = [];
const scrapRecipe = (recipeName: string | undefined) => {
  axios(`https://www.przepisy.pl/${recipeName}`).then((reponse) => {
    const html: AnyNode = reponse.data;
    const recipePage = cheerio.load(html);
    // const recipe = {} as Recipe
    const recipe: any = {
      name: getName(recipePage, html),
      ingredients: getIngredients(recipePage, html),
      instructions: getInstructions(recipePage, html),
    };
    const urlImg: any = {
      title: recipeName,
      url: getImages(recipePage, html),
    };

    if (recipe) {
      recipes.push(recipe);
      images.push(urlImg);
    }

    const newImgs = images.filter((image: any) => image.url !== undefined);
    (async () => {
      await newImgs.forEach((image: any) => {
        downloadImages(image.url, `./output/img/${image.title}.jpg`);
      });
    })();

    // newImgs.forEach((image: any) => {
    //   axios({
    //     method: "get",
    //     url: image.url,
    //     responseType: "stream",
    //   }).then((response) => {
    //     // console.log(response.data)
    //     // fs.writeFileSync("magiczne-ciasto.jpg", response.data, "binary")
    //     response.data.pipe(fs.createWriteStream(`./output/img/a.jpg`, "utf-8"));
    //   });
    // });

    storeData("./output/data/recipes3.json", recipes);
  });
};

const getName = (recipePage: any, html: AnyNode): string => {
  return recipePage("div.recipe-desc", html).map(function (this: AnyNode) {
    return recipePage(this).find("div > h1").text();
  })[0];
};

const getIngredients = (recipePage: any, html: AnyNode): Ingredient[] => {
  return recipePage(".ingredients-list-content-item", html)
    .map(function (this: AnyNode) {
      return {
        name: recipePage(this).find(".ingredient-name").text(),
        quantity: recipePage(this).find(".quantity").text(),
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

const getImages = (recipePage: any, html: AnyNode): string | undefined => {
  return recipePage(".recipe-img", html).map(function (this: AnyNode) {
    return recipePage(this).find("img.ng-star-inserted").attr("src");
  })[0];
};

const storeData = (path: any, data: any) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const downloadImages = async (url: any, filepath: any) => {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => resolve(filepath));
  });
};

// scrap();

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
  instructions: string[];
}
