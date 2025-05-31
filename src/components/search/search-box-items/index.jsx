import SearchBoxItem from "../search-box-item"

const SearchBoxItems = ({items}) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
        {items?.map(item => (
            <SearchBoxItem item={item} key={item?.id} />
        ))}

    </div>
  )
}

export default SearchBoxItems
