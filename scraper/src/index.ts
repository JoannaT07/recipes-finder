import axios from 'axios'
import cheerio from 'cheerio'


axios("https://www.przepisy.pl/przepisy/na-skroty/prosty-przepis")
.then(response => {
    const html = response.data;
    const mainPage = cheerio.load(html);
    mainPage(".recipe-box", html).each(function(){
        const recipeUrlSuffix = mainPage(this).find("a").attr("href")
        axios(`https://www.przepisy.pl/przepisy${recipeUrlSuffix}`)
        .then(response => {
            const receipePage = cheerio.load(response.data)
            receipePage()
        })
    })

    console.log(mainPage(".pagination__btn--outer", html).last().text())
})