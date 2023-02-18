const ButtonSubmit = ({ children, ...restoProps }) => {
    return (
        <button      
        {...restoProps}      
            className="btn btn-primary"            
        >
            {children}
        </button>
    )
}

export default ButtonSubmit