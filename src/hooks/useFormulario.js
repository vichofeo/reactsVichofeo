import {useState} from 'react'

const useFormulario = (datosIni)=>{

    const [formulario, setFormulario] = useState(datosIni)

    const handleInput = ( e) => {
      
        let name = e.target.name
        let valor = e.target.value
        setFormulario({
          ...formulario,
          [name]: valor,
        });
      };

      const reset = ()=>{
        setFormulario(datosIni)
      }

      const handleFileImage = (e)=>{        
        e.preventDefault()
        
        let name = e.target.name
        let reader = new FileReader()
        let file = e.target.files[0]

        
        if (file.size > 1240000) {
          alert("la imagen supera el maximo de 1 MB");
          return;
        }
        reader.onloadend = () =>{
          setFormulario({...formulario, [name]: reader.result})
        }

        
        reader.readAsDataURL(file)

      }

      const handleFile = (e)=>{        
        e.preventDefault()
        
        let name = e.target.name
        let reader = new FileReader()
        let file = e.target.files[0]

        reader.onloadend = () =>{
          setFormulario({...formulario, [name]: reader.result})
        }

        reader.readAsDataURL(file)

      }

return [formulario, handleInput, reset, handleFileImage, handleFile]
}

export default useFormulario