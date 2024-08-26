
const NewSearchFilter = ({ placeholder, id }) => {
    return (
        <input type="text" placeholder={placeholder} className="input input-bordered input-accent w-full max-w-xs" name={id} id={id} />
    )
}

export default NewSearchFilter