import connectDB from "@/utiles/connectDB";
import { NextResponse } from "next/server";
import Product from "../../../../../models/Product";

export async function POST(req) {
    try {
      await connectDB();
    } catch (error) {
      return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });
    }
try {
    const {id , quantity} =await req.json()

    const existingProduct = await Product.findOne({_id : id}).select({instock : 1});
    if(!existingProduct){
        return NextResponse.json({ error: "این محصول وجود ندارد" }, { status: 404 });
    }
    if(existingProduct?.instock > +quantity || existingProduct?.instock == +quantity){

        return NextResponse.json({ data: "yes" }, { status: 200 });
    }else {
        return NextResponse.json({ data: "no" }, { status: 200 });
    }
} catch (error) {
    return NextResponse.json({ error: "خطا از سمت سرور" }, { status: 500 });

}
}