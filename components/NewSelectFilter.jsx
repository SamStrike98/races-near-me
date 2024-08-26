const NewSelectFilter = ({ id, name, options }) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text text-lg font-bold underline underline-offset-4">{name}</span>
            </div>
            <select className="select select-bordered select-accent" id={id} name={id}>
                {options.map(option => (
                    <option key={option.id} value={option.value}>{option.name}</option>
                ))}
            </select>
            <div className="label">
            </div>
        </label>
    )
}

export default NewSelectFilter