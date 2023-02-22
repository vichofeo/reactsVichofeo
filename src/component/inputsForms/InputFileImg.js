

const InputFile = ({ label, imgIn, idx, icon, ...restoProps }) => {
    return (
        <div className="row">
            <div className="col-md-6">
                <div className="avatar-box">
                
                    <label
                        htmlFor={idx}
                        className="select-avatar"
                    >
                        <i
                            className={`fa fa-${icon} fa-2x`}
                            aria-hidden="true"
                            style={{ color: "Tomato" }}
                        ></i>
                        <p>{label}</p>
                    </label>
                    <input
                        className=""
                        type="file"
                        id={idx}
                        {...restoProps}
                    />
                </div>
            </div>
            <div className="col-md-6">
            <img src={imgIn} width="100%" alt="" />
            e
            </div>
            
        </div>
    )
}

export default InputFile