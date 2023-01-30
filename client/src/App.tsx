import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipesFinder from "./components/RecipesFinder";
import { IngredientContextProvider } from "./context/ingredientContext";
import { RecipeCart } from "./components/RecipeCard";

function App() {
  return (
    <IngredientContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RecipesFinder />}></Route>
          <Route path="/:recipeId" element={<RecipeCart />}></Route>
        </Routes>
      </Router>
    </IngredientContextProvider>
  );
}

export default App;
