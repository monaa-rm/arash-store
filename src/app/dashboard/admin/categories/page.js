import CategoriesPage from "@/components/dashboard/admin/categories-page";
// const getData = async () => {
//   const data = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/allCategories`,
//     {
//       cache: "no-store",
//     }
//   ).then((res) => res.json());
//   return data;
// };
const Categories = async () => {
//   const data = await getData();
// console.log(data)
  return <CategoriesPage  />;
};

export default Categories;
