import { useState,  useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";

import { v4 as uuid } from "uuid";



export default function CAutorizacionVer() {
  const [autorizacion, setAutorizacion] = useState({
    radios: [
      ["pfecha", "Por Fecha"],
      ["pesc", "Por Escenario"],
    ],
    radio: "-1",
    op01: [],
    op02: [],
    op01Value: "-1",
    op02Value: "-1",
  });

  const [datos, setDatos] = useState({});
  const [datoMaestro, setDatoMaestro] = useState({});
  const [escenarios, setEscenarios] = useState({});
  const [fechas, setFechas] = useState({});

  


  const handleInputRadio = (e) => {
    let valor = e.target.value;

    let aux1 = Object.entries(escenarios).map(([columnId, column], index) => {
      return { value: columnId, label: columnId };
    });
    let aux2 = Object.entries(fechas).map(([columnId, column], index) => {
      return { value: columnId, label: columnId };
    });

    if (valor === "pfecha") {
      aux1 = Object.entries(fechas).map(([columnId, column], index) => {
        return { value: columnId, label: columnId };
      });
      aux2 = Object.entries(escenarios).map(([columnId, column], index) => {
        return { value: columnId, label: columnId };
      });
    }
    setAutorizacion({
      ...autorizacion,
      radio: valor,
      op01: aux1,
      op02: aux2,
    });
  };

  const handleChange = (e) => {
    let campo = e.target.name;
    let valor = e.target.value;
    //filtra vectores de combobox

    let aux = [];
    let datosAux = {};

    if (campo === "op01") {
      if (autorizacion.radio === "pfecha") {
        aux = fechas[valor].map((i) => ({
          value: i.escenario,
          label: i.escenario,
        }));
        //filtra datos
        datosAux = { [valor]: datoMaestro[valor] };
      }

      if (autorizacion.radio === "pesc") {
        aux = escenarios[valor].map((i) => ({
          value: i.fechas,
          label: i.fechas,
        }));
        //filtra datos en combo1 por escenario

        for (const i in datoMaestro) {
          let temp = [];
          temp = datoMaestro[i].filter((item) => item.escenario === valor);
          if (temp.length > 0) {
            datosAux = { ...datosAux, [i]: temp };
          }
        }
      }
    }

    if (campo === "op02") {
      aux = autorizacion.op02;
      if (autorizacion.radio === "pfecha") {
        
        
        for (const i in datoMaestro[autorizacion.op01Value]) {
          let temp = [];
          temp = datoMaestro[autorizacion.op01Value].filter((item) => item.escenario === valor);
          if (temp.length > 0) {
            datosAux = { ...datosAux, [autorizacion.op01Value]: temp };
          }
        }        
      }
      if (autorizacion.radio === "pesc") {
        for (const i in datoMaestro) {
          let temp = [];
          temp = datoMaestro[i].filter((item) => item.escenario === autorizacion.op01Value);
          if (temp.length > 0) {
            datosAux = { ...datosAux, [i]: temp };
          }
        }
        datosAux = { [valor]: datosAux[valor] };
      }
    }

    //filtrando datos
    /*if(autorizacion.radio === 'pfecha'){
      datosAux = datos.filter(item => item.score >= 11);
    }*/
    setAutorizacion({ ...autorizacion, op02: aux, [`${campo}Value`]: valor });

    setDatos(datosAux);
    //filtra datos por value de combo box
    console.log(datosAux);
  };

  //cargado inicial
  useEffect(() => {
    ApiUrls.invokeGET(
      "/viewAuto",
      (response) => {
        /* caragar algo pa autocomplete */
        setDatoMaestro(response.body.datos);
        setDatos(response.body.datos);
        setEscenarios(response.body.escenarios);
        setFechas(response.body.fechas);
      },
      (error) => {
        window.location = "/autorizacion";
      }
    );
  }, []);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  DDEA GAMEA <small>Autorizacion deportivos</small>
                </h3>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 col-sm-6">
                    Elija el modo de reporte
                  </div>
                  <div className="col-md-8 col-sm-6">
                    <div className="form-group" >
                      {autorizacion.radios.map((i, index) => (
                        <div className="form-check form-check-inline" key={uuid()}>
                          <input
                            className="form-check-input"
                            type="radio"
                            value={i[0]}
                            name="rsector"
                            id="rsector"
                            onChange={handleInputRadio}
                            checked={autorizacion.radio === i[0]}
                            
                          />
                          <label className="form-check-label">{i[1]}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-6" key={uuid()}>
                    <div className="form-group">
                      <select
                        value={autorizacion.op01Value}
                        onChange={handleChange}
                        name="op01"
                        className="form-control"
                      >
                        <option value="-1">Todos {autorizacion.radio}</option>
                        {autorizacion.op01.map((i, index) => (
                          <option value={i.value} key={i.label}>
                            {i.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <select
                        value={autorizacion.op02Value}
                        onChange={handleChange}
                        name="op02"
                        className="form-control"
                      >
                        <option value="-1">Todos</option>
                        {autorizacion.op02.map((i, index) => (
                          <option value={i.value} key={i.label}>
                            {i.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                
                  {Object.entries(datos).map(([columnId, column], index) => (
                    <div className="row" key={uuid()}>
                      <div className="col-md-3 col-sm-6">
                        <label>{columnId}</label>
                      </div>
                      <div className="col-md-9 col-sm-6">
                        <table className="table table-bordered table-hover">
                          <tbody>
                            {column?.map((i) => (
                              <tr key={uuid()}>
                                <td>{i.escenario}</td>
                                <td>{i.organizacion}</td>
                                <td>{i.inicio}</td>
                                <td>{i.final}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
