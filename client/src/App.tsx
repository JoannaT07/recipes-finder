import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipesFinder from "./components/RecipesFinder";
import { IngredientContextProvider } from "./context/ingredientContext";
import { RecipeCart } from "./components/RecipeCart";

function App() {
  return (
    <IngredientContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RecipesFinder />}></Route>
          <Route path="/recipe" element={<RecipeCart />}></Route>
        </Routes>
      </Router>
      {/* <Recipes /> */}
    </IngredientContextProvider>
  );
}

export default App;
