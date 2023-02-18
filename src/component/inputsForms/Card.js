
const Card = ({ children, tituloCard }) => {
    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">
                    IAR <small>{tituloCard}</small>
                </h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}
export default Card