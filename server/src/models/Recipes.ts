import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const Recipe = new Schema({
  name: {
    type: String,
    required: true,
  },

  ingredients: [
    {
      name: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        // ref: "Ingredients",
        // required: true,
      },
      quantity: {
        type: String,
        // ref: "Quantity",
        // required: true,
      },
    },
  ],

  instructions: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.models.Product || mongoose.model("Recipe", Recipe);
