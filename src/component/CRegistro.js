
import useFormulario from "../hooks/useFormulario"
import Card from "./inputsForms/Card"
import DataTableLuchador from "./inputsForms/DataTableLuchador"
import FormLuchador from "./inputsForms/FormLuchador"

import useSenddata from "../hooks/useSendData"


const CRegistro = () => {

  const [formulario, handleInput, reset, handleFileImage, handleFile, dataEdit] = useFormulario(
    {
      name: "",
      nombre: "",
      avatar: null,
      foto: null,
      musica: null,
    }
  )

  const [dataTraffic, saveData, updateData] = useSenddata({})

  const guardarInformacion = (luchador) => {
    let request = {
      name: luchador.name,
      nombre: luchador.nombre,
      avatar: luchador.avatar || null,
      foto: luchador.foto || null,
      musica: luchador.musica || null,
    };

    if (luchador._id) {
      request = { ...request, _id: luchador._id }
      updateData(request, "/updateLuchador")
    } else saveData(request, "/addLuchador")
  }


  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Card tituloCard="Favor Llene los siguientes campos">
              <FormLuchador submit={guardarInformacion}
                formulario={formulario}
                handleInput={handleInput}
                reset={reset}
                handleFileImage={handleFileImage}
                handleFile={handleFile}
                dataEdit={dataEdit}
              />

            </Card>
          </div>
          <div className="col-md-6">
            <DataTableLuchador
              url={`/viewLuchadorLimit`}
              title="Lista de Luchadores"
              clickLuchador={dataEdit}
            />

          </div>
        </div>
      </div>
    </section>
  )
}

export default CRegistro