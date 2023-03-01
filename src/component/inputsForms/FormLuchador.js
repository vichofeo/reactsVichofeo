

import ButtonSubmit from "./Button"
import Input from "./Input"
import InputFileImg from "./InputFileImg"
import InputFileMusic from "./InputFileMusic"
import { useRef } from "react"
import validate from "../../validate/validate"


const FormLuchador = ({ submit, formulario, handleInput, reset, handleFileImage, handleFile, messageAfterSubmit }) => {

    const labelMensaje = useRef();
    const labelGuardar = useRef();

    const [validateValueInDb] = validate()


    const handleSubmit = (e) => {
        e.preventDefault()
        submit(formulario, labelGuardar.current)
    }

    const fReset = () =>{
        labelMensaje.current.innerHTML=""
        labelGuardar.current.innerHTML=""
        reset()
    }
    //validaciones
    messageAfterSubmit = !messageAfterSubmit ? null : messageAfterSubmit

    return (
        <form id="quickForm" onSubmit={(e) => e.preventDefault()}>

            <Input
                label="Nombre Clave del Luchador"
                labelError={labelMensaje}
                type="text"
                value={formulario.name}
                placeholder="Nombre clave de luchador"
                name="name"
                onChange={handleInput}
                onBlur={validateValueInDb.bind(this, "/validateName", labelMensaje.current)}
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
            <InputFileMusic
                label="Musica del luchador"
                idx="musicInput"
                nameArtist={formulario.name}
                writer={formulario.nombre}
                avatar={formulario.avatar}
                music={formulario.musica}
                fileName={formulario.fileNameActive}
                href="#"
                name="musica"
                accept=".mp3, .mp4"
                onChange={handleFile}

            />
            <ButtonSubmit
            fReset={fReset}
                labelError={labelGuardar}
                onClick={handleSubmit}
            >Enviar</ButtonSubmit>

        </form>


    )
}

export default FormLuchador