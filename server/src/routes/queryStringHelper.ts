const categories = [
  { category: "śniadanie", tags: ["śniadanie", "jogurt", "smothie"] },
  { category: "obiad", tags: ["obiad", "dania główne", "pomysł na obiad", "mięso", "zupy"] },
  { category: "kolacja", tags: ["kolacja", "szybkie dania", "pomysł na kolację", "smothie"] },
  { category: "przekąski", tags: ["przekaski", "przystawki", "smothie"] },
  { category: "desery", tags: ["deser", "ciasto", "ciasta", "truskawki"] },
  { category: "napoje", tags: ["napoje ciepłe", "napoje zimne", "herbaty"] },
];

export const getStartIndex = (pageNumber: number, length: number) => {
  if (pageNumber) return (pageNumber - 1) * length;
  return 0;
};

export const getTags = (category: string) => {
  const founded = categories.find((el) => el.category === category);
  return founded?.tags;
};
