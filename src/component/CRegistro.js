import { useState } from "react"
import Card from "./inputsForms/Card"
import FormLuchador from "./inputsForms/FormLuchador"

//reproductor multimedia
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'


const CRegistro = () => {

  const [luchadores, setLuchadores] = useState([])
  

  const guardarInformacion = (luchador) => {
    setLuchadores([
      ...luchadores,
      luchador])

  }
  
  console.log(luchadores)
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Card tituloCard="Favor Llene los siguientes campos">
              <FormLuchador submit={guardarInformacion} />

            </Card>
          </div>
          <div className="col-md-6">
         tablaDatos

          </div>
        </div>
      </div>
    </section>
  )
}

export default CRegistro