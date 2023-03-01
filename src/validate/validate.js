import ApiInvoker from "../utils/ApiInvoker";
const validate = () => {

  const validateValueInDb = ( url,  labelMessage, e) => {
    //const label = labelMensaje.current;
    
    let valueValidate = e.target.value

    
    //labelMessage.innerHTML=valueValidate
    if (valueValidate && labelMessage) {
      ApiInvoker.invokeGET(
        url + "/" + valueValidate,
        (res) => {
          //labelMessage.innerHTML = res.mensaje;
          //labelMessage.className = "right badge badge-success";
          validateMessageAfterSubmit(labelMessage, res.mensaje, true )
        },
        (error) => {
          
          validateMessageAfterSubmit(labelMessage, error.mensaje, false )
        }
      )
    } else if(labelMessage) labelMessage.innerHTML=""
    
  }

  const validateMessageAfterSubmit = (labelMessage,mensaje, ok=true)=>{
    validateOnlyMessage(labelMessage,mensaje)
    ok? labelMessage.className ="right badge badge-success" : labelMessage.className ="right badge badge-danger"
  }

  const validateOnlyMessage=(labelMessage, mensaje) => labelMessage.innerHTML = mensaje

  return [validateValueInDb]
}

export default validate