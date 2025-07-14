import { model, models, Schema } from "mongoose";

const orderSchema = new Schema({
  items: [
    {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  allCost: { type: Number, required: true },
  status: {
    type: String,
    default: "Pending",
    enum: [
      "Pending",
      "Processing",
      "Shipped",
      "In Transit",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Returned",
      "Failed Delivery",
    ],

  },
  client: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  province: {
    type: Object,
    required: true,
  },
  city: {
    type: Object,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  additionalInfo: {
    type: String,
    default: "",
  },

  // orderGroup: {
  //   type: Number,
  //   required: true,
  //   default: 1,
  // },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Order = models.Order || model("Order", orderSchema);
export default Order;
