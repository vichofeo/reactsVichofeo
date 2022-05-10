import { useState, useRef, useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";

import Paginacion from "../uPaginacion";

export default function CEspacio() {
  const [espacio, setEspacio] = useState({
    nombre_espacio: "",
  });

  const [lista, setLista] = useState([]);

  const labelMensaje = useRef();
  const labelGuardar = useRef();

  let browserHistory = useNavigate();

  useEffect(() => {
    ApiUrls.invokeGET(
      "/viewEspacio",
      (response) => {
        setLista(response.body);
      },
      (error) => {
        window.location = "/espacio";
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
    setEspacio({
      ...espacio,
      [campo]: valor,
    });
  };

  //valida no mbre
  const validaName = (e) => {
    const label = labelMensaje.current;
    let name = e.target.value;
    name = name.replaceAll(" ", "%20")
    ApiUrls.invokeGET(
      "/validateNameEspacio/" + name,
      (res) => {
        setEspacio({ ...espacio, lok: true });
        label.innerHTML = res.mensaje;
        label.className = "right badge badge-success";
      },
      (error) => {
        setEspacio({ ...espacio, lok: false });
        label.innerHTML = error.mensaje;
        label.className = "right badge badge-danger";
      }
    );
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    const label = labelGuardar.current;

    if (!espacio.lok && !espacio._id) {
      label.innerHTML = "no puede grabara pq ya existe un registrados";
      return;
    }
    label.innerHTML = "";

    //estructura de datos
    let request = {
      nombre_espacio: espacio.nombre_espacio,
    };

    if (!espacio._id) {
      //guarda
      ApiUrls.invokePOST(
        "/addEspacio",
        request,
        (res) => {
          window.location = "/espacio";
          browserHistory("/espacio", { replace: true });
        },
        (err) => {
          label.innerHTML = err.mensaje;
        }
      );
    } else {
      request = { ...request, _id:espacio._id };
      //actualiza
      ApiUrls.invokePUT(
        "/updateEspacio",
        request,
        (res) => {
          if (res.ok) {
            
            ApiUrls.invokeGET(
              "/viewEspacio",
              (response) => {
                setEspacio({
                  nombre_espacio: "",
                });
                setLista(response.body);
              },
              (error) => {
                window.location = "/espacio";
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

  let listaespacioes = lista;
  //buscaPelicula();
  const cargarListaespacioes = () => {
    listaespacioes = listaespacioes.slice(
      (paginaActual - 1) * PAGINABLOQUE,
      paginaActual * PAGINABLOQUE
    );
  };

  const getTotalPaginas = () => {
    let cantidadTotalespacioes = lista.length;
    return Math.ceil(cantidadTotalespacioes / PAGINABLOQUE);
  };

  cargarListaespacioes();

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  DDEA GAMEA <small>Config. Registro de espacios</small>
                </h3>
              </div>

              <form id="quickForm">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nameLabel">Nombre del espacio</label>
                    <input
                      type="text"
                      value={espacio.nombre_espacio}
                      placeholder="Nombre clave de espacio"
                      name="nombre_espacio"
                      className="form-control"
                      id="nombre_espacio"
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

                      <div className="card-body">
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
                            {listaespacioes.map((i) => (
                              <tr key={i.nombre_espacio}>
                                <td>
                                  <a
                                    href="#"
                                    className="badge badge-warning"
                                    id={i.nombre_espacio}
                                    onClick={() => {
                                      estyleSelect(i.nombre_espacio);
                                      setEspacio(i);
                                    }}
                                  >
                                    {i.nombre_espacio}
                                  </a>
                                </td>
                                <td>{i.nombre_espacio}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th colSpan="2">
                                <Paginacion
                                  pagina={paginaActual}
                                  total={getTotalPaginas()}
                                  cambioPage={(pagina) => {
                                    setEspacio({
                                      nombre_espacio: "",
                                    });
                                    setPaginaActual(pagina);
                                  }}
                                />
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
