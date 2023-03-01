
const Select = ({ label, datos, ...restoProps }) => {

    return (
        <div className="form-group">
            <label htmlFor={`${restoProps.name}_label`}>{label}</label>
            <select
                id={restoProps.name}
                className="form-control"
                {...restoProps}
            >
                {datos && datos.map((i, index) => (
                    <option
                        value={i.value}
                        key={`${restoProps.name}_${index}`}>
                        {i.label}
                    </option>
                ))}
            </select>
        </div >
    )

}
export default Select