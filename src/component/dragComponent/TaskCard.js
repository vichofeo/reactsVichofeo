import React, { memo } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";


function TaskCard({ item, index }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: 8,
              margin: "0 0 8px 0",
              minHeight: "45px",
              backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
              color: "white",
              borderRadius: "6px",
              ...provided.draggableProps.style
            }}
          >
            <div className="conten-card">
              <img
                src={item.avatar || "https://react-beautiful-dnd.netlify.app/static/media/bmo-min.9c65ecdf.png"}
                alt="logo"
                className="logo"
              />
              {item.content}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

TaskCard.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object
};

export default memo(TaskCard);
