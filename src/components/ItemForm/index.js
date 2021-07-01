
import React from 'react';
import '../App/main.css'


function ItemForm(props) {

  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.dropEffect = "copy";
    e.dataTransfer.effectAllowed = "copy"
    e.dataTransfer.setData('card_id',target.id);
  }

  const dragOver = e => {
    e.stopPropagation();
  }

  return (
    <div
        id={props.id}
        draggable={props.draggable}
        onDragStart={dragStart}
        onDragOver={dragOver}
        className={props.className}>
          {props.children}
    </div>
  );

}
export default ItemForm;
