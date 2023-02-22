import {
  getQueryObject,
  getStartIndex,
  getTags,
} from "../../src/service/commonService";

test.each([
  [
    "huy23ey23,hj2j234h",
    "wszystkie",
    {
      ingredients: {
        $all: [
          { $elemMatch: { id: "huy23ey23" } },
          { $elemMatch: { id: "hj2j234h" } },
        ],
      },
    },
  ],
  [
    "5nxsLYwrA6b6KETbU644rj",
    "kolacja",
    {
      ingredients: {
        $all: [
          {
            $elemMatch: { id: "5nxsLYwrA6b6KETbU644rj" },
          },
        ],
      },
      tags: {
        $in: ["kolacja", "szybkie dania", "pomysł na kolację", "smothie"],
      },
    },
  ],
  [
    undefined,
    "napoje",
    {
      tags: {
        $in: ["napoje ciepłe", "napoje zimne", "herbaty"],
      },
    },
  ],
  [undefined, "wszystkie", {}],
])(
  "Should create query object",
  (ingredients: string | undefined, category: string, expected: object) => {
    //when
    const actual = getQueryObject(ingredients, category);
    //then
    expect(actual).toEqual(expected);
  }
);

test.each([
  [1, 48, 0],
  [2, 48, 48],
  [5, 48, 192],
])(
  "Should return start index",
  (pageNumber: number, length: number, expected: number) => {
    expect(getStartIndex(pageNumber, length)).toEqual(expected);
  }
);

test.each([
  ["napoje", ["napoje ciepłe", "napoje zimne", "herbaty"]],
  ["przekąski", ["przekaski", "przystawki", "smothie"]],
  ["wszystkie", undefined],
])("Should return tags", (category: string, expected: string[] | undefined) => {
  expect(getTags(category)).toEqual(expected);
});