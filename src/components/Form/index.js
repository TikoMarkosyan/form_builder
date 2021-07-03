
import React from 'react';
import "./Form.css"

function Form(props) {
  const auto = new Array(props.domHtml[0].length).fill("auto");

  return (
    <form id="form" >
      <div className="board" style={{"gridTemplateColumns" : auto.join(" ")}}>
        {
          props.domHtml.map(el =>{
            return el.map(item => {
              return item
            })
          })
        }
      </div>
    </form>
  )
  
}
export default Form;
