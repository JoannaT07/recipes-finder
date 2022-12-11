import * as fs from 'fs';

export const processRawRecipes = () => {
    const rawData = loadData()
}

const loadData = () => {
    const value = fs.readFileSync('malusi.json', 'utf8')
//     const value = fs.readFile('malusi.json', 'utf8', (err: any, data: any) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     // console.log(data);
//   });
   value.split(/\r?\n/).map<RawReceipe>(line =>  {
    if(line){
        console.log(JSON.parse(line))
        return JSON.parse(line)
    }
  });

  
}

interface RawReceipe{
    _id: object | null
    name: string | null
    ingredients: string | null
    url: string | null
    image: string | null
    ts: object | null
    cookTime: string | null
    source: string | null
    recipeYield: string | null
    prepTime: string | null
    description: string | null
}
