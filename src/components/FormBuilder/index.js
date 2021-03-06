import React, { useState,useEffect } from 'react';

import parse from 'html-react-parser';
import Module from "../Module";

import '../FormBuilder/formBuilder.css'


function FormBuilder(props) {

    const [domTree, setDomTree]  = useState([]);
    const [remove,setRemove] = useState("");
    const [toggleModule,setToggleModule] = useState(false);
    const [elementId,setElementId] = useState("");
    const [grid, setgrid] = useState([["","",""],
                                      ["","",""],
                                      ["","",""]])

    useEffect(() => {
         removeDom();
    },[remove])
    const openCloseModule = (domElement = "") => {
        setElementId(domElement);
        setToggleModule(prevState => !prevState);
    };

    const stringToHTML = function (str) {
        const dom = document.createElement('div');
        dom.innerHTML = str;
        return dom;
    };

    const newAttributesSave = (attributes,elementId,items) => {
      const dom = [...domTree];
      const newGrid = [...grid];
      const elementIndex = elementId;
      const domRe = document.getElementsByClassName(elementId);

      const [indexI,indexJ] = elementIndex.split(" ")[1].split("J");
      const test = stringToHTML(grid[+indexI][+indexJ]);
      Object.entries(attributes).forEach( ( [key,value] ) => {
        test.firstChild.setAttribute(key,value);
      });

      domRe[0].replaceChild(test.firstChild,domRe[0].firstChild);

      if(items.length > 0){
        domRe[0].firstChild.innerHTML = "";
        items.forEach(el => {
          domRe[0].firstChild.appendChild(el);
        })
      }

      const domIndex = domTree.findIndex((element,index) => {
        return element.props.className === elementId
      });

      if(domIndex === -1){
        return null;
      }
    
      dom[domIndex] =  parse(domRe[0].parentNode.innerHTML);
      newGrid[+indexI][+indexJ] = domRe[0].innerHTML;

      setDomTree(dom);
      setgrid(newGrid);
      setToggleModule(prevState => !prevState);
      setElementId("");

    }

    const addMatrixArea = (newGrid,indexI,indexJ) => {
      if(indexI === newGrid.length-1){
          newGrid.push(new Array(newGrid[indexI].length).fill(""));
      }
       if(indexJ === newGrid[indexI].length-1 ){
          newGrid.forEach(el => {
            el.push("");
          })
      }
      return newGrid;
    }

    const removeElement = (uniq_id,card) => {
      setRemove(uniq_id);
      card.innerHTML = "";
    }

    const removeDom = () => {
      const dom = [...domTree];
      const newGrid = [...grid];
      if(remove !== ""){
        const [indexI,indexJ] = remove.split("J");
        newGrid[indexI][indexJ] = "";
      }
      dom.forEach((el,index,obj) => {
        if (el.props.className.includes(remove)) {
          obj.splice(index, 1);
        }
      })
      setDomTree(dom);
      setgrid(newGrid);
    }

    const drop = (e) => {
      e.preventDefault();
      const card_id = e.dataTransfer.getData('card_id');

      const card = document.getElementById(card_id).cloneNode(true);
      const uniq_id =  card.className + " "+ e.target.getAttribute("id");
      card.setAttribute("class",uniq_id);

      const [indexI,indexJ] = e.target.getAttribute("id").split("J");
      const newgrid = [...grid]
      newgrid[+indexI][+indexJ] = card.innerHTML;

      const resGrid = addMatrixArea(newgrid,+indexI,+indexJ);

      const div = document.createElement('div');
      const button = createButton("btn","+",()=>{ openCloseModule(uniq_id) } )
      const removebtn = createButton("btn2","X",()=>{ removeElement(e.target.getAttribute("id"),e.target) } )
      div.appendChild(button);
      div.appendChild(removebtn);
      card.appendChild(div);
      card.style.display = "block";
      if(e.target.childNodes.length > 0){
        return null;
      }
      
      e.target.appendChild(card);
      setDomTree([...domTree, parse(e.target.innerHTML)]);       
      setgrid(resGrid); 

    } 
    const createButton = (id,text,method) => {
      const button = document.createElement('button');
      button.setAttribute("id",id);
      button.innerText = text;
      button.onclick = method;
      return button;
    }
    const dragEnter = ( e ) => {
      if(e.target.className === "section border" || e.target.className === "section"){
          e.target.childNodes.forEach(element => {
             element.classList.add("border");
          });
      }
    }

    const dragLeave = (e) => {
      if(e.target.className === "board"){
          e.target.childNodes.forEach(element => {
             element.classList.remove("border");
          });
      }         
    }

    const dragOver = e => {
      e.preventDefault();
    }
      

    const auto = new Array(grid[0].length).fill("auto");

    return (
      <>
        <Module showModal={toggleModule} openCloseModule={openCloseModule}
                domTree={domTree} elementId={elementId} save={newAttributesSave}/>
        <div className={props.className} id={props.id} style={{"gridTemplateColumns" : auto.join(" ")}} 
             onDrop={(e)=>{drop(e)}} onDragLeave={(e)=> {dragLeave(e)}} onDragEnter={dragEnter} onDragOver={dragOver}>
                {
                  grid.map((el,indexI) => {
                    return el.map((item,IndexJ) => {
                        return (
                          <div  className="tesf" id={indexI+"J"+IndexJ} key={indexI+""+IndexJ}></div>
                        )
                      })                  
                  })
                }
                <button className="buttonSave" onClick={() => {props.ClearHtmlCode(domTree,grid)}}>save</button>
        </div>
      </>
    );
}
export default FormBuilder;
