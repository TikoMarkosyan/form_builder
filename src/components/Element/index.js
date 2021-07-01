
import React from 'react';
import "./Element.css"

function Element(props) {

  const renderSwitch = (type) => {
    switch(type) {
        case 'button':
            return <input type="button" value="Button Text" id="myButton1"></input> 
        case 'text':
            return <input  type={"text"} placeholder={"input"} className={"Defult_input"}/>;
        case "textarea":
            return <textarea id="w3review" name="w3review" 
                              className={"Defult_textarea"} 
                              placeholder={"textArea"} 
                              rows="3" cols="14"></textarea>  
       case "select":
           return (
            <select name="select">
                    <option value="value1">select #1</option>
                    <option value="value2">select #2</option>
            </select>
           )
        case "radio":
            return (
                <div name="radio">
                    <input type="radio" id="html" name="radio" value="radio#1" />
                    <input type="radio" id="html" name="radio" value="radio#2" />
                </div>
            )
        case "checkbox":
            return(
                <div name="checkbox">
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="check" />
                    <label htmlFor="vehicle1"> checkbox</label><br/>
                    <input type="checkbox" id="vehicle2" name="vehicle2" />
                    <label htmlFor="vehicle2"> checkbox2</label><br/>
                </div>
            )    
        default: 
        return <div></div>
      }
  }

  return (
      <>
        { renderSwitch(props.type) }
      </>
  )
  
}
export default Element;
