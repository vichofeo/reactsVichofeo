import { useEffect } from "react"
import useFormulario from "../../hooks/useFormulario"
import useGetDataProgram from "../../hooks/useGetDataProgram"

import Input from "./Input"
import InputDragDrop from "./InputDragDrop"
import Select from "./Select"
import ButtonSubmit from "./Button"

const FormProgramacion = ({submit}) => {
    const [formulario, handleInput,
        reset, handleFileImage,
        handleFile, dataEdit] = useFormulario({ evento: "", name: "" })
    const [dataInitial,  dataDragDrog, getDataInitial, getDataEvent, onDragEnd, convertDataDragDropToProgram] = useGetDataProgram()

    useEffect(() => {
        getDataInitial(dataEdit)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        let program = convertDataDragDropToProgram()
        submit({_id:formulario.evento, name:formulario.name, luchas:program})
    }
    return (
        <div>
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
            {dataDragDrog && <Input
                label="Editar Nombre del Evento"
                type="text"
                value={formulario.name}
                placeholder="Digite para Editar"
                name="name"
                onChange={handleInput}
            />}
            {dataDragDrog && <InputDragDrop
                onDragEnd={onDragEnd}
                dragDropData={dataDragDrog}
                ButtonSubmit = {ButtonSubmit}
                handleSubmit = {handleSubmit}
            />}

        </div>
    )
}

export default FormProgramacion