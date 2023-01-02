import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Recipe = new Schema({
  name: {
    type: String,
    required: true,
  },

  ingredients: [
    {
      id: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
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
