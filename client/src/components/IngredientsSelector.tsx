import { FC, useContext, useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";
import { IngredientContext } from "../context/ingredientContext";
import { Ingredients } from "../model/types";

type Props = {
  choosenIngredients: Ingredients;
  setChoosenIngredients: any;
};

export const IngredientsSelector: FC<Props> = ({
  choosenIngredients,
  setChoosenIngredients,
}) => {
  const ingredients = useContext(IngredientContext);
  const sortedIngredients = ingredients.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  // const ingredientNames = ingredients.map(({ name }) => name).sort();
  const [wantedIngredient, setWantedIngredient] = useState("");

  useEffect(() => {
    console.log(choosenIngredients)
  }, [choosenIngredients])
  

  const handleAddIngredient = (name: string, id: string) => {
    setChoosenIngredients([...choosenIngredients, {name, id}]);
    setWantedIngredient("");
  };

  // const handleDelete = (id: string) => {
  //   setChoosenIngredients(choosenIngredients.filter(ingredient => id !== ingredient.id))
  // }

  return (
    <div className="search-engine">
      <div className="search-input">
        <HiMagnifyingGlass className="magnifying-icon" />
        <input
          type="text"
          value={wantedIngredient}
          onChange={(e) => setWantedIngredient(e.target.value)}
        />
      </div>
      {/* <div className="choosen">
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
      </div> */}
      {wantedIngredient && (
        <div className="ingredients-popup show">
          <ul>
              {sortedIngredients
              .filter(({name}) => name.toLowerCase().indexOf(wantedIngredient) !== -1)
              .map(({name, id}) => (
                <li onClick={() => handleAddIngredient(name, id)} key={id}>
                  {name}
                </li>
              )
              )}
          </ul>
        </div>
      )}
    </div>
  );
};
