const NewCheckBoxGroupFilter = ({ name, items }) => {
    return (
        <div className="border border-white p-2 rounded-md">
            <h3 className="font-bold text-lg underline underline-offset-4">{name}</h3>
            {items.map(item => (
                <div key={item.id} className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">{item.name}</span>
                        <input type="checkbox" className="checkbox checkbox-accent border-accent" name={item.id} id={item.id} />
                    </label>
                </div>
            ))}
        </div>
    )
}

export default NewCheckBoxGroupFilter