import { useState, useRef, useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import ModalLarge from "../ucModalLarge";
import MYPDF from "../DocuPDFGAMEA";
import { PDFViewer } from "@react-pdf/renderer";

import { AutoSuggest } from "react-autosuggestions";

export default function CAutorizacion() {
  const [autorizacion, setAutorizacion] = useState({
    organizaciones: [],
    organizacion: "",
    telefono: "",
    sector: 0,
    sectors: [],
    tipo_rsector: [{ value: -1, label: "elija un valor" }],
    escenario: 0,
    escenarios: [],
    tipo_rescenario: [{ value: -1, label: "elija un valor" }],
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
      "LA SOLICITUD DE DEL ESCENARIO DEPORTIVO, NO INCLUYE LOS SERVICIOS BASICOS",
    thoras: 0,
    ctotal: 0,
    segmentos: [],
    exoneracion: false,
    canje: "",
    descuentos: "",
  });

  const [sanitarios, setSanitarios] = useState({
    Sanitarios: "BUENO",
    Duchas: "..!",
    Puertas: "BUENO",
    Otros: "BUENO",
  });

  const estados = ["BUENO", "REGULAR", "MALO", "DANIOS"];

  const [verPDF, setVerPDF] = useState(false);
  

  const [make, setMake] = useState();
  const [segmentos, setSegmentos] = useState({ index_0: true, datos: [] });

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

    setAutorizacion({
      ...autorizacion,
      [campo]: valor,
      [`label_${campo}`]: aux,
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
    });
    console.log("--------------------");
    console.log(campo);
    console.log(valor);
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

    //const MyDoc = (<MYPDF datos={autorizacion} servicios={sanitarios} />);
    //  updateInstance({ document: MyDoc })
    //setAutorizacion({ ...autorizacion, organizacion: make });
    //estructura de datos
    let request = {
      organizacion: make, //autorizacion.organizacion,
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
    let mysuma = 0;
    let totalizado = segmentos.datos.map((i, index) => {
      let mycanje = 0;
      let mydescuento = 0;
      let mytotal = 0;
      let myexoneracion = false;
      if (index === 0) {
        mycanje = autorizacion.canje ? autorizacion.canje : 0;
        mydescuento = autorizacion.descuentos ? autorizacion.descuentos : 0;
        myexoneracion = autorizacion.exoneracion//autorizacion.exoneracion ? "Con Exoneracion" : "";
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

    setAutorizacion({ ...autorizacion, ctotal: mysuma, segmentos: aux });
  };
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
                        {/* 
                        <label htmlFor="organizacionLabel">
                          Nombre organizacion
                        </label>
                        <Hint options={hintData} allowTabFill>
                          <input
                            type="text"
                            value={autorizacion.organizacion}
                            placeholder="Nombre organizacion"
                            name="organizacion"
                            className="form-control input-with-hint "
                            id="organizacion"
                            onChange={handleInput}
                            autocomplete="off"
                          />
                        </Hint>
                      */}
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
                          <div className="form-check form-check-inline">
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
                          <div className="form-check form-check-inline">
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
                              <tr>
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
                              <tr>
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
                              <th>{columnId}</th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {Object.entries(sanitarios).map(
                            ([columnId, column], index) => (
                              <td>
                                <div className="form-group" key={uuid()}>
                                  {estados.map((i, index) => (
                                    <div className="form-check">
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
                    }}
                  >
                    PreVisualizar
                  </button>
                  <ModalLarge
                    nameModal="modal-xl"
                    tituloModal="PreVisualizacion"
                    swFlag = {verPDF}
                    bsave={guardarDatos}
                    bverpdf={()=>setVerPDF(false)}
                  >
                    <div style={{ minHeight: "100%" }} key={uuid()}>
                      {verPDF ? (
                        <PDFViewer style={{ width: "100%", height: "90vh" }} >
                          <MYPDF datos={autorizacion} servicios={sanitarios} org={make} />
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
