import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipesFinder from "./components/RecipesFinder";
import { IngredientContextProvider } from "./context/ingredientContext";
import { RecipePage } from "./components/Recipe";

window.localStorage.clear()
window.scrollTo(0,0)

function App() {
  return (
    <IngredientContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RecipesFinder />}/>
          <Route path="/:recipeId" element={<RecipePage />}/>
        </Routes>
      </Router>
    </IngredientContextProvider>
  );
}

export default App;
