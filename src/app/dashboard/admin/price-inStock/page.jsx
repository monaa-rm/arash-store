import { categorydata } from "@/components/dashboard/admin/categories-page";
import InsockPage from "@/components/dashboard/admin/insock-page";

const products = [
  {
    id: "1",
    title: " آب 6 مرحله ای ن",
    price: 1855455,
    inStock: 25,
    productId: "123",
  },
  {
    id: "2",
    title: "  دستگاه تصفیه آب 6 مرحله ای چفتن",
    price: 1250000,
    inStock: 1,
    productId: "1234",
  },
  {
    id: "3",
    title: " آب 6 مرحله ای  6 مرحله ای چفتن",
    price: 42585665,
    inStock: 0,
    productId: "2345",
  },
  {
    id: "4",
    title:
      " آب 6 مرحله آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای چفتن آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای  ای چفتن",
    price: 34585665,
    inStock: 8,
    productId: "678",
  },
  {
    id: "5",
    title: " آب 6 مرحله آب 6 مرحله ای  دستگاه تصفیه آب 6 مرحله ای چفتن  چفتن",
    price: 5854587,
    inStock: 15,
    productId: "778",
  },
  {
    id: "6",
    title: " آب 6 مرحله چفتن",
    price: 5000000,
    inStock: 14,
    productId: "774",
  },
  {
    id: "7",
    title:
      " ن ref به عنصر بالا (در این مثال، یک <div> خالی) اختصاص داده شب 6 مرحله چفتن",
    price: 5000000,
    inStock: 14,
    productId: "6543",
  },
  {
    id: "8",
    title: "فقط یک بار اجرا شود",
    price: 700000,
    inStock: 124,
    productId: "454",
  },
  {
    id: "9",
    title: " ق اسکرول به بالا، می‌توانید یک",
    price: 85000000,
    inStock: 24,
    productId: "58",
  },
  {
    id: "10",
    title: "ن می‌دهد که عنصر به بالای صفح",
    price: 62000000,
    inStock: 87,
    productId: "568",
  },
  {
    id: "11",
    title: " که عنصر به بالای صفح",
    price: 96000000,
    inStock: 45,
    productId: "965",
  },
];
const PriceInsock = () => {
  return <InsockPage categories={categorydata} products={products} />;
};

export default PriceInsock;
