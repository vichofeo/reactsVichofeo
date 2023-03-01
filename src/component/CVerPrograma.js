
import { useEffect, useState } from "react"

import Select from "../component/inputsForms/Select"
import InputPlayMusic from "./inputsForms/InputPlayMusic"
import useGetDataView from "../hooks/useGetDataView"
import ButtonPlay from "./inputsForms/ButtonPlay"

const musicasAux = [
  { name: "Entrada", src: "/muss/entrada.mp3", nombre: "", avatar: "" },
  { name: "Finalizacion", src: "/muss/final.mp3", nombre: "", avatar: "" },
  { name: "Arbitro Tecnico", src: "/muss/arbitroHenry.mp3", nombre: "", avatar: "" },
  { name: "Arbitro Sucio", src: "/muss/arbitroBambino.mp3", nombre: "", avatar: "" },
  { name: "Arbitro Raro", src: "/muss/arbitroAux.mp3", nombre: "", avatar: "" },
]

const CVerPrograma = () => {
  const dataMusicInitial = { name: "", nombre: "", src: "", avatar: "" }
  const [music, setMusic] = useState(dataMusicInitial)

  const [dataInitial, getDataInitial, dataEvent, seteoDataEvent, lucha, getDataLucha, getMusica] = useGetDataView({})

  useEffect(() => {
    getDataInitial()
  }, [])



  return (
    <section >
      <InputPlayMusic
        nameArtist={music.name}
        writer={music.nombre}
        avatar={music.avatar}
        music={music.src}
      />
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >

        <Select
          label="Seleccione un Evento para Editar"
          datos={dataInitial ? dataInitial : null}
          name="evento"
          onChange={(e) => {
            let id = e.target.value
            seteoDataEvent(dataInitial[id])
            setMusic(dataMusicInitial)
          }}

        />

      </div>
      <div className="row">
        {musicasAux.map((obj, index) => (
          <div className="col-12 col-sm-6 col-md-2" key={`obj${index}`}>
            <div className="info-box">
              <span className="info-box-icon bg-info elevation-1">

                <ButtonPlay
                  label="play"
                  onClick={() => { setMusic(obj) }}
                />
              </span>

              <div className="info-box-content">
                <span className="info-box-text">{obj.write}</span>
                <span className="info-box-number">

                  <small>{obj.name}</small>
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12">

          <div className="card">
            <div className="card-header d-flex p-0">
              <h3 className="card-title p-3">{dataEvent.label}</h3>
              <ul className="nav nav-pills ml-auto p-2">
                {dataEvent.data && dataEvent.data.map((obj, index) => (
                  <li className="nav-item" key={`lu${index}`}>
                    <button
                      className={index == 0 ? 'btn btn-block btn-dark nav-link ' : 'btn btn-block btn-dark nav-link '}
                      data-toggle="tab"
                      style={{
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        padding: '10px 20px',
                        //backgroundColor: '#0A283E',
                        borderRadius: '15px',
                        //color: '#fff',

                      }}
                      onClick={() => {
                        getDataLucha(obj)
                        setMusic(dataMusicInitial)
                      }}
                    >L - 0{index + 1}</button></li>
                ))}

              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                {lucha &&
                  <div className="tab-pane active" >
                    <section className="content">


                      <div className="card card-success card-outline  direct-chat-success shadow-sm">
                        <div className="card-header">
                          <h3 className="card-title">Lucha No. #</h3>
                        </div>
                        <div className="card-body pb-0">
                          <div className="row">
                            {lucha[0] &&
                              lucha[0].map((obj, index) => (
                                <div className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch flex-column" key={`lu00_${index}`}>
                                  <div className="card bg-light d-flex flex-fill">
                                    <div className="card-header text-muted border-bottom-0">
                                      {obj.name}
                                    </div>
                                    <div className="card-body pt-0">
                                      <div className="row">
                                        <div className="col-7">
                                          <h2 className="lead"><b>{obj.nombre}</b></h2>
                                          <p className="text-muted text-sm"><b>Estilo </b> rudo / tecnico / ninguno / loco / titan </p>
                                          <ul className="ml-4 mb-0 fa-ul text-muted">
                                            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building"></i></span> caracter</li>
                                            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone"></i></span> curiosidades</li>
                                          </ul>
                                        </div>

                                        <div className="col-5 text-center">
                                          <img src={obj.avatar} alt={obj.name} className="img-circle img-fluid" width="100px" height="100px" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card-footer">
                                      <div className="text-right">
                                        <ButtonPlay
                                          label="play"
                                          onClick={() => { getMusica(obj, setMusic) }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }

                            {lucha[1] && lucha[1].map((obj, index) => (
                              <div className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch flex-column" key={`lu11_${index}`}>

                                <div className="card card-widget widget-user">

                                  <div className="widget-user-header text-white bg-info" style={{
                                    background: `url(${obj.foto}) center center `, backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                  }}>
                                    <h3 className="widget-user-username ">{obj.name}</h3>
                                    <h5 className="widget-user-desc ">{obj.nombre}</h5>
                                  </div>
                                  <div className="widget-user-image">
                                    <img className="img-circle" src={obj.avatar} alt={obj.name} width="100px" height="100px" />
                                  </div>



                                  <div className="card-footer">
                                    <div className="row">
                                      <div className="col-7">
                                        <h2 className="lead"><b>{obj.nombre}</b></h2>
                                        <p className="text-muted text-sm"><b>Estilo </b> rudo / tecnico / ninguno / loco / titan </p>
                                        <ul className="ml-4 mb-0 fa-ul text-muted">
                                          <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building"></i></span> caracter</li>
                                          <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone"></i></span> curiosidades</li>
                                        </ul>
                                      </div>


                                    </div>
                                    <div className="text-right">
                                      <ButtonPlay
                                        label="play"
                                        onClick={() => { getMusica(obj, setMusic) }}
                                      />
                                    </div>
                                  </div>
                                </div>

                              </div>
                            ))
                            }

                          </div>
                        </div>



                      </div>


                    </section>
                  </div>
                }



              </div>

            </div>
            <div className="card-footer">
              Footer
            </div>
          </div>

        </div>

      </div>
      <div></div>
    </section>
  )
}

export default CVerPrograma