import CropperSliderItem from "@/components/elements/cropper-slider-item";
import CropperSliderWrapper from "@/components/modules/cropperSliderWrapper";

import Category from "../../../../models/Category";
import Product from "../../../../models/Product";

const CropperSlider = async () => {
  const category = await Category.findOne({ link: "cropper" });
  if (!category?._id) return null;
  const data = await Product.find({
    category: {
      //   "link": { $in: [`pipes`] },
      $elemMatch: { link: category?.link },
    },
  })
    .select({
      title: 1,
      properties: 1,
    })
    .limit(10);
  console.log(data);
  console.log(category);
  return (
    <CropperSliderWrapper
      data={""}
      sliderTitle="پرفروش ها"
      link="/best-sellers"
      cat={JSON.parse(JSON.stringify(category))}
    >
      {data?.map((item) => (
        <CropperSliderItem
          key={item?._id}
          item={JSON.parse(JSON.stringify(item))}
        />
      ))}
    </CropperSliderWrapper>
  );
};

export default CropperSlider;
