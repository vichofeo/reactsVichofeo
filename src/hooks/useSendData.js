import ApiInvoker from '../utils/ApiInvoker';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useSenddata = (ruteReturn) => {

  const [dataTraffic, setDatatraffic] = useState({})

  let navigate = useNavigate();


  const saveData = (data, url, labelError, reset) => {

    //console.log("lega con datos", dataTraffic)
    ApiInvoker.invokePOST(
      url,
      data,
      (res) => {        
        setDatatraffic(res)
        labelError.innerHTML = res.mensaje
        labelError.className ="right badge badge-success" 
        reset()
        navigate(ruteReturn);
         
      },
      (err) => {
        setDatatraffic(err)
        labelError.innerHTML = err.mensaje
        labelError.className ="right badge badge-danger"
      }
    )
  }

  const updateData = (data, url) => {

    //actualiza
    ApiInvoker.invokePUT(
      url,
      data,
      (res) => {
        if (res.ok) {
          setDatatraffic(res)
          navigate(ruteReturn);
        }
      },
      (err) => {
        setDatatraffic(err)
        navigate("/");
      }
    )

  }

  

  return [dataTraffic, saveData, updateData]
}

export default useSenddata