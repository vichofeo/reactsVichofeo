
import { useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd"
import Column from "../dragComponent/Column";



const InputDragDrop = ({ onDragEnd, dragDropData, ButtonSubmit, handleSubmit }) => {
    const labelGuardar = useRef();

    return (
        <div>
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result)}
            >
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-4">

                            <Column
                                droppableId={Object.entries(dragDropData)[0][0]}
                                key={Object.entries(dragDropData)[0][0]}
                                index={0}
                                column={dragDropData[Object.entries(dragDropData)[0][0]]}
                            />
                            <ButtonSubmit
                                labelError={labelGuardar}
                                onClick={handleSubmit}
                            >Grabar Cambios</ButtonSubmit>
                        </div>
                        <div className="col-sm-8">
                            {Object.entries(dragDropData).map(([columnId, column], index) => {
                                //console.log(columns);
                                if (index > 0 && !(index % 2)) {
                                    return (
                                        <div className="row mb-2" key={index}>
                                            <div className="col-sm-6">
                                                <Column
                                                    droppableId={Object.entries(dragDropData)[index - 1][0]}
                                                    key={Object.entries(dragDropData)[index - 1][0]}
                                                    index={index - 1}
                                                    column={
                                                        dragDropData[Object.entries(dragDropData)[index - 1][0]]
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
    )
}

export default InputDragDrop