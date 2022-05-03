import { useState, useRef, useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function CAutorizacion() {
  const [autorizacion, setAutorizacion] = useState({
    organizacion: "",
    telefono: "",
    sector: 0,
    sectors: [],
    tipo_sector: [{ vale: -1, label: "elija un valor" }],
    escenario: 0,
    escenarios: [],
    tipo_escenario: [{ vale: -1, label: "elija un valor" }],
    programacion: [],
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
  });

  //const labelMensaje = useRef();
  const labelGuardar = useRef();

  let browserHistory = useNavigate();

  const handleInput = (e) => {
    let campo = e.target.name;
    let valor = e.target.value;
    setAutorizacion({
      ...autorizacion,
      [campo]: valor,
    });
  };

  const handleChange = (e) => {
    let campo = e.target.name;
    let valor = e.target.value;
    setAutorizacion({
      ...autorizacion,
      [campo]: valor,
      [`tipo_${campo}`]: autorizacion[`${campo}s`][valor].tipo,
    });
    console.log("--------------------");
    console.log(campo);
    console.log(valor);
  };

  //cargado inicial
  useEffect(() => {
    ApiUrls.invokeGET(
      "/initial",
      (response) => {
        /* caragar algo pa autocomplete */
        let aux = response.body;
        console.log("==========USEEFECT=========");
        console.log(autorizacion.sector);
        aux = {
          ...aux,
          tipo_sector: aux.sectors[autorizacion.sector]["tipo"],
          tipo_escenario: aux.escenarios[autorizacion.escenario].tipo,
          programacion: [],
        };
        setAutorizacion(aux);
      },
      (error) => {
        window.location = "/autorizacion";
      }
    );
  }, []);

  const guardarDatos = (e) => {
    e.preventDefault();
    const label = labelGuardar.current;

    if (!autorizacion.lok && !autorizacion._id) {
      label.innerHTML = "no puede grabara pq ya existe un registrados";
      return;
    }
    label.innerHTML = "";

    //estructura de datos
    let request = {
      nombre_autorizacion: autorizacion.nombre_autorizacion,
      direccion_autorizacion: autorizacion.direccion_autorizacion,
      valor_hora: autorizacion.valor_hora,
    };

    //guarda
    ApiUrls.invokePOST(
      "/addautorizacion",
      request,
      (res) => {
        window.location = "/autorizacion";
        browserHistory("/autorizacion", { replace: true });
      },
      (err) => {
        label.innerHTML = err.mensaje;
      }
    );
  };

  const addFecha = (e) => {
    e.preventDefault();

    let horaIni = new Date(`1/1/1990 ${autorizacion.hora_inicio}`);
    let horaFin = new Date(`1/1/1990 ${autorizacion.hora_fin}`);
    let horas = Math.round((horaFin - horaIni) / 3600 / 10) / 100;

    //estructura de datos
    let myrequest = autorizacion.programacion;
    myrequest.push({
      fecha: autorizacion.fecha,
      hora_inicio: autorizacion.hora_inicio,
      hora_fin: autorizacion.hora_fin,
      duracion: horas,
    });

    setAutorizacion({ ...autorizacion, programacion: myrequest });
  };

  const delItemProgramacion = (e, i) =>{
    //e.preventDefault();
    let myrequest =  autorizacion.programacion

    console.log(`valor de iii ${i}`)
    console.log(`valor de eee ${e}`)
    myrequest.splice(e,1)
    console.log("***************/////*=========>")
    
    console.log(myrequest)
    setAutorizacion({
      ...autorizacion, 
      programacion:myrequest})
      
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  DDEA GAMEA <small>autorizacion deportivos</small>
                </h3>
              </div>

              <form id="quickForm">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      {"NOMBRE: PERSONA/RESPONSABLE"}
                    </div>
                    <div className="col-md-4 col-sm-6">
                      {"JEFE DE UNIDAD DE INFRAESTRUCTURA"}
                    </div>
                    <div className="col-md-4 col-sm-6"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      {"EMPRESA/ORGANIZACION"}
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="organizacionLabel">
                          Nombre organizacion
                        </label>
                        <input
                          type="text"
                          value={autorizacion.organizacion}
                          placeholder="Nombre organizacion"
                          name="organizacion"
                          className="form-control"
                          id="organizacion"
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="telefonoLabel">
                          Telefono Organizacion
                        </label>
                        <input
                          type="text"
                          value={autorizacion.telefono}
                          placeholder="Telefono organizacion"
                          name="telefono"
                          className="form-control"
                          id="telefono"
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 col-sm-6">SECTOR</div>
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <select
                          value={autorizacion.sector}
                          onChange={handleChange}
                          name="sector"
                          className="form-control"
                        >
                          {autorizacion.sectors.map((i, index) => (
                            <option value={index} key={i.value} >
                              {i.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-6">
                      <div className="form-group">
                        {autorizacion.tipo_sector.map((i) => (
                          <div className="form-check form-check-inline" key={uuid()}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioSector"
                              value={i.value}
                              key={i.value}
                              onClick={handleInput}
                            />
                            <label className="form-check-label">
                              {i.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 col-sm-6">ESCENARIO DEPORTIVO</div>
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <select
                          value={autorizacion.escenario}
                          onChange={handleChange}
                          name="escenario"
                          className="form-control"
                        >
                          {autorizacion.escenarios.map((i, index) => (
                            <option value={index} key={i.value}>
                              {i.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-6">
                      <div className="form-group">
                        {autorizacion.tipo_escenario.map((i) => (
                          <div className="form-check form-check-inline" key={uuid()}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioEscenario"
                              value={i.value}
                              key={i.value}
                              onClick={handleInput}
                            />
                            <label className="form-check-label">
                              {i.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 col-sm-6">Fecha de Reserva</div>
                    <div className="col-md-9 col-sm-6">
                      <div className="form-group">{Date()}</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 col-sm-6">
                      Fechas de Utilizacion
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <label htmlFor="fechaLabel">Fecha Utilizacion</label>
                      <input
                        type="date"
                        value={autorizacion.fecha}
                        placeholder="Fecha Utilizacion"
                        name="fecha"
                        className="form-control"
                        id="fecha"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="col-md-3 col-sm-3">
                      <label htmlFor="hora_iniLabel">hora de inicio</label>
                      <input
                        type="time"
                        value={autorizacion.hora_inicio}
                        placeholder="Hora Inicio"
                        name="hora_inicio"
                        className="form-control"
                        id="hora_inicio"
                        onChange={handleInput}
                        max="23:00:00"
                        min="07:00:00"
                      />
                    </div>
                    <div className="col-md-3 col-sm-3">
                      <label htmlFor="hora_finLabel">
                        hora de Finalizacion
                      </label>
                      <input
                        type="time"
                        value={autorizacion.hora_fin}
                        placeholder="Hora Finalizacion"
                        name="hora_fin"
                        className="form-control"
                        id="hora_fin"
                        onChange={handleInput}
                        max="23:00:00"
                        min="07:00:00"
                      />
                    </div>

                    <div className="col-md-2 col-sm-6">
                      <button                        
                        className="btn btn-primary"
                        onClick={addFecha.bind(this)}
                      >
                        Add
                      </button>
                    </div>
                  </div>


                  <div className="col-md-12 col-sm-6">
                    <div className="form-group">
                    <label htmlFor="descripcionLabel">
                          Descripcion de  la Actividad
                        </label>
                        <textarea                           
                          value={autorizacion.descripcion_actividad}
                          placeholder="Describa la actividad por la cual se alquila el espacio"
                          name="descripcion_actividad"
                          className="form-control"
                          id="descripcion_actividad"
                          onChange={handleInput}
                        />
                    
                    </div>
                  </div>

                  <div className="row">
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Hora inicio</th>
                          <th>Hora Finalizacion</th>
                          <th>Cantidad Horas</th>
                          <th>Fecha de uso</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {autorizacion.programacion.map((i, index) => (
                          <tr >
                            <td>{i.hora_inicio}</td>
                            <td>{i.hora_fin}</td>
                            <td>{i.duracion} - {index}</td>
                            <td>{i.fecha}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={delItemProgramacion.bind(this, index)}
                                
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                  <path
                                  fillRule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                  ></path>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row">
                  
                  
                </div>



                </div>

                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={guardarDatos}
                  >
                    Submit
                  </button>

                  <label
                    ref={labelGuardar}
                    id="submitBtnLabel"
                    htmlFor="submitBtn"
                    className="right badge badge-danger "
                  ></label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
