import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
  creatorId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
