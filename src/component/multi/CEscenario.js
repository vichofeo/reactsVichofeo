import { useState, useRef, useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";

import Paginacion from "../uPaginacion";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

export default function CEscenario() {
  const [escenario, setEscenario] = useState({
    nombre_escenario: "",
    direccion_escenario: "",
    valor_hora: "",
  });

  const [lista, setLista] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  const labelMensaje = useRef();
  const labelGuardar = useRef();

  let browserHistory = useNavigate();

  useEffect(() => {
    ApiUrls.invokeGET(
      "/viewEscenario",
      (response) => {
        setLista(response.body);
        setOptions(response.options);
      },
      (error) => {
        window.location = "/escenario";
      }
    );
  }, []);
  /* *********************** dual lists*/
  const onChangeDualList = (selected) => {
    setSelected(selected);
  };

  const estyleSelect = (id) => {
    const estilo = document.getElementById(id);
    estilo.className = "badge badge-danger right";
  };

  const handleInput = (e) => {
    let campo = e.target.name;
    let valor = e.target.value;
    setEscenario({
      ...escenario,
      [campo]: valor,
    });
  };

  //valida no mbre
  const validaName = (e) => {
    const label = labelMensaje.current;
    let name = e.target.value;
    name = name.replaceAll(" ", "%20");
    ApiUrls.invokeGET(
      "/validateNameEscenario/" + name,
      (res) => {
        setEscenario({ ...escenario, lok: true });
        label.innerHTML = res.mensaje;
        label.className = "right badge badge-success";
      },
      (error) => {
        setEscenario({ ...escenario, lok: false });
        label.innerHTML = error.mensaje;
        label.className = "right badge badge-danger";
      }
    );
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    const label = labelGuardar.current;

    if (!escenario.lok && !escenario._id) {
      label.innerHTML = "no puede grabara pq ya existe un registrados";
      return;
    }
    label.innerHTML = "";

    //estructura de datos
    let request = {
      nombre_escenario: escenario.nombre_escenario,
      direccion_escenario: escenario.direccion_escenario,
      valor_hora: escenario.valor_hora,
      espacios: selected.map((i) => {
        return {
          _id: i.value,
        };
      }),
    };

    if (!escenario._id) {
      //guarda
      ApiUrls.invokePOST(
        "/addEscenario",
        request,
        (res) => {
          window.location = "/escenario";
          browserHistory("/escenario", { replace: true });
        },
        (err) => {
          label.innerHTML = err.mensaje;
        }
      );
    } else {
      request = { ...request, _id: escenario._id };
      //actualiza
      ApiUrls.invokePUT(
        "/updateEscenario",
        request,
        (res) => {
          if (res.ok) {
            ApiUrls.invokeGET(
              "/viewEscenario",
              (response) => {
                setEscenario({
                  nombre_escenario: "",
                  direccion_escenario: "",
                  valor_hora: "",
                });
                setLista(response.body);
                setSelected([]);
              },
              (error) => {
                window.location = "/escenario";
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
  const PAGINABLOQUE = 5;

  let listaescenarioes = lista;
  //buscaPelicula();
  const cargarListaescenarioes = () => {
    listaescenarioes = listaescenarioes.slice(
      (paginaActual - 1) * PAGINABLOQUE,
      paginaActual * PAGINABLOQUE
    );
  };

  const getTotalPaginas = () => {
    let cantidadTotalescenarioes = lista.length;
    return Math.ceil(cantidadTotalescenarioes / PAGINABLOQUE);
  };

  cargarListaescenarioes();

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  DDEA GAMEA <small>Escenario deportivos</small>
                </h3>
              </div>

              <form id="quickForm">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nameLabel">
                      Nombre del Escenario deportivo
                    </label>
                    <input
                      type="text"
                      value={escenario.nombre_escenario}
                      placeholder="Nombre clave de escenario"
                      name="nombre_escenario"
                      className="form-control"
                      id="nombre_escenario"
                      onChange={handleInput}
                      onBlur={validaName}
                    />
                    <label
                      ref={labelMensaje}
                      id="memoNamex"
                      htmlFor="namex"
                    ></label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="nameLabel">
                      Direccion del Escenario deportivo
                    </label>
                    <input
                      type="text"
                      value={escenario.direccion_escenario}
                      placeholder="Direccion del escenario deportivo"
                      name="direccion_escenario"
                      className="form-control"
                      id="direccion_escenario"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="nameLabel">
                      Costo del alquieler por hora del escenario (Bs.)
                    </label>
                    <input
                      type="Number"
                      value={escenario.valor_hora}
                      placeholder="0.00 Bs"
                      name="valor_hora"
                      className="form-control"
                      id="valor_hora"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="escenario">
                      Elija los espacio con que cuenta el Escenario Deportivo
                    </label>
                    <DualListBox
                      options={options}
                      selected={selected}
                      onChange={onChangeDualList}
                      simpleValue={false}
                      className="form-select form-select-sm"
                    />
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
                        <h3 className="card-title">
                          Lista de tipo escenarioes
                        </h3>
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
                            {listaescenarioes.map((i) => (
                              <tr key={i.nombre_escenario}>
                                <td>
                                  <a
                                    href="#"
                                    className="badge badge-warning"
                                    id={i.nombre_escenario}
                                    onClick={() => {
                                      estyleSelect(i.nombre_escenario);
                                      setEscenario(i);
                                      console.log("<=======>");
                                      console.log(i);
                                      setSelected(i.selected);
                                    }}
                                  >
                                    {i.nombre_escenario}
                                  </a>
                                </td>
                                <td>{i.nombre_escenario}</td>
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
                                    setEscenario({
                                      nombre_escenario: "",
                                    });
                                    setPaginaActual(pagina);
                                    setSelected([]);
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
