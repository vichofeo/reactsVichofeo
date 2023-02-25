import useGetdata from "../../hooks/useGet";
import { useEffect } from "react";
import PaginacionDataTable from "./PaginacionDataTable";

const DataTableLuchador = ({ url, title, clickLuchador }) => {

    
    const [respuesta, getRespuesta, getRespuestawBody] = useGetdata(url)

    useEffect(() => getRespuesta, []);

    const blocksPages = respuesta.blocksPages
    const pageActive = respuesta.pageActive
    const luchadores = respuesta.luchadores
    
    const estyleSelect = (id, sw) => {
        const estilo = document.getElementById(id);
        estilo.className = sw?"badge badge-danger right": "badge badge-warning"
        return sw
    
      };
     
      const traeData = (datos) =>{
        
        getRespuestawBody(datos)
      }
    //console.log("respuesta", respuesta.blocksPages)
    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    {title}
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
                                            <th>avatar</th>
                                            <th>tema</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!luchadores ? null : luchadores.map((i, index) => {
                                            let flag = false
                                            return(
                                            <tr key={i.name}>
                                                <td>
                                                    <button
                                                        className="badge badge-warning"
                                                        id={i.name}
                                                        onClick={() => {                                                            
                                                            clickLuchador(i)                                                            
                                                            flag= estyleSelect(i.name, !flag)
                                                        }
                                                        }
                                                        style={{border: 'none'}}>
                                                        {i.name}
                                                    </button>
                                                </td>
                                                <td>{i.nombre}</td>
                                                <td>

                                                    <div className="widget-user-image">
                                                        <img className="brand-image img-circle elevation-2" src={i.avatar} alt={i.name} width="100px" height="100px" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <button type="button"  className="btn btn-app" onClick={() => { clickLuchador(i)  }}> <i className="fas fa-play"></i> Play</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )})}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colSpan={4}>
                                                <PaginacionDataTable
                                                pages={blocksPages}
                                                pageActive =  {pageActive}   
                                                buscaData={traeData}
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
    )
}

export default DataTableLuchador