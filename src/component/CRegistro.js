import { useState } from "react"
import Card from "./inputsForms/Card"
import FormLuchador from "./inputsForms/FormLuchador"


const CRegistro = () => {

  const [luchadores, setLuchadores] = useState([])

  const guardarInformacion = (luchador) => {
    setLuchadores([
      ...luchadores,
      luchador])

  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Card tituloCard="Favor Llene los siguientes campos">
              <FormLuchador submit={guardarInformacion}/>
              
            </Card>
          </div>
          <div className="col-md-6">
          </div>
        </div>
      </div>
    </section>
  )
}

export default CRegistro