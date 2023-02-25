import ApiInvoker from '../utils/ApiInvoker';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const useGetdata = (url)=>{

    const [respuesta, setRespuesta] = useState({})

    let navigate = useNavigate();

    const getRespuesta = () =>{
        ApiInvoker.invokeGETwBody(
            url, {},
            (response) => {          
              setRespuesta(response.body)
            },
            (error) => {
              //window.location = "/";
              navigate("/");
              setRespuesta({})
            }
          )
     } 
      
     const getRespuestawBody = (data) =>{        
        ApiInvoker.invokeGETwBody(url,data,
            (res) =>{
                
                setRespuesta(res.body)
                
            },
            (e)=>{
                
                navigate("/");
              setRespuesta({})
            }
            )
     }
 

     
return [respuesta, getRespuesta, getRespuestawBody]
}

export default useGetdata