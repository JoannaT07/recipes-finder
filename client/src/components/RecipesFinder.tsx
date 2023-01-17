import { FC, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { RecipesSelector } from "./RecipesSelector";
import { IngredientsSelector } from "./IngredientsSelector";
import { Ingredients } from "../model/types";

const RecipesFinder: FC = () => {
  const [choosenIngredients, setChoosenIngredients] = useState<Ingredients>([]);

  const handleDelete = (id: string) => {
    setChoosenIngredients(choosenIngredients.filter(ingredient => id !== ingredient.id))
  }

  return (
    <div className="main-container">
      <div className="top-section">
        <div className="nav">
          <div className="logo-sm">
            <img src="../public/logo_pur.png" alt="" style={{ height: "74px" }} />
          </div>
          <IngredientsSelector
            choosenIngredients={choosenIngredients}
            setChoosenIngredients={setChoosenIngredients}
          />
          <div className="categories">
            <ul>
              <li>Śniadanie</li>
              <li>Obiad</li>
              <li>Kolacja</li>
              <li>Przekąski</li>
              <li>Desery</li>
            </ul>
          </div>
         
        </div>
      </div>
      <div className="browser">       
      </div>
     
      {/* <div className="choosen"> */}
        {choosenIngredients.length > 0 && (
          // <>
          <div className="choosen">
            {choosenIngredients.map((choosen) => (
              <div className="choosen-ingredients">
                <span>{choosen.name}</span>
                <button onClick={() => handleDelete(choosen.id)}>
                  <CiCircleRemove />
                </button>
              </div>
            ))}
            </div>
          // </>
        )}
      {/* </div> */}
      <RecipesSelector choosenIngredients={choosenIngredients} />
    </div>
  );
};

export default RecipesFinder;
