import { useState } from "react"
import { debug } from "util"
import { status } from "../component/dragComponent/mock"
import ApiInvoker from "../utils/ApiInvoker"

const reconfigStatus = (dataIn) => {
    let reconfigStatus = null
    Object.entries(status).map(([objId, obj], index) => {
        //reescribre STATUS info de columnas
        reconfigStatus = {
            ...reconfigStatus,
            [objId]: dataIn[objId] ? { ...obj, items: dataIn[objId].items } : obj
        }
    })

    return reconfigStatus;

}

const useGetDataProgram = () => {

    const [dataInitial, setDataInitial] = useState(null)
    const [dataEvent, setDataEvent] = useState(null)
    const [dataDragDrog, setDataDragDrog] = useState(null)

    const getDataInitial = (setForms) => {
        ApiInvoker.invokeGET('/getPrograms',
            res => {
                if (res.ok) {
                    setDataInitial(res.body)
                    let datos = res.body[0]
                    
                    //llama datos de evento
                    getDataEvent(datos.value, setForms)
                    

                } else setDataInitial(null)

            }, e => {
                setDataInitial(e)
            })
    }

    const getDataEvent = (id, setForms) => {
        ApiInvoker.invokeGET(`/getProgramUltime/${id}`,
            response => {
                let dragDropData = reconfigStatus(response.body.estado)
                const evento = {
                    dragDropData: dragDropData,
                    datos: response.body.datos
                }

                setDataEvent(evento)
                setDataDragDrog(dragDropData)
                setForms({evento:id, name: response.body.datos.name})
            },
            e => {
                setDataEvent(null)
            }
        )
    }

    const onDragEnd = (result) => {

        if (!result.destination) return;
        const { source, destination } = result;
    
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = dataDragDrog[source.droppableId];
            const destColumn = dataDragDrog[destination.droppableId];
    
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
    
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setDataDragDrog({
                ...dataDragDrog,
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
            const column = dataDragDrog[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setDataDragDrog({
                ...dataDragDrog,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    }

    const convertDataDragDropToProgram=()=>{
         //de construye columnas
    let aux = Object.entries(dataDragDrog)
    let programa = {};
    let orden = 0;
    for (let i = 2; i < aux.length; i = i + 2) {
        let sw = 0;
//debugger
        if (aux[i - 1][1]["items"] && aux[i - 1][1]["items"].length > 0) {
            aux[i - 1][1]["items"].map((v, j) => {

                delete aux[i - 1][1]["items"][j].avatar;
                delete aux[i - 1][1]["items"][j]._id;
            });
            sw = 1;
        } else {
            aux[i - 1][1]["items"] = null;
        }

        if (aux[i][1]["items"] && aux[i][1]["items"].length > 0) {
            aux[i][1]["items"].map((v, j) => {

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

    return programa 
    }
    return [dataInitial, dataDragDrog, getDataInitial, getDataEvent, onDragEnd, convertDataDragDropToProgram]
}

export default useGetDataProgram