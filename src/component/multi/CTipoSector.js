import { v4 as uuid } from "uuid";
import { useState, useRef, useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";

import Paginacion from "../uPaginacion";

export default function CTipoSector() {
  const [tipoSector, settipoSector] = useState({
    nombre_tipo_sector: "",
  });

  const [lista, setLista] = useState([]);

  const labelMensaje = useRef();
  const labelGuardar = useRef();

  let browserHistory = useNavigate();

  useEffect(() => {
    ApiUrls.invokeGET(
      "/viewtipoSector",
      (response) => {
        setLista(response.body);
      },
      (error) => {
        window.location = "/tipoSector";
      }
    );
  }, []);

  const estyleSelect = (id) => {
    const estilo = document.getElementById(id);
    estilo.className = "badge badge-danger right";
  };

  const handleInput = (e) => {
    let campo = e.target.name;
    let valor = e.target.value;
    settipoSector({
      ...tipoSector,
      [campo]: valor,
    });
  };

  //valida no mbre
  const validaName = (e) => {
    const label = labelMensaje.current;
    let name = e.target.value;
    name = name.replaceAll(" ", "%20")
    ApiUrls.invokeGET(
      "/validateNameTipoSector/" + name,
      (res) => {
        settipoSector({ ...tipoSector, lok: true });
        label.innerHTML = res.mensaje;
        label.className = "right badge badge-success";
      },
      (error) => {
        settipoSector({ ...tipoSector, lok: false });
        label.innerHTML = error.mensaje;
        label.className = "right badge badge-danger";
      }
    );
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    const label = labelGuardar.current;

    if (!tipoSector.lok && !tipoSector._id) {
      label.innerHTML = "no puede grabara pq ya existe un registrados";
      return;
    }
    label.innerHTML = "";

    //estructura de datos
    let request = {
      nombre_tipo_sector: tipoSector.nombre_tipo_sector,
    };

    if (!tipoSector._id) {
      //guarda
      ApiUrls.invokePOST(
        "/addTipoSector",
        request,
        (res) => {
          window.location = "/tipoSector";
          browserHistory("/tipoSector", { replace: true });
        },
        (err) => {
          label.innerHTML = err.mensaje;
        }
      );
    } else {
      request = { ...request, _id:tipoSector._id };
      //actualiza
      ApiUrls.invokePUT(
        "/updateTipoSector",
        request,
        (res) => {
          if (res.ok) {
            
            ApiUrls.invokeGET(
              "/viewTipoSector",
              (response) => {
                settipoSector({
                  nombre_tipo_sector: "",
                });
                setLista(response.body);
              },
              (error) => {
                window.location = "/tipoSector";
              }
            );
          }
        },
        (err) => {
          console.error("error al actualizar perfil");
        }
      );
    }
  };

  //************************** PAGINACION */
  const [paginaActual, setPaginaActual] = useState(1);
  //const [peliculas, setPeliculas] = useState([]);
  const PAGINABLOQUE = 10;

  let listatipoSectores = lista;
  //buscaPelicula();
  const cargarListatipoSectores = () => {
    listatipoSectores = listatipoSectores.slice(
      (paginaActual - 1) * PAGINABLOQUE,
      paginaActual * PAGINABLOQUE
    );
  };

  const getTotalPaginas = () => {
    let cantidadTotaltipoSectores = lista.length;
    return Math.ceil(cantidadTotaltipoSectores / PAGINABLOQUE);
  };

  cargarListatipoSectores();

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  DDEA GAMEA <small>Tipos de sector</small>
                </h3>
              </div>

              <form id="quickForm">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nameLabel">Nombre tipo sector</label>
                    <input
                      type="text"
                      value={tipoSector.nombre_tipo_sector}
                      placeholder="Nombre clave de tipoSector"
                      name="nombre_tipo_sector"
                      className="form-control"
                      id="nombre_tipo_sector"
                      onChange={handleInput}
                      onBlur={validaName}
                    />
                    <label
                      ref={labelMensaje}
                      id="memoNamex"
                      htmlFor="namex"
                    ></label>
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

          <div className="col-md-6">
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Lista de tipo Sectores</h3>
                      </div>

                      <div className="card-body" >
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th>Clave</th>
                              <th>nombre</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listatipoSectores.map((i) => (
                              <tr key={i.nombre_tipo_sector}>
                                <td>
                                  <a
                                    href="#"
                                    className="badge badge-warning"
                                    id={i.nombre_tipo_sector}
                                    onClick={() => {
                                      estyleSelect(i.nombre_tipo_sector);
                                      settipoSector(i);
                                    }}
                                  >
                                    {i.nombre_tipo_sector}
                                  </a>
                                </td>
                                <td>{i.nombre_tipo_sector}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th colSpan="2">
                                <div key={uuid()}><Paginacion
                                pagina={paginaActual}
                                total={getTotalPaginas()}
                                cambioPage={(pagina) => {
                                  settipoSector({
                                    nombre_tipo_sector: "",
                                  });
                                  setPaginaActual(pagina);
                                }}
                              /></div>
                              </th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
