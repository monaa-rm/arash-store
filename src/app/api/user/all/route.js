import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export async function GET(req) {
  try {
    await connectDB();
    console.log("ok");
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
  try {
    // const data = await req.json();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const searchQuery = url.searchParams.get("query") || "";

    const indexOfLastUser = page * limit;
    const indexOfFirstUser = indexOfLastUser - limit;
    console.log("start");
    if (searchQuery) {
      // filter.title = { $regex: searchQuery, $options: 'i' };
      const sendUsers = await User.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { lastName: { $regex: searchQuery, $options: "i" } },
          { phone: { $regex: searchQuery, $options: "i" } },
        ],
      })
        .skip(indexOfFirstUser)
        .limit(limit)
        .exec();
      console.log("search 11111");
      const totalUsers = await User.countDocuments({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { lastName: { $regex: searchQuery, $options: "i" } },
          { phone: { $regex: searchQuery, $options: "i" } },
        ],
      });
      console.log("search 2222222");
      const totalPages = Math.ceil(totalUsers / limit);
      console.log("search 33333333");
      console.log({ sendUsers, totalPages, page, limit, searchQuery });
      return NextResponse.json(
        { data: { sendUsers, totalPages, totalUsers } },
        { status: 200 }
      );
    } else {
      const sendUsers = await User.find() // Post مدل Mongoose شماست
        .sort({ _id: -1 })
        .skip(indexOfFirstUser)
        .limit(limit)
        .exec();
      const totalUsers = await User.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);
      return NextResponse.json(
        { data: { sendUsers, totalPages, totalUsers } },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
  }
}
