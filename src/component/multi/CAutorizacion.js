import { useState, useRef, useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import ModalLarge from "../ucModalLarge";
import MYPDF from "../DocuPDFGAMEA";
import DOCURESERVA from "../ReservaPDFGAMEA";
import { PDFViewer } from "@react-pdf/renderer";

import { AutoSuggest } from "react-autosuggestions";

export default function CAutorizacion() {
  const [autorizacion, setAutorizacion] = useState({
    organizaciones: [],
    codigo: "!--#",
    organizacion: "",
    persona: null,
    cite: "/DD/UI/AU/",
    buscarcr: "",
    telefono: "",
    sector: 0,
    sectors: [],
    nsector: "-Sin Dato-",
    tipo_rsector: [{ value: -1, label: "elija un valor" }],
    ntrsector: "-Sin Dato-",
    escenario: 0,
    nescenario: "-Sin Dato-",
    escenarios: [],
    tipo_rescenario: [{ value: -1, label: "elija un valor" }],
    ntrescenario: "-Sin Dato-",
    programacion: [],
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    rescenario: 0,
    rsector: 0,
    label_rescenario: [{ value: -1, label: "debe de elegir un escenario" }],
    label_rsector: [{ value: -1, label: "debe de elegir un sector" }],
    descripcion_actividad: "",
    observaciones:
      "LA SOLICITUD DEL ESCENARIO DEPORTIVO, NO INCLUYE LOS SERVICIOS BASICOS",
    thoras: 0,
    ctotal: 0,
    segmentos: [],
    exoneracion: false,
    canje: "",
    descuentos: "",

    estado: false,
  });

  const [sanitarios, setSanitarios] = useState({
    Sanitarios: "BUENO",
    Duchas: "..!",
    Puertas: "BUENO",
    Otros: "BUENO",
  });

  const estados = ["BUENO", "REGULAR", "MALO", "DANIOS"];

  const [verPDF, setVerPDF] = useState(false);
  const [verReserva, setVerReserva] = useState(false);

  const [make, setMake] = useState("");
  const [segmentos, setSegmentos] = useState({ index_0: true, datos: [] });

  const [datosSearch, setDatosSearch] = useState();

  let suma = 0;

  //const labelMensaje = useRef();
  const labelGuardar = useRef();
  const labelPfecha = useRef();
  const labelPfini = useRef();
  const labelPffin = useRef();
  const labelPAdd = useRef();

  let browserHistory = useNavigate();

  //estate para solo cheked de segmentos
  const handleInputSegmentos = (e) => {
    let campo = e.target.name;
    let valor =
      e.target.type === "checkbox" ? e.target.checked : e.target.value; //e.target.value;

    setSegmentos({ ...segmentos, [campo]: valor });
  };

  const handleInput = (e) => {
    let campo = e.target.name;
    let valor =
      e.target.type === "checkbox" ? e.target.checked : e.target.value; //e.target.value;
    setAutorizacion({
      ...autorizacion,
      [campo]: valor,
    });
  };

  const handleInputRadio = (e) => {
    let campo = e.target.name;
    let valor = e.target.value;

    let aux = autorizacion[`tipo_${campo}`].find(
      (item) => item.value === valor
    );
    console.log(`radio: ${campo}, label:${aux.label}`);

    setAutorizacion({
      ...autorizacion,
      [campo]: valor,
      [`label_${campo}`]: aux,
      [`nt${campo}`]: aux.label,
    });
  };

  const handleSanitarios = (e) => {
    let campo = e.target.name;
    let valor = e.target.value;

    setSanitarios({
      ...sanitarios,
      [campo]: valor,
    });
  };

  const handleChange = (e) => {
    let campo = e.target.name;
    let valor = e.target.value;
    setAutorizacion({
      ...autorizacion,
      [campo]: valor,
      [`tipo_r${campo}`]: autorizacion[`${campo}s`][valor].tipo,
      [`n${campo}`]: autorizacion[`${campo}s`][valor].label,
    });
    console.log("--------------------");
    console.log(
      `${campo}:value ${valor} , label: ${
        autorizacion[`${campo}s`][valor].label
      }`
    ); //autorizacion.sectors[autorizacion.sector].label

    if (campo === "escenario") {
      setSegmentos({
        ...segmentos,
        datos: autorizacion.escenarios[valor].adicionales,
      });
    }
  };

  //cargado inicial
  useEffect(() => {
    ApiUrls.invokeGET(
      "/initial",
      (response) => {
        /* caragar algo pa autocomplete */
        let aux = response.body;
        console.log("==========USEEFECT=========");
        //console.log(autorizacion.escenario);
        let aux1 = autorizacion.sector;
        let aux2 = autorizacion.escenario;

        aux = {
          ...autorizacion,
          ...aux,
          tipo_rsector: aux.sectors[aux1]["tipo"],
          tipo_rescenario: aux.escenarios[aux2].tipo,
          programacion: [],
          nsector: aux.sectors[aux1].label,
          nescenario: aux.escenarios[aux2].label,
        };
        setAutorizacion(aux);

        //seteea segmentos
        let aux3 = {};
        for (var i = 0; i < 30; i++) aux3 = { ...aux3, [`index_${i}`]: true };

        setSegmentos({ ...aux3, datos: aux.escenarios[aux2].adicionales });
      },
      (error) => {
        window.location = "/autorizacion";
      }
    );
  }, []);

  const guardarDatos = (e) => {
    e.preventDefault();
    //totalizaSegmentos();

    const label = labelGuardar.current;

    label.innerHTML = "";
    if (datosSearch) {
      //actualizacion
      
      let request = {
        codigo: datosSearch.codigo,
      };
      ApiUrls.invokePUT(
        "/refreshFile",
        request,
        (response) => {
          if (response.ok) {
            window.location = "/autorizacion";
            browserHistory("/autorizacion", { replace: true });
            setVerPDF(true);
          }
        },
        (err) => {
          console.error("error al actualizar perfil");
        }
      );
    } else {
      //insercion
      //estructura de datos
      let request = {
        codigo: autorizacion.codigo,
        organizacion: make, //autorizacion.organizacion,
        persona: autorizacion.persona,
        cite: autorizacion.cite,
        telefono: autorizacion.telefono,
        sector: autorizacion.sectors[autorizacion.sector].label,
        tsector: autorizacion.label_rsector.label,
        escenario_id: autorizacion.escenarios[autorizacion.escenario].value,
        escenario: autorizacion.escenarios[autorizacion.escenario].label,
        tescenario: autorizacion.label_rescenario.label,
        programacion: autorizacion.programacion,
        descripcion_actividad: autorizacion.descripcion_actividad,
        observaciones: autorizacion.observaciones,
        servicios: sanitarios,
        costo_total: autorizacion.ctotal,
        fstart:
          autorizacion.programacion.length > 0
            ? autorizacion.programacion[0].fecha
            : null,
        fend:
          autorizacion.programacion.length > 0
            ? autorizacion.programacion[autorizacion.programacion.length - 1]
                .fecha
            : null,
        segmentos: autorizacion.segmentos.map((i) => ({
          adicional_id: i.value ? i.value : null,
          segmento: i.label,
          valor_hora: i.valor_hora,
          total_horas: i.thoras,
          canje: i.canje,
          exoneracion: i.exoneracion,
          descuentos: i.descuentos,
          total: i.total,
        })),
        estado: verReserva ? "Reservado" : "Pagado",
      };

      //guarda
      ApiUrls.invokePOST(
        "/addAutorizacion",
        request,
        (res) => {
          window.location = "/autorizacion";
          browserHistory("/autorizacion", { replace: true });
          setVerPDF(true);
        },
        (err) => {
          label.innerHTML = err.error;
        }
      );
    }
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
    let thoras = myrequest
      .map((item) => item.duracion)
      .reduce((prev, curr) => prev + curr, 0);
    //ordena array
    myrequest = ordenaProgramacion(myrequest);
    setAutorizacion({
      ...autorizacion,
      programacion: myrequest,
      thoras: thoras,
    });
    //suma todas las horas
  };

  const delItemProgramacion = (e, i) => {
    //e.preventDefault();
    let myrequest = autorizacion.programacion;

    //console.log(`valor de iii ${i}`);
    //console.log(`valor de eee ${e}`);
    myrequest.splice(e, 1);
    //console.log("***************/////*=========>");

    //console.log(myrequest);
    let thoras = myrequest
      .map((item) => item.duracion)
      .reduce((prev, curr) => prev + curr, 0);
    setAutorizacion({
      ...autorizacion,
      programacion: myrequest,
      thoras: thoras,
    });
  };

  const validaFechas = (e) => {
    e.preventDefault();
    const label = [labelPAdd.current];
    let name = e.target.name;
    let value = e.target.value;

    let escenario = autorizacion.escenarios[autorizacion.escenario].value;

    let request = {
      escenario: escenario,
      dato: value,
    };

    let link = "/byFecha";
    link = "/byFechaHora";
    link = "/byFechaRango";
    let i = 0;
    let clase = "badge badge-success";
    switch (name) {
      case "fecha":
        i = 1;
        link = "/byFecha";
        label[i] = labelPfecha.current;
        clase = "badge badge-pill badge-warning";
        break;
      case "hora_inicio":
        i = 2;
        link = "/byFechaHora";
        request = { ...request, dato: `${autorizacion.fecha} ${value}` };
        label[i] = labelPfini.current;
        clase = "badge badge-pill badge-danger";
        break;
      case "hora_fin":
        i = 3;
        link = "/byFechaHora";
        request = { ...request, dato: `${autorizacion.fecha} ${value}` };
        label[i] = labelPffin.current;
        clase = "badge badge-pill badge-danger";
        break;
      default:
        i = 0;

        link = "/byFechaRango";
        request = {
          ...request,
          dato1: `${autorizacion.fecha} ${autorizacion.hora_inicio}`,
          dato2: `${autorizacion.fecha} ${autorizacion.hora_fin}`,
        };

        clase = "badge badge-pill badge-danger";
        break;
    }
    //guarda
    ApiUrls.invokePOST(
      link,
      request,
      (res) => {
        console.log(res);
        label[i].innerHTML = res.mensaje.replace(":", "<br/>");

        label[i].className = res.lok ? "badge badge-success" : clase;
        if (i === 0 && res.lok) {
          addFecha(e);
          label.map((i) => (i.innerHTML = ""));
        }
      },
      (err) => {
        label[i].innerHTML = err.error;
        //setSector({ ...sector, lok: false });

        //label.innerHTML = error.message;
        label.className = "right badge badge-danger";
      }
    );
  };
  const ordenaProgramacion = (a) => {
    return a.sort((x, y) => x.fecha.localeCompare(y.fecha));
  };

  const totalizaSegmentos = () => {
    setDatosSearch(false);
    let mysuma = 0;
    let totalizado = segmentos.datos.map((i, index) => {
      let mycanje = 0;
      let mydescuento = 0;
      let mytotal = 0;
      let myexoneracion = false;
      if (index === 0) {
        mycanje = autorizacion.canje ? autorizacion.canje : 0;
        mydescuento = autorizacion.descuentos ? autorizacion.descuentos : 0;
        myexoneracion = autorizacion.exoneracion; //autorizacion.exoneracion ? "Con Exoneracion" : "";
      }

      if (!autorizacion.exoneracion)
        mytotal = i.valor_hora * autorizacion.thoras - mycanje - mydescuento;

      if (!segmentos[`index_${index}`]) {
        mytotal = 0;
        mysuma += mytotal;
        return null;
      } else {
        mysuma += mytotal;
        return {
          ...i,
          thoras: autorizacion.thoras,
          canje: mycanje,
          exoneracion: myexoneracion,
          descuentos: mydescuento,
          total: mytotal,
        };
      }
    });

    let aux = [];
    for (const i in totalizado) {
      if (totalizado[i]) aux[i] = totalizado[i];
    }

    //setAutorizacion({ ...autorizacion, ctotal: mysuma, segmentos: aux, codigo:codigoGen });
    ApiUrls.invokeGET(
      "/getGen",
      (response) => {
        //setCodigoGen( response.body.cod);
        setAutorizacion({
          ...autorizacion,
          ctotal: mysuma,
          segmentos: aux,
          codigo: response.body.cod,
        });
      },
      (error) => {
        let memo = "error en la obtencion de codigo. Vuelva a intentarlo";
      }
    );
  };

  const searchCr = (e) => {
    e.preventDefault();
    let varSearch = autorizacion.buscarcr;
    ApiUrls.invokeGET(
      "/getSearch/" + varSearch,
      (res) => {
        console.log(autorizacion);
        let tmp = res.body;
        res.ok
          ? setDatosSearch({
              ...tmp,
              nsector: tmp.sector,
              ntrsector: tmp.tsector,
              nescenario: tmp.escenario,
              ntrescenario: tmp.tescenario,
              ctotal: tmp.costo_total,
              segmentos: tmp.segmentos.map((i) => ({
                adicional_id: i.adicional_id,
                label: i.segmento,
                valor_hora: i.valor_hora,
                thoras: i.total_horas,
                canje: i.canje,
                exoneracion: i.exoneracion,
                descuentos: i.descuentos,
                total: i.total,
              })),
              programacion: tmp.programacion.map((i) => ({
                fecha: i.fecha.substring(0, 10),
                hora_inicio: i.hora_inicio.substring(11, 16),
                hora_fin: i.hora_fin.substring(11, 16),
                duracion: i.duracion,
              })),
            })
          : setDatosSearch();

        //totalizaSegmentos();
        setVerPDF(!verPDF);
        setVerReserva(false);
      },
      (error) => {
        //setLuchador({ ...luchador, lok: false });
        //label.innerHTML = error.mensaje;
        //label.className = "right badge badge-danger";
      }
    );    
  };

  const suprCr = (e) => {
    e.preventDefault();
    
    ApiUrls.invokeDEL(
      "/deathRes/" + datosSearch.codigo,
      (res) => {        
        let tmp = res.body;
        window.location = "/autorizacion";
            browserHistory("/autorizacion", { replace: true });
            setVerPDF(true);
      },
      (error) => {
        //setLuchador({ ...luchador, lok: false });
        //label.innerHTML = error.mensaje;
        //label.className = "right badge badge-danger";
      }
    );    
  }
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  DDEA GAMEA <small>UNIDAD DE INFRAESTRUCTURA </small>
                </h3>
                <div className="card-tools">
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control form-control-sm"
                      type="search"
                      placeholder="Buscar por CR"
                      aria-label="Search"
                      onChange={handleInput}
                      name="buscarcr"
                      id="buscarcr"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-info btn-flat"
                        data-toggle="modal"
                        data-target="#modal-xl"
                        onClick={searchCr}
                      >
                        <i className="fas fa-fw fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <form id="quickForm">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-10 col-sm-6">
                      <div className="form-group">
                        <AutoSuggest
                          name="organizacion"
                          options={autorizacion.organizaciones}
                          handleChange={setMake}
                          value={make}
                          styles={{
                            suggestionsContainer: {
                              background: "#7745aa",
                              width: "auto",
                            },
                            searchField: {
                              width: "auto",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="telefonoLabel">
                          Nombre persona que reserva
                        </label>
                        <input
                          type="text"
                          value={autorizacion.persona}
                          placeholder="Nombre del que reserva"
                          name="persona"
                          className="form-control"
                          id="persona"
                          onChange={handleInput}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="telefonoLabel">Telefono Contacto</label>
                        <input
                          type="text"
                          value={autorizacion.telefono}
                          placeholder="Telefono contacto"
                          name="telefono"
                          className="form-control"
                          id="telefono"
                          onChange={handleInput}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="telefonoLabel">
                          No de cite para Reserva
                        </label>
                        <input
                          type="text"
                          value={autorizacion.cite}
                          placeholder="Cite"
                          name="cite"
                          className="form-control"
                          id="cite"
                          onChange={handleInput}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 col-sm-6">SECTOR </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <select
                          value={autorizacion.sector}
                          onChange={handleChange}
                          name="sector"
                          className="form-control"
                        >
                          {autorizacion.sectors.map((i, index) => (
                            <option value={index} key={i.value}>
                              {i.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-6">
                      <div className="form-group" key={uuid()}>
                        {autorizacion.tipo_rsector.map((i, index) => (
                          <div
                            className="form-check form-check-inline"
                            key={uuid()}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              value={i.value}
                              name="rsector"
                              id="rsector"
                              onChange={handleInputRadio}
                              checked={autorizacion.rsector === i.value}
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
                      <div className="form-group" key={uuid()}>
                        {autorizacion.tipo_rescenario.map((i, index) => (
                          <div
                            className="form-check form-check-inline"
                            key={uuid()}
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              value={i.value}
                              name="rescenario"
                              id="rescenario"
                              onChange={handleInputRadio}
                              checked={autorizacion.rescenario === i.value}
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
                    <div className="col-md-12 col-sm-6">
                      <h5>Elija las Fechas</h5>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="fechaLabel">Fecha Utilizacion</label>
                        <input
                          type="date"
                          value={autorizacion.fecha}
                          placeholder="Fecha Utilizacion"
                          name="fecha"
                          className="form-control"
                          id="fecha"
                          onChange={handleInput}
                          onBlur={validaFechas}
                        />
                        <label
                          ref={labelPfecha}
                          id="memoFecha"
                          htmlFor="nFecha"
                        ></label>
                      </div>
                      <div className="form-group">
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
                          onBlur={validaFechas}
                        />
                        <label
                          ref={labelPfini}
                          id="memoFini"
                          htmlFor="nFini"
                        ></label>
                      </div>
                      <div className="form-group">
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
                          onBlur={validaFechas}
                        />
                        <button
                          className="btn btn-primary"
                          onClick={validaFechas.bind(this)}
                        >
                          Add
                        </button>
                        <label
                          ref={labelPffin}
                          id="memoFfin"
                          htmlFor="nFfin"
                        ></label>

                        <label
                          ref={labelPAdd}
                          id="memoFAdd"
                          htmlFor="nFAdd"
                        ></label>
                      </div>
                    </div>

                    <div className="col-md-8 col-sm-6">
                      <div>Fecha de Reserva: {Date()}</div>
                      <div key={uuid()}>
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>H. Ini</th>
                              <th>H. Fin</th>
                              <th>H. Total</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {autorizacion.programacion.map((i, index) => (
                              <tr key={uuid()}>
                                <td>{i.fecha}</td>
                                <td>{i.hora_inicio}</td>
                                <td>{i.hora_fin}</td>
                                <td>{i.duracion}</td>

                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={delItemProgramacion.bind(
                                      this,
                                      index
                                    )}
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
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="descripcionLabel">
                        Descripcion de la Actividad
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
                    <div className="col-md-12 col-sm-6">
                      <h5>TARIFAS O RETRIBUCIONES</h5>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="canjeLabel">Canje</label>
                        <input
                          type="Number"
                          value={autorizacion.canje}
                          placeholder="0.00 Bs"
                          name="canje"
                          className="form-control"
                          id="canje"
                          onChange={handleInput}
                          autoComplete="false"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exoneracionLabel">Exoneracion</label>
                        <input
                          type="checkbox"
                          checked={autorizacion.exoneracion}
                          name="exoneracion"
                          className="form-control"
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="descuentoLabel">Descuentos Bs.</label>
                        <input
                          type="Number"
                          value={autorizacion.descuentos}
                          placeholder="0.00 Bs."
                          name="descuentos"
                          className="form-control"
                          id="descuentos"
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="col-md-9 col-sm-6">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Segmento</th>
                            <th>V/hora</th>
                            <th>T/horas</th>
                            <th>Canje</th>
                            <th>Exoneracion</th>
                            <th>Descuentos</th>
                            <th>Total Bs.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {segmentos.datos.map((i, index) => {
                            let mycanje = 0;
                            let mydescuento = 0;
                            let total = 0;
                            if (index === 0) {
                              suma = 0;
                              mycanje = autorizacion.canje
                                ? autorizacion.canje
                                : 0;
                              mydescuento = autorizacion.descuentos
                                ? autorizacion.descuentos
                                : 0;
                            }

                            if (!autorizacion.exoneracion)
                              total =
                                i.valor_hora * autorizacion.thoras -
                                mycanje -
                                mydescuento;

                            //controla el checkbox
                            if (!segmentos[`index_${index}`]) total = 0;

                            suma += total;
                            return (
                              <tr key={uuid()}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={segmentos[`index_${index}`]}
                                    name={`index_${index}`}
                                    onChange={handleInputSegmentos}
                                  />
                                </td>
                                <td>{i.label}</td>
                                <td>{i.valor_hora}</td>
                                <td>{autorizacion.thoras}</td>
                                <td>{mycanje ? mycanje : null}</td>
                                <td>
                                  {!index && autorizacion.exoneracion
                                    ? "Con exoneracion"
                                    : null}
                                </td>
                                <td>{mydescuento ? mydescuento : null}</td>
                                <td>{total}</td>
                              </tr>
                            );
                          })}

                          <tr>
                            <td colSpan={7}>Total</td>
                            <td>{suma}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row">
                    <label htmlFor="SANITARIOSLabel">
                      Estado de los Servicios
                    </label>
                    <div className="col-md-12 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="observacionLabel">OBSERVACIONES</label>
                        <textarea
                          value={autorizacion.observaciones}
                          placeholder="OBSERVACIONES"
                          name="observaciones"
                          className="form-control"
                          id="observaciones"
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          {Object.entries(sanitarios).map(
                            ([columnId, column], index) => (
                              <th key={uuid()}>{columnId}</th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {Object.entries(sanitarios).map(
                            ([columnId, column], index) => (
                              <td key={uuid()}>
                                <div className="form-group">
                                  {estados.map((i, index) => (
                                    <div className="form-check" key={uuid()}>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        value={i}
                                        name={columnId}
                                        id={columnId}
                                        onChange={handleSanitarios}
                                        checked={sanitarios[columnId] === i}
                                      />
                                      <label className="form-check-label">
                                        {i}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/** *****BOTONES Y MODAL**** */}
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-toggle="modal"
                    data-target="#modal-xl"
                    onClick={() => {
                      totalizaSegmentos();
                      setVerPDF(!verPDF);
                      setVerReserva(false);
                      //setDatosSearch(false)
                    }}
                  >
                    PreVisualizar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#modal-xl"
                    onClick={() => {
                      totalizaSegmentos();
                      setVerPDF(!verPDF);
                      setVerReserva(true);
                      //setDatosSearch(false)
                    }}
                  >
                    Reservar
                  </button>
                  <ModalLarge
                    nameModal="modal-xl"
                    tituloModal="PreVisualizacion"
                    swFlag={verPDF}
                    bsave={guardarDatos}
                    bverpdf={() => setVerPDF(false)}
                    estado={datosSearch ? datosSearch.estado: null}
                    bdel={suprCr}
                  >
                    <div style={{ minHeight: "100%" }} key={uuid()}>
                      {verPDF ? (
                        <PDFViewer style={{ width: "100%", height: "90vh" }}>
                          {verReserva ? (
                            <DOCURESERVA
                              datos={autorizacion}
                              servicios={sanitarios}
                              org={make}
                            />
                          ) : (
                            <MYPDF
                              datos={datosSearch ? datosSearch : autorizacion}
                              servicios={
                                datosSearch ? datosSearch.servicios : sanitarios
                              }
                              org={
                                datosSearch ? datosSearch.organizacion : make
                              }
                            />
                          )}
                        </PDFViewer>
                      ) : null}
                    </div>
                  </ModalLarge>

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
