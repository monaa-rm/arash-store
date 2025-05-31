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

const MainPage = () => {
  return (
    <main className=" flex flex-col gap-10">
      <WelcomeSection />
      <MainCategorySection />
      <BestSellers />
      <CropperSlider />
      <NewProducts />
      <ArashSuggestion />
      <FilterRemoteSection />
      <RandomProducts />
      <Blogs />
      <ArashStoreIntroduce />
      <ProductBrif />
    </main>
  );
};

export default MainPage;
