import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import APIInvoker from "../utils/ApiInvoker";

export default function CVerPrograma() {
  const [programacion, setProgramacion] = useState({ fecha: null, luchas: [] });
  const [luchadores, setLuchadores] = useState();

  useEffect(() => {
    function aux() {
      APIInvoker.invokeGET(
        "/viewProgram",
        (res) => {
          setProgramacion({ fecha: res.body.fecha, luchas: res.body.luchas });
        },
        (error) => {
          window.location = "/";
        }
      );
    }
    aux();
  }, []);

const tarjetaAux = (nombre) =>{
  return (
    <div className="col-12 col-sm-12 col-md-12" >
      <div className={`card small-box`}>
        <div className="card-header">
          <h5 className="card-title"> {nombre}</h5>
        </div>
        
        <div className="card-footer">
          <div className="row">
            <div className="col-sm-12 col-12" >
              
                <audio width="100%" height="15" controls >
                  <source src={'/muss/' + nombre +'.mp3'} type="audio/mpeg" />
                </audio>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  const tarjeta = (objeto, sw) => {
    if (objeto) {
      let estilo = sw ? "bg-success" : "bg-info";

      return objeto.map((i) => {
        return (
          <div className="col-12 col-sm-6 col-md-4" key={uuid()}>
            <div className={`card small-box ${estilo}`}>
              <div className="card-header">
                <h5 className="card-title">{i.name}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={
                        i.foto ||
                        "https://react-beautiful-dnd.netlify.app/static/media/bmo-min.9c65ecdf.png"
                      }
                      alt="logo"
                      className="foto"
                    />
                  </div>

                  <div className="col-md-6">
                    <p className="text-center">
                      <strong>{i.nombre}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="row">
                  <div className="col-sm-6 col-12" key={uuid()}>
                    
                      <audio width="100" height="15" controls >
                        <source src={i.musica} type="audio/mpeg" />
                      </audio>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return;
  };


  const tarjetas = (objeto) => {
    const tarjets = [];
    if (objeto) {
      tarjets.push(tarjeta(objeto.lu01, false));
      tarjets.push(tarjeta(objeto.lu02, true));
    }

    return tarjets;
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <h3 className="profile-username text-center">Programacion</h3>

                <p className="text-muted text-center">{programacion.fecha}</p>

                <ul className="list-group list-group-unbordered mb-3">
                  {programacion.luchas.map((v, i) => (
                    <li className="list-group-item" key={i}>
                      <a onClick={() => setLuchadores(v)}>
                        <b>
                          {v.orden}. &nbsp;&nbsp;&nbsp;{" "}
                          {v.lu01.map((j) => (
                            <span key={uuid()}>{j.name} & </span>
                          ))}
                        </b>{" "}
                        vs
                        <b className="float-right">
                          {v.lu02.map((j) => (
                            <span key={uuid()}>{j.name} & </span>
                          ))}
                        </b>
                      </a>
                    </li>
                  ))}
                </ul>

                <a href="#" className="btn btn-primary btn-block">
                  <b>Guardar Fecha&nbsp;</b>
                </a>
              </div>
            </div>
            {tarjetaAux('entrada')}
            {tarjetaAux('arbitroHenry')}
            {tarjetaAux('arbitroBambino')}
            {tarjetaAux('arbitroAux')}            
            {tarjetaAux('final')}
          </div>

          <div className="col-md-9">
            <div className="row">{tarjetas(luchadores)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
