import { Ingredients } from "../../model/types";
import { sortIngredients } from "../../service/ingredientsSorter";

test.each([
  [
    [
      { id: "dshfshfs", name: "jajka" },
      { id: "hgdhjs12", name: "banan" },
      { id: "76789hfs", name: "awokado" },
      { id: "hsfhdsuf8", name: "miód" },
      { id: "67yudf89b", name: "kurczak" },
    ],
    [
      { id: "76789hfs", name: "awokado" },
      { id: "hgdhjs12", name: "banan" },
      { id: "dshfshfs", name: "jajka" },
      { id: "67yudf89b", name: "kurczak" },
      { id: "hsfhdsuf8", name: "miód" },
    ],
  ],
])(
  "Should return sorted ingredients",
  (ingredients: Ingredients, expected: Ingredients) => {
    expect(sortIngredients(ingredients)).toEqual(expected);
  }
);
