import React, { memo } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const Column = ({ droppableId, column }) => {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
    key={droppableId}
  >
    <h2>{column.name}</h2>
    <div style={{ margin: 8 }}>
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : column.color,
              padding: 4,
              width: 250,
              minHeight: (droppableId === 'var00') ? 500 : null,
              border: "2px dashed #ccc",
              borderRadius: "4px"
            }}
          >
            {column?.items?.map((item, index) => {
              return <TaskCard key={item.id} item={item} index={index} />;
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
    </div>
            </div>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string
};

export default memo(Column);
