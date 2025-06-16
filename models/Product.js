import { model, models, Schema } from "mongoose";
import User from "./User";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: Array,
    required: true,
  },
  productId : {
    type: String,
    required: true,
    default: 0
  },
  score: {
    type: Number,
    default: 0,
  },
  scoreNumber: {
    type: Number,
    default: 0,
  },
  commentsNumber: {
    type: Number,
    default: 0,
  },
  price: {
    type: Object,
    required: true,
  },
  category: {
    type: [Object],
  
  },
  properties: {
    type: Array,
  },
  
  description: {
    type: [Object],
  },
  instock: {
    type: Number,
  },
  unit: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
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

const Product = models.Product || model("Product", ProductSchema);
export default Product;
