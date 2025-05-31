import FilterRemoteItem from "@/components/elements/filter-remote-item";

const FilterRemoteSection = () => {
  return (
    <div
      dir="rtl"
      className="w-full  px-4 py-8 flex flex-col  md:flex-row gap-2"
    >
      <FilterRemoteItem
        title="فیلترها"
        img="/images/filter-removebg.png"
        altImage="filter"
        linkCategory={`/filter/category`}
        bgColor="bg-[rgb(150,220,124)]"
      />
      <FilterRemoteItem
        title="ریموت کنترل"
        img="/images/remote-control-removebg.png"
        altImage="remote-control"
        linkCategory={`/filter/category`}
        bgColor="bg-[rgb(219,116,219)]"
      />
      <FilterRemoteItem
        title="گازها"
        img="/images/gas-cylinder-removebg.png"
        altImage="gas"
        linkCategory={`/filter/category`}
        bgColor="bg-[rgb(219,171,116)]"
      />
    </div>
  );
};

export default FilterRemoteSection;
