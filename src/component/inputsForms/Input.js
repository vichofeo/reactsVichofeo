const Input = ({ label, labelError, ...resto }) => {
    return (
        <div className="form-group">
            <label htmlFor="nameLabel">{label}</label>
            <input                
                className="form-control"
                {...resto}
            />
             {labelError && <label
                
                id="memoNamex"
                htmlFor="namex"
            >{labelError}</label>}
            
        </div>
    )
}
export default Input


