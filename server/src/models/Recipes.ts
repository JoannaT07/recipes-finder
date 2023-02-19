import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Recipe = new Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  ingredients: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
      },
    },
  ],
  instructions: [
    {
      type: String
    },
  ],
  image: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
});

export default mongoose.models.Product || mongoose.model("Recipe", Recipe);
