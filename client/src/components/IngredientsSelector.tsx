import { FC, useContext, useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";
import { IngredientContext } from "../context/ingredientContext";
import { Ingredients } from "../model/types";
import Select from "react-select";

const options: SelectedCategory[] = [
  { value: "Wszystkie", label: "Wszystkie" },
  { value: "Śniadanie", label: "Śniadanie" },
  { value: "Obiad", label: "Obiad" },
  { value: "Kolacja", label: "Kolacja" },
  { value: "Przekąski", label: "Przekąski" },
  { value: "Desery", label: "Desery" }
];

interface SelectedCategory {
  value: string;
  label: string;
}

type Props = {
  choosenIngredients: Ingredients;
  setChoosenIngredients: any;
  selectedCategory?: string;
  setSelectedCategory: any
};

export const IngredientsSelector: FC<Props> = ({
  choosenIngredients,
  setChoosenIngredients,
  selectedCategory,
  setSelectedCategory
}) => {
  const ingredients = useContext(IngredientContext);
  const sortedIngredients = ingredients.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  // const ingredientNames = ingredients.map(({ name }) => name).sort();
  const [wantedIngredient, setWantedIngredient] = useState("");

  useEffect(() => {
    console.log(choosenIngredients);
  }, [choosenIngredients]);

  const handleAddIngredient = (name: string, id: string) => {
    setChoosenIngredients([...choosenIngredients, { name, id }]);
    setWantedIngredient("");
  };

  const handleDelete = (id: string) => {
    setChoosenIngredients(
      choosenIngredients.filter((ingredient) => id !== ingredient.id)
    );
  };

  const handleCategoryChange = (selectedCategory: SelectedCategory)=> {
    console.log("handleChange", selectedCategory.value);
    setSelectedCategory(selectedCategory.value.toLocaleLowerCase())
  }

  useEffect(() => {
    console.log(selectedCategory)
  }, [selectedCategory])
  

  return (
    <div className="search-engine">
      <div className="search-form">
        <div className="search-input">
          <HiMagnifyingGlass className="magnifying-icon" />
          <input
            type="text"
            value={wantedIngredient}
            onChange={(e) => setWantedIngredient(e.target.value)}
          />
          {wantedIngredient && (
            <div className="ingredients-popup show">
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
          )}
        </div>
        <Select
          className={"categories"}
          options={options}
          defaultValue={options[0]}
          onChange={handleCategoryChange}
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
      <div className="choosen">
        {choosenIngredients.length > 0 && (
          <>
            {choosenIngredients.map((choosen) => (
              <div className="choosen-ingredients">
                <span>{choosen.name}</span>
                <button onClick={() => handleDelete(choosen.id)}>
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
