import SearchMainBoxHeader from "@/components/elements/search-mainBox-header";
import SearchBoxItems from "../search-box-items";


const SearchMainBox = () => {
  return (
    <div className="w-full pb-8   lg:rounded-lg lg:border">

     <SearchMainBoxHeader />
     <SearchBoxItems />
    </div>
  );
};

export default SearchMainBox;
