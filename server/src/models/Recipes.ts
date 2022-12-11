import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const Recipes = new Schema({
  name: {
    type: String
  }
//   instructions: {
//     text: String,
//     position: Number
//   }
});

export const RecipesModel = mongoose.model("Recipes", Recipes)