import { Ingredients } from "../../model/types";
import { getQueryString } from "../../service/apiService";

test.each([
  [
    1,
    [{ id: "hgdhadg", name: "kakao" }],
    "obiad",
    "?page=1&ingredients=hgdhadg&category=obiad",
  ],
  [
    3,
    [
      { id: "hgdhadg", name: "kakao" },
      { id: "hgdhgdfhjdgfhadg", name: "masło" },
    ],
    "kolacja",
    "?page=3&ingredients=hgdhadg,hgdhgdfhjdgfhadg&category=kolacja",
  ],
  [5, undefined, "wszystkie", "?page=5&category=wszystkie"],
])(
  "Should return query string",
  (
    page: number,
    ingredients: Ingredients | undefined,
    category: string,
    expected: string
  ) => {
    expect(getQueryString(page, ingredients, category)).toEqual(expected);
  }
);
