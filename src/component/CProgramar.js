import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./dragComponent/Column";
import { status } from "./dragComponent/mock";
import APIInvoker from "../utils/ApiInvoker";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function CProgramar() {
  //const [newState, setnewState] = useState(status)
  //invoca datos
  const [columns, setColumns] = useState(status);

  useEffect(() => {
    function aux() {
      APIInvoker.invokeGET(
        "/viewLuchadorLite",
        (response) => {
          let aux = response.body.map((i) => {
            return {
              id: i._id,
              _id: i._id,
              content: i.name,
              avatar: i.avatar,
            };
          });

          let nweState = { ...status, var00: { ...status.var00, items: aux } };
          //setColumns(nweState)
          setColumns(nweState);
        },
        (error) => {
          window.location = "/";
        }
      );
    }
    aux();
  }, []);

  const guardarDatos = (e) => {
    e.preventDefault();

    //de construye columnas
    let aux = Object.entries(columns);
    let programa = {};
    let orden = 0;
    for (let i = 2; i < aux.length; i = i + 2) {
      let sw = 0;

      if (aux[i - 1][1]["items"].length > 0) {
        aux[i - 1][1]["items"].map((v, j) => {
          console.log(`Numero: ${j}`);
          delete aux[i - 1][1]["items"][j].avatar;
          delete aux[i - 1][1]["items"][j]._id;
        });
        sw = 1;
      } else {
        aux[i - 1][1]["items"] = null;
      }

      if (aux[i][1]["items"].length > 0) {
        aux[i][1]["items"].map((v, j) => {
          console.log(`Numero: ${j}`);
          delete aux[i][1]["items"][j].avatar;
          delete aux[i][1]["items"][j]._id;
        });
        sw = 1;
      } else {
        aux[i][1]["items"] = null;
      }
      if (sw > 0) {
        let temp = "l" + orden;
        programa[temp] = {
          orden: orden,
          lu01: aux[i - 1][1]["items"],
          lu02: aux[i][1]["items"],
        };
        orden++;
      }
    }
    console.log("===============");
    console.log(programa);
    //guarda
    APIInvoker.invokePOST(
      "/addPrograma",
      programa,
      (res) => {
        //console.log("*******************");
        //console.log(res);
        window.location = "/";
      },
      (err) => {
        //label.innerHTML = err.mensaje;
        var mensaje = "mal";
      }
    );
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-4">
                <Column
                  droppableId={Object.entries(columns)[0][0]}
                  key={Object.entries(columns)[0][0]}
                  index={0}
                  column={columns[Object.entries(columns)[0][0]]}
                />
                <button
                  onClick={guardarDatos}
                  type="button"
                  className="btn btn-primary"
                >
                  Guardar programacion
                </button>
              </div>
              <div className="col-sm-8">
                {Object.entries(columns).map(([columnId, column], index) => {
                  //console.log(columns);
                  if (index > 0 && !(index % 2)) {
                    return (
                      <div className="row mb-2" key={index}>
                        <div className="col-sm-6">
                          <Column
                            droppableId={Object.entries(columns)[index - 1][0]}
                            key={Object.entries(columns)[index - 1][0]}
                            index={index - 1}
                            column={
                              columns[Object.entries(columns)[index - 1][0]]
                            }
                          /> 
                        </div>
                        <div className="col-sm-6">
                          <Column
                            droppableId={columnId}
                            key={columnId}
                            index={index}
                            column={column}
                          />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
      <div></div>
    </>
  );
}

export default CProgramar;
