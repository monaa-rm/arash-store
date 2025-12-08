import FilterRemoteItem from "@/components/elements/filter-remote-item";
import filterImage from "../../../assets/images/filter-removebg.webp";
import gasImage from "../../../assets/images/gass-removebg.webp";
import remoteControlImage from "../../../assets/images/remote-control-removebg.webp";
const FilterRemoteSection = async () => {
  return (
    <div
      dir="rtl"
      className="w-full  px-4 py-8 flex flex-col  md:flex-row gap-2"
    >
      <FilterRemoteItem
        title="فیلترها"
        img={filterImage}
        altImage="filter-image"
        linkCategory="filter"
        bgColor="bg-[rgb(150,220,124)]"
      />
      <FilterRemoteItem
        title="گازها"
        img={gasImage}
        altImage="gas-image"
        linkCategory="gaz-ferioni"
        bgColor="bg-[rgb(219,116,219)]"
      />
      <FilterRemoteItem
        title="ریموت کنترل"
        img={remoteControlImage}
        altImage="remote-control-image"
        linkCategory="remote-control"
        bgColor="bg-[rgb(219,171,116)]"
      />
    </div>
  );
};

export default FilterRemoteSection;
