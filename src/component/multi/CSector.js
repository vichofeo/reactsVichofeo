import { useState, useRef, useEffect } from "react";
import ApiUrls from "../../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";

import Paginacion from "../uPaginacion";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

export default function Csector() {
  const [sector, setSector] = useState({
    nombre_sector: "",
  });

  const [lista, setLista] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  const labelMensaje = useRef();
  const labelGuardar = useRef();

  let browserHistory = useNavigate();

  useEffect(() => {
    ApiUrls.invokeGET(
      "/viewSector",
      (response) => {
        setLista(response.body);
        setOptions(response.options);
      },
      (error) => {
        window.location = "/sector";
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
    setSector({
      ...sector,
      [campo]: valor,
    });
  };

  //valida no mbre
  const validaName = (e) => {
    const label = labelMensaje.current;
    let name = e.target.value;
    name = name.replaceAll(" ", "%20");
    ApiUrls.invokeGET(
      "/validateNameSector/" + name,
      (res) => {
        setSector({ ...sector, lok: true });
        label.innerHTML = res.mensaje;
        label.className = "right badge badge-success";
      },
      (error) => {
        setSector({ ...sector, lok: false });
        label.innerHTML = error.mensaje;
        label.className = "right badge badge-danger";
      }
    );
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    const label = labelGuardar.current;

    if (!sector.lok && !sector._id) {
      label.innerHTML = "no puede grabara pq ya existe un registrados";
      return;
    }
    label.innerHTML = "";

    //estructura de datos
    let request = {
      nombre_sector: sector.nombre_sector,
      tipo_sector: selected.map((i) => {
        return {
          _id: i.value,
        };
      }),
    };

    if (!sector._id) {
      //guarda
      ApiUrls.invokePOST(
        "/addSector",
        request,
        (res) => {
          window.location = "/sector";
          browserHistory("/sector", { replace: true });
        },
        (err) => {
          label.innerHTML = err.mensaje;
        }
      );
    } else {
      request = { ...request, _id: sector._id };
      //actualiza
      ApiUrls.invokePUT(
        "/updateSector",
        request,
        (res) => {
          if (res.ok) {
            ApiUrls.invokeGET(
              "/viewsector",
              (response) => {
                setSector({
                  nombre_sector: "",
                });
                setLista(response.body);
              },
              (error) => {
                window.location = "/sector";
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

  let listasectores = lista;
  //buscaPelicula();
  const cargarListasectores = () => {
    listasectores = listasectores.slice(
      (paginaActual - 1) * PAGINABLOQUE,
      paginaActual * PAGINABLOQUE
    );
  };

  const getTotalPaginas = () => {
    let cantidadTotalsectores = lista.length;
    return Math.ceil(cantidadTotalsectores / PAGINABLOQUE);
  };

  cargarListasectores();

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-success">
              <div className="card-header">
                <h3 className="card-title">
                  Seleccione el Sector para Editar (haga click)
                </h3>
              </div>

              <div className="card-body">
                <table
                  id="example2"
                  className="table table-bordered table-hover"
                >
                  <thead>
                    <tr>
                      <th>Nombre Sector</th>
                      <th>Click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listasectores.map((i) => (
                      <tr key={i.nombre_sector}>
                        <td>{i.nombre_sector}</td>
                        <td>
                          <a
                            href="#"
                            className="badge badge-warning"
                            id={i.nombre_sector}
                            onClick={() => {
                              estyleSelect(i.nombre_sector);
                              setSector(i);
                              setSelected(i.selected);
                            }}
                          >
                            {i.nombre_sector}
                          </a>
                        </td>
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
                            setSector({
                              nombre_sector: "",
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

          <div className="col-md-6">
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className={sector.nombre_sector ? 'card card-danger': 'card card-info'}>
                      <div className="card-header">
                        <h3 className="card-title">
                           Formulario de Datos: {sector.nombre_sector ? `Editar Tipo Sector: ${sector.nombre_sector}`: 'Nuevo registro'}
                        </h3>
                      </div>
                      <form id="quickForm">
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="nameLabel">Nombre sector</label>
                              <input
                                type="text"
                                value={sector.nombre_sector}
                                placeholder="Nombre clave de sector"
                                name="nombre_sector"
                                className="form-control"
                                id="nombre_sector"
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
                              <label htmlFor="sector">
                                Elija los tipos en el sector
                              </label>
                              <DualListBox
                                options={options}
                                selected={selected}
                                onChange={onChangeDualList}
                                simpleValue={false}
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
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
