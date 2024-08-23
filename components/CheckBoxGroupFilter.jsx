

const CheckBoxGroupFilter = ({ filterItem }) => {
    return (
        <div>
            <h3>{filterItem.name}</h3>
            {filterItem.items.map(item => (
                <div key={item.id} className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">{item.name}</span>
                        <input type="checkbox" className="checkbox" name={item.id} id={item.id} />
                    </label>
                </div>
            ))}
        </div>
    )
}

export default CheckBoxGroupFilter