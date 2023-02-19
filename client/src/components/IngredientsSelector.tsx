import { FC, useContext, useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";
import { IngredientContext } from "../context/ingredientContext";
import { Ingredients } from "../model/types";
import Select from "react-select";

export const options: SelectedCategory[] = [
  { value: "wszystkie", label: "Wszystkie" },
  { value: "śniadanie", label: "Śniadanie" },
  { value: "obiad", label: "Obiad" },
  { value: "kolacja", label: "Kolacja" },
  { value: "przekąski", label: "Przekąski" },
  { value: "desery", label: "Desery" },
  { value: "napoje", label: "Napoje" },
];

interface SelectedCategory {
  value: string;
  label: string;
}

type Props = {
  chosenIngredients: Ingredients;
  setChosenIngredients: any;
  selectedCategory: any;
  setSelectedCategory: any;
};

export const IngredientsSelector: FC<Props> = ({
  chosenIngredients,
  setChosenIngredients,
  selectedCategory,
  setSelectedCategory,
}) => {
  const ingredients = useContext(IngredientContext);
  const sortedIngredients = ingredients.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [isOpen, setIsOpen] = useState(false);
  const [wantedIngredient, setWantedIngredient] = useState("");

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if ((e.target as HTMLInputElement).tagName !== "INPUT") {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  const handleAddIngredient = (name: string, id: string) => {
    window.scrollTo(0, 0);
    setChosenIngredients([...chosenIngredients, { name, id }]);
    setWantedIngredient("");
    localStorage.setItem(
      "ingredients",
      JSON.stringify([...chosenIngredients, { name, id }])
    );
  };

  const handleDelete = (id: string) => {
    window.scrollTo(0, 0);
    setChosenIngredients(
      chosenIngredients.filter((ingredient) => id !== ingredient.id)
    );
  };

  const handleCategoryChange = (selectedCategory: SelectedCategory | null) => {
    if(!selectedCategory) return;
    window.scrollTo(0, 0);
    setSelectedCategory(selectedCategory.value);
    localStorage.setItem("category", JSON.stringify(selectedCategory.value));
  };

  return (
    <div className="search-engine">
      <div className="search-form">
        <div className="search-input">
          <HiMagnifyingGlass className="magnifying-icon" />
          <input
            type="text"
            value={wantedIngredient}
            onClick={() => setIsOpen((prev) => !prev)}
            onChange={(e) => setWantedIngredient(e.target.value)}
          />
          <div
            className={isOpen ? "ingredients-popup show" : "ingredients-popup"}
          >
            <ul>
              {sortedIngredients
                .filter(
                  ({ name }) =>
                    name.toLowerCase().indexOf(wantedIngredient) !== -1
                )
                .map(({ name, id }) => (
                  <li onClick={() => handleAddIngredient(name, id)} key={id}>
                    {name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <Select
          className={"categories"}
          options={options}
          onChange={handleCategoryChange}
          value={options.find((val) => val.value === selectedCategory)}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            borderColor: "white",
            cursor: "pointer",
            colors: {
              ...theme.colors,
              primary50: "#f0f0f0",
              primary25: "#f0f0f0",
              primary: "#e37b05",
            },
          })}
        ></Select>
      </div>
      <div className="chosen">
        {chosenIngredients.length > 0 && (
          <>
            {chosenIngredients.map((chosen) => (
              <div key={chosen.name} className="chosen-ingredients">
                <span>{chosen.name}</span>
                <button onClick={() => handleDelete(chosen.id)}>
                  <TiDelete />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
