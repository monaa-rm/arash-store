import SearchMainBoxHeader from "@/components/elements/search-mainBox-header";
import SearchBoxItems from "../search-box-items";

const items = [
  {
    id: "1",
    title: " آب 6 مرحله ای ن",
    price: 1855455,
    inStock: 25,
  },
  {
    id: "2",
    title: "  دستگاه تصفیه آب 6 مرحله ای چفتن",
    price: 1250000,
    inStock: 1,
  },
  {
    id: "3",
    title: " آب 6 مرحله ای  6 مرحله ای چفتن",
    price: 42585665,
    inStock: 0,
  },
  {
    id: "4",
    title:
      " آب 6 مرحله آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای چفتن آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای  ای چفتن",
    price: 34585665,
    inStock: 8,

  },
  {
    id: "5",
    title:
      " آب 6 مرحله آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای چفتن  چفتن",
    price: 5854587,
    inStock: 15,

  },
  {
    id: "6",
    title:
      " آب 6 مرحله چفتن",
    price: 5000000,
    inStock: 14,

  },
];
const SearchMainBox = () => {
  return (
    <div className="w-full pb-8   lg:rounded-lg lg:border">

     <SearchMainBoxHeader />
     <SearchBoxItems items={items}/>
    </div>
  );
};

export default SearchMainBox;
