const ButtonSubmit = ({ children, fReset, labelError, ...restoProps }) => {
    return (


        <div className="card-footer">
            {labelError && <div><label
                ref={labelError}
            ></label></div>}
            <button
                {...restoProps}
                className="btn btn-primary"
            >
                {children}
            </button>


           {fReset && <button type="button" onClick={fReset} className="btn btn-primary">Limpiar Formulario</button>} 
        </div>
    )
}

export default ButtonSubmit