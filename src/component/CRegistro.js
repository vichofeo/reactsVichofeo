import { v4 as uuid } from "uuid";
import { useState, useRef, useEffect } from "react";
import ApiUrls from "../utils/ApiInvoker";
import { useNavigate } from "react-router-dom";

import Paginacion from "./uPaginacion";

export default function CRegistro() {
  
  const [luchador, setLuchador] = useState({
    name: "",
    nombre: "",
    avatar: null,
    foto: null,
    musica: null,
  });

  const [lista, setLista] = useState([]);

  const labelMensaje = useRef();
  const labelGuardar = useRef();
  
  let browserHistory = useNavigate();

  useEffect(() => {
    ApiUrls.invokeGET(
      "/viewLuchador",
      (response) => {
        setLista(response.body);
      },
      (error) => {
        window.location = "/";
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
    setLuchador({
      ...luchador,
      [campo]: valor,
    });
  };

  const imageSelect = (e) => {
    let campo = e.target.name;
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file.size > 1240000) {
      alert("la imagen supera el maximo de 1 MB");
      return;
    }

    reader.onloadend = () => {
      setLuchador({ ...luchador, [campo]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const musicaSelect = (e) => {
    let campo = e.target.name;
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setLuchador({ ...luchador, [campo]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  //valida no mbre
  const validaName = (e) => {
    const label = labelMensaje.current;
    let name = e.target.value;
    ApiUrls.invokeGET(
      "/validateName/" + name,
      (res) => {
        setLuchador({ ...luchador, lok: true });
        label.innerHTML = res.mensaje;
        label.className = "right badge badge-success";
      },
      (error) => {
        setLuchador({ ...luchador, lok: false });
        label.innerHTML = error.mensaje;
        label.className = "right badge badge-danger";
      }
    );
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    const label = labelGuardar.current;

    if (!luchador.lok && !luchador._id) {
      label.innerHTML = "no puede grabara pq ya existe un registrados";
      return;
    }
    label.innerHTML = "";

    //estructura de datos
    let request = {
      name: luchador.name,
      nombre: luchador.nombre,
      avatar: luchador.avatar || null,
      foto: luchador.foto || null,
      musica: luchador.musica || null,
    };

    if(!luchador._id){
//guarda
    ApiUrls.invokePOST(
      "/addLuchador",
      request,
      (res) => {
        window.location = "/";
        browserHistory("/", { replace: true });
      },
      (err) => {
        label.innerHTML = err.mensaje;
      }
    );
    }else{
      request = {...request, _id: luchador._id}
      //actualiza
      ApiUrls.invokePUT(
        '/updateLuchador',
        request,
        (res) => {
          if (res.ok) {
            ApiUrls.invokeGET(
              "/viewLuchador",
              (response) => {
                setLista(response.body);
              },
              (error) => {
                window.location = "/";
              }
            )
          }
        },
        (err) => {
          console.error('error al actualizar perfil')
        }
      )
    }
    
  };

  //************************** PAGINACION */
  const [paginaActual, setPaginaActual] = useState(1);
  //const [peliculas, setPeliculas] = useState([]);
  const PAGINABLOQUE = 4;

  let listaLuchadores = lista;
  //buscaPelicula();
  const cargarListaLuchadores = () => {
    listaLuchadores = listaLuchadores.slice(
      (paginaActual - 1) * PAGINABLOQUE,
      paginaActual * PAGINABLOQUE
    );
  };

  const getTotalPaginas = () => {
    let cantidadTotalLuchadores = lista.length;
    return Math.ceil(cantidadTotalLuchadores / PAGINABLOQUE);
  };

  cargarListaLuchadores();

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">
                  IAR <small>registro de Luchadores</small>
                </h3>
              </div>

              <form id="quickForm">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nameLabel">Nombre</label>
                    <input
                      type="text"
                      value={luchador.name}
                      placeholder="Nombre clave de luchador"
                      name="name"
                      className="form-control"
                      id="name"
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
                    <label htmlFor="nombreLabel">
                      Nombre completo de luchador
                    </label>
                    <input
                      type="text"
                      value={luchador.nombre}
                      name="nombre"
                      className="form-control"
                      id="nombre"
                      placeholder="Nombre completo de luchador"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="avatar-box">
                        <img src={luchador.avatar} width="100%" />
                        <label
                          htmlFor="avatarInput"
                          className="btn select-avatar"
                        >
                          <i
                            className="fa fa-camera fa-2x"
                            aria-hidden="true"
                            style={{ color: "Tomato" }}
                          ></i>
                          <p>Avatar</p>
                        </label>
                        <input
                          href="#"
                          id="avatarInput"
                          name="avatar"
                          className="btn"
                          type="file"
                          accept=".gif,.jpg,.jpeg,.png"
                          onChange={imageSelect.bind(this)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <img src={luchador.foto} width="100%" />
                        <label
                          htmlFor="fotoInput"
                          className="btn select-avatar"
                        >
                          <i
                            className="fa fa-camera fa-2x"
                            aria-hidden="true"
                          ></i>
                          <p>Foto luchador cuerpo completo</p>
                        </label>
                        <input
                          href="#"
                          className="btn"
                          accept=".gif,.jpg,.jpeg,.png"
                          type="file"
                          id="fotoInput"
                          name="foto"
                          onChange={imageSelect.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="musicaInput" className="btn select-avatar">
                      <i
                        className="fa fa-music fa-2x"
                        aria-hidden="true"
                        style={{ color: "Tomato" }}
                      ></i>
                      <p>tema musical</p>
                    </label>
                    <input
                      href="#"
                      id="musicaInput"
                      name="musica"
                      className="btn"
                      type="file"
                      accept=".mp3, .mp4"
                      onChange={musicaSelect.bind(this)}
                    />
                  </div>
                  <div className="col-md-6">
                    <div key={uuid()}>
                      <audio controls>
                        <source src={luchador.musica} type="audio/mpeg" />
                      </audio>
                    </div>
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
                          Lista de Luchadores 
                        </h3>
                      </div>

                      <div className="card-body" key={uuid()}>
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th>Clave</th>
                              <th>nombre</th>
                              <th>avatar</th>
                              <th>tema</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listaLuchadores.map((i, index) => (
                              <tr key={uuid()}>
                                <td>
                                <a  href="#"
                                className="badge badge-warning"
                                id={i.name}
                                onClick={() => {
                                  estyleSelect(i.name)  
                                  setLuchador(i)                              
                                }
                                }>
                              {i.name}
                              </a>
                                </td>
                                <td>{i.nombre}</td>
                                <td>
                                  <img src={i.avatar} width="100px" />
                                </td>
                                <td>
                                  <div>
                                    <audio controls>
                                      <source
                                        src={i.musica}
                                        type="audio/mpeg"
                                      />
                                    </audio>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th colSpan={4}>
                                <Paginacion
                                  pagina={paginaActual}
                                  total={getTotalPaginas()}
                                  cambioPage={(pagina) => {
                                    setLuchador({
                                      name: "",
                                      nombre: "",
                                      avatar: null,
                                      foto: null,
                                      musica: null,
                                    })
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
