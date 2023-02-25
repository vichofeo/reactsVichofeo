import ApiInvoker from '../utils/ApiInvoker';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const useSenddata = (ruteReturn)=>{

    const [dataTraffic, setDatatraffic] = useState({})

    let navigate = useNavigate();

    
    const saveData = (data, url) =>{
    
        console.log("lega con datos", dataTraffic)
        ApiInvoker.invokePOST(
            url,
            data,
            (res) => {
              
              navigate("/");
              setDatatraffic(res)
            },
            (err) => {
              //label.innerHTML = err.mensaje;
              navigate("/")
              setDatatraffic({})
            }
          )
    }
  
    const updateData  = (data, url) =>{
        
      //actualiza
      ApiInvoker.invokePUT(
        url,
        data,
        (res) => {
          if (res.ok) {
            navigate("/");
              setDatatraffic(res)
          }
        },
        (err) => {
          console.error('error al actualizar datoosss')
          navigate("/")
              setDatatraffic({})
        }
      )

    }

     
return [dataTraffic,  saveData, updateData] 
}

export default useSenddata