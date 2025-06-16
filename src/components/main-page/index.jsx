import React from "react";
import WelcomeSection from "./welcome-section";
import MainCategorySection from "./main-category-section";
import BestSellers from "./best-sellers";
import ProductBrif from "./product-brif";
import CropperSlider from "./cropper-slider";
import NewProducts from "./new-products";
import ArashSuggestion from "./arash-suggestions";
import FilterRemoteSection from "./filter-remote-section";
import RandomProducts from "./random-products";
import Blogs from "./blogs";
import ArashStoreIntroduce from "./arashstore-introduce";
import SiteSetting from "../../../models/SiteSetting";
import Product from "../../../models/Product";
import connectDB from "@/utiles/connectDB";

const MainPage = async () => {
  await connectDB();
  const welcomeData = await SiteSetting.findOne();
  const newproducts = await Product.find().limit(6).sort({ _id: -1 });

  return (
    <main className=" flex flex-col gap-10">
      <WelcomeSection data={JSON.parse(JSON.stringify(welcomeData)) || {}} />
      <MainCategorySection />
      <CropperSlider />
      <NewProducts newproducts={JSON.parse(JSON.stringify(newproducts))} />
      {/*  <BestSellers />
      <ArashSuggestion />
      <FilterRemoteSection />
      <RandomProducts />
      <Blogs />
      <ArashStoreIntroduce />*/}
      <ProductBrif />
    </main>
  );
};

export default MainPage;
