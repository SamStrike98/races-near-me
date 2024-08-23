

const SelectFilter = ({ filterItem }) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{filterItem.name}</span>
            </div>
            <select className="select select-bordered" id={filterItem.id} name={filterItem.id}>
                {filterItem.options.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
            <div className="label">
            </div>
        </label>
    )
}

export default SelectFilter