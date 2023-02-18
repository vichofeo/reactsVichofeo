import { useState } from "react"
import useFormulario from "../../hooks/useFormulario"
import ButtonSubmit from "./Button"
import Input from "./Input"
import InputFileImg from "./InputFileImg"


const FormLuchador = ({ submit }) => {

    const [formulario, handleInput, reset, handleFileImage] = useFormulario({
        name: "",
        nombre: "",
        avatar: null,
        foto: null,
        musica: null,
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        submit(formulario)
        reset()
    }


    return (
        <form id="quickForm">

            <Input
                label="Nombre Clave del Luchador"
                labelError="para eerrior"
                type="text"
                value={formulario.name}
                placeholder="Nombre clave de luchador"
                name="name"
                onChange={handleInput}
            />
            <Input
                label="Nombre Completo del Luchador"

                type="text"
                value={formulario.nombre}
                placeholder="Nombre completo de luchador"
                name="nombre"
                onChange={handleInput}
            />
            <InputFileImg
                label="Avatar Luchador"
                imgIn={formulario.avatar}
                href="#"
                idx="avatarInput"
                name="avatar"


                accept=".gif,.jpg,.jpeg,.png"
                onChange={handleFileImage}
            />
            <InputFileImg
                label="Foto Luchador"
                imgIn={formulario.foto}
                href="#"
                idx="fotoInput"
                name="foto"

                accept=".gif,.jpg,.jpeg,.png"
                onChange={handleFileImage}
            />
            <ButtonSubmit onClick={handleSubmit}>Enviar</ButtonSubmit>
        </form>
    )
}

export default FormLuchador