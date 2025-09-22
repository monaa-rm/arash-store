import { model, models, Schema } from "mongoose";

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
  },
  productId: {
    type: String,
    required: true,
  },
  higherCmId: {
    type: String,
    default: "",
  },
  answerIds: {
    type: [],
    default: [],
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Comment = models.Comment || model("Comment", commentSchema);
export default Comment;
