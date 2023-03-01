const Input = ({ label, labelError, ...resto }) => {
    return (
        <div className="form-group">
            <label htmlFor={`${resto.name}_label`}>{label}</label>
            <input                
                className="form-control"
                id={resto.name}
                {...resto}
            />
             {labelError && <label
                ref={labelError}
            ></label>}
            
        </div>
    )
}
export default Input


