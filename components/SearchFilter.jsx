
const SearchFilter = ({ filterItem }) => {
    return (
        <input type="text" placeholder={filterItem.placeholder} className="input input-bordered w-full max-w-xs" name={filterItem.id} id={filterItem.id} />
    )
}

export default SearchFilter