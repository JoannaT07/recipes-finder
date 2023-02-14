import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoundedRecipe } from "../service/apiService";
import { Recipe } from "../model/types";

export const RecipePage = () => {
  const { recipeId } = useParams();
  const [foundedRecipe, setfoundedRecipe] = useState<Recipe>();

  useEffect(() => {
    window.scrollTo(0, 0);
    getFoundedRecipe(recipeId).then(setfoundedRecipe);
  }, []);

  return (
    <div className="recipe-container">
      <div className="top-section">
        <div className="nav">
          <div className="logo-sm">
            <a href="/">
            <img
              src="../public/logo_pom.png"
              alt=""
              style={{ height: "74px" }}
            /></a>
          </div>
        </div>
      </div>
      <div className="recipe-body">
        <div className="recipe-title">
          <h1>{foundedRecipe?.name}</h1>
        </div>
        <div className="mid-section">
          <div className="ingredient-list">
            <h2>Składniki:</h2>
            <ul>
              {foundedRecipe?.ingredients.map((ingredient) => (
                <li>
                  <p>{ingredient.name}</p>
                  <span>{ingredient.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe-photo">
            <img
              src={`../public/img/${
                foundedRecipe?.image !== undefined
                  ? foundedRecipe.image
                  : "default"
              }.jpg`}
              alt=""
            />
          </div>
        </div>
        <div className="bottom-section">
          <div className="instruction">
            <h2>Sposób przygotowania:</h2>
            {foundedRecipe?.instructions.map((step) => (
              <p>{step}</p>
            ))}
          </div>
        </div>
        <button className="print" onClick={() => print()}>Drukuj przepis</button>
      </div>
    </div>
  );
};
