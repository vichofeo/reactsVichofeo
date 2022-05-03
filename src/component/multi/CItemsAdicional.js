import { v4 as uuid } from "uuid";
import { useState, useRef, useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";

import Paginacion from "../uPaginacion";

export default function CItemsAdicional() {
  const [itemAdicional, setItemAdicional] = useState({
    item_adicional: "",
  });

  const [lista, setLista] = useState([]);

  const labelMensaje = useRef();
  const labelGuardar = useRef();

  let browserHistory = useNavigate();

  useEffect(() => {
    ApiUrls.invokeGET(
      "/viewItemAdicional",
      (response) => {
        setLista(response.body);
      },
      (error) => {
        window.location = "/itemsAdicional";
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
    setItemAdicional({
      ...itemAdicional,
      [campo]: valor,
    });
  };

  //valida no mbre
  const validaName = (e) => {
    const label = labelMensaje.current;
    let name = e.target.value;
    name = name.replaceAll(" ", "%20")
    ApiUrls.invokeGET(
      "/validateNameitemAdicional/" + name,
      (res) => {
        setItemAdicional({ ...itemAdicional, lok: true });
        label.innerHTML = res.mensaje;
        label.className = "right badge badge-success";
      },
      (error) => {
        setItemAdicional({ ...itemAdicional, lok: false });
        label.innerHTML = error.mensaje;
        label.className = "right badge badge-danger";
      }
    );
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    const label = labelGuardar.current;

    if (!itemAdicional.lok && !itemAdicional._id) {
      label.innerHTML = "no puede grabrar pq ya existe un registrados";
      return;
    }
    label.innerHTML = "";

    //estructura de datos
    let request = {
      item_adicional: itemAdicional.item_adicional,
    };

    if (!itemAdicional._id) {
      //guarda
      ApiUrls.invokePOST(
        "/addItemAdicional",
        request,
        (res) => {
          window.location = "/itemsAdicional";
          browserHistory("/itemsAdicional", { replace: true });
        },
        (err) => {
          label.innerHTML = err.mensaje;
        }
      );
    } else {
      request = { ...request, _id:itemAdicional._id };
      //actualiza
      ApiUrls.invokePUT(
        "/updateItemAdicional",
        request,
        (res) => {
          if (res.ok) {
            
            ApiUrls.invokeGET(
              "/viewItemAdicional",
              (response) => {
                setItemAdicional({
                  item_adicional: "",
                });
                setLista(response.body);
              },
              (error) => {
                window.location = "/itemAdicional";
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

  let listaitemAdicionales = lista;
  //buscaPelicula();
  const cargarListaitemAdicionales = () => {
    listaitemAdicionales = listaitemAdicionales.slice(
      (paginaActual - 1) * PAGINABLOQUE,
      paginaActual * PAGINABLOQUE
    );
  };

  const getTotalPaginas = () => {
    let cantidadTotalitemAdicionales = lista.length;
    return Math.ceil(cantidadTotalitemAdicionales / PAGINABLOQUE);
  };

  cargarListaitemAdicionales();

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  DDEA GAMEA <small>Config. Registro de itemAdicionals</small>
                </h3>
              </div>

              <form id="quickForm">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nameLabel">Nombre del item Adicional</label>
                    <input
                      type="text"
                      value={itemAdicional.item_adicional}
                      placeholder="Nombre clave de item Adicional"
                      name="item_adicional"
                      className="form-control"
                      id="item_adicional"
                      onChange={handleInput}
                      onBlur={validaName}
                      autoComplete="off"
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
                        <h3 className="card-title">Lista de Items Adicionales</h3>
                      </div>

                      <div className="card-body" >
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th>Clave</th>
                              <th>Item</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listaitemAdicionales.map((i) => (
                              <tr key={i.item_adicional}>
                                <td>
                                  <a
                                    href="#"
                                    className="badge badge-warning"
                                    id={i.item_adicional}
                                    onClick={() => {
                                      estyleSelect(i.item_adicional);
                                      setItemAdicional(i);
                                    }}
                                  >
                                    {i.item_adicional}
                                  </a>
                                </td>
                                <td>{i.item_adicional}</td>
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
                                    setItemAdicional({
                                      nombre_itemAdicional: "",
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
