import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipesFinder from "./components/RecipesFinder";
import { IngredientContextProvider } from "./context/ingredientContext";
import { RecipePage } from "./components/Recipe";

function App() {
  return (
    <IngredientContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RecipesFinder />}></Route>
          <Route path="/:recipeId" element={<RecipePage />}></Route>
        </Routes>
      </Router>
    </IngredientContextProvider>
  );
}

export default App;
