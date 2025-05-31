import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;

  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to database:", error); //  اطلاعات خطا را نمایش می دهد
    // process.exit(1); // برنامه را با کد خطا خاتمه می دهد
  }
};

export default connectDB;

