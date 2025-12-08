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
async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages/main-page`,
    { next: { revalidate: 60 } }
  );
  const result = await res.json();
  return result;
}

const MainPage = async () => {
  const data = await getData();

  return (
    <main className=" flex flex-col gap-10">
      <WelcomeSection data={data?.data?.welcomeData} />
      <MainCategorySection />
      <CropperSlider />
      <NewProducts newproducts={data?.data?.newproducts} />
      <BestSellers data={data?.data?.bestSellingProducts} />
      <ArashSuggestion data={data?.data?.suggestions} />
      <FilterRemoteSection />
      <RandomProducts data={data?.data?.randomProduct} />
      <Blogs blogData={data?.data?.blogData} />
      <ArashStoreIntroduce />
      <ProductBrif />
    </main>
  );
};

export default MainPage;
