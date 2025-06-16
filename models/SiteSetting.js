import { model, models, Schema } from "mongoose";

const siteSettingSchema = new Schema({
  welcomeTitle: {
    type: String,
    required: true,
  },
  welcomeDescription: {
    type: String,
    required: true,
  },
  welcomeImages: {
    type: Array,
    required: true,
  },
  address: {
    type: Array,
    default: [],
  },
  phone: {
    type: Array,
    default: [],
  },

  email: {
    type: String,
    default: "",
    required: true,
  },

  telegramLink: {
    type: String,
    default: "",
  },
  whatsappLink: {
    type: String,
    default: "",
  },
  instagramLink: {
    type: String,
    default: "",
  },
  youtubeLink: {
    type: String,
    default: "",
  },
  showPrice: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const SiteSetting =
  models.SiteSetting || model("SiteSetting", siteSettingSchema);
export default SiteSetting;
