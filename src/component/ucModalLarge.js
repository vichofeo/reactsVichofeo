
import { v4 as uuid } from "uuid";
const ModalLarge = ({children, nameModal, tituloModal, swFlag, bsave, bverpdf, estado, bdel}) => {
  

  
  return (
    <article
      className={`modal fade `}
      id={nameModal} aria-hidden="true" style={{display: swFlag ? "block": "none"}}
      onClick={(e)=> swFlag ? bverpdf() : null}
      
    >
      <div className="modal-dialog modal-lg" key={uuid()}>
        <div className="modal-content" >
          <div className="modal-header">
            <h4 className="modal-title">{tituloModal}</h4>
            {estado==='Pagado'? null: <button
            type="submit"
            className="btn btn-primary"
            onClick={bsave}
            data-toggle="modal"
            data-target="#modal-xl"
          >
            Guardar Informacion 
          </button>}
            

          {estado==='Reservado' ? <button
          type="submit"
          className="btn btn-danger"
          onClick={bdel}
          data-toggle="modal"
          data-target="#modal-xl"
        >
          Eliminar Reserva 
        </button>: null}

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(e)=>  swFlag ? bverpdf() : null}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="modal-body">{children}</div>
          <div className="modal-footer justify-content-between">
          {estado==='Pagado'? null: <button
            type="submit"
            className="btn btn-primary"
            onClick={bsave}
            data-toggle="modal"
            data-target="#modal-xl"
          >
            Guardar Informacion 
          </button>}
        </div>
        </div>
      </div>
    </article>
  );
};

export default ModalLarge;
