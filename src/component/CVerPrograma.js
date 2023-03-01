
import { useEffect } from "react"
import useFormulario from "../hooks/useFormulario"
import useGetDataProgram from "../hooks/useGetDataProgram"

import Select from "../component/inputsForms/Select"



const CVerPrograma = () => {


  const [formulario, handleInput,
    reset, handleFileImage,
    handleFile, dataEdit] = useFormulario({ evento: "", name: "" })
  const [dataInitial, dataDragDrog, getDataInitial, getDataEvent, onDragEnd, convertDataDragDropToProgram] = useGetDataProgram()

  useEffect(() => {
    getDataInitial(dataEdit)
  }, [])



  return (
    <section >
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        
        <Select
          label="Seleccione un Evento para Editar"
          datos={dataInitial ? dataInitial : null}
          name="evento"
          onChange={(e) => {
            handleInput(e)
            let id = e.target.value
            getDataEvent(id, dataEdit)

          }}

        />

      </div>
      <div></div>
    </section>
  )
}

export default CVerPrograma