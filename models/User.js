import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default:""
  },
  lastName: {
    type: String, default:""
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  liked_residances: {
    type: [String],
    default: [],
  },
  role: {
    type:String,
    default:"user"
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);
export default User;
