import { model, models, Schema } from "mongoose";
import User from "./User";

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  imageSrc: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  creator: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
