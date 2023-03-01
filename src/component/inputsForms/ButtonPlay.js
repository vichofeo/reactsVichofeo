
const ButtonPlay = ({label, ...restoProps})=>{

    return(
        <button 
        type="button" 
         className="btn btn-block bg-gradient-primary btn-xs btn-app " 
         {...restoProps}
         > 
         <i className="fas fa-play"></i>
         {label}
         </button>
    )
}
export default ButtonPlay