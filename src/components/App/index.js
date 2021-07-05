import React, { useState } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import { useHistory } from "react-router-dom";

import FormBuilder from '../FormBuilder';
import ItemForm from '../ItemForm';
import Element from '../Element';
import Form from "../Form";

import './App.css';
import './main.css'

function App() {
  const history = useHistory();
  const tagElement = ['button','text',"textarea","select","radio","checkbox"];
  const [dom, setDom] = useState([]);
  
  const ClearHtmlCode = (dom,grid) => {
      dom.forEach(element => {
          element.props.children.pop();
      });

      const finnalyVerson =  grid.map((cols,indexI) =>{
         return cols.map((item,IndexJ) => {
              const className = indexI+"J"+IndexJ;
              
              if(dom.some(el => el.props.className.includes(className))){
                return React.createElement("div", {id:className,className:"testf",key:className}, dom.find(elem => elem.props.className.includes(className)));
              }else{
                return React.createElement("div",{id:indexI+"J"+IndexJ,className:"testf",key:className});
              }
          });
      });

      setDom(finnalyVerson);
      history.push("/form");
  }

  return (
    <Switch>
        <Route exact path="/">
            <div>
              <div className="flexBox">
                    <div className="item_box">
                      {
                        tagElement.map((el, index) => {
                          return (
                            <div key={index}>
                              <p>{el}</p>
                              <ItemForm id={`card-${index}`} className="card" draggable={true} key={index}>
                                  <Element type={el} />
                              </ItemForm>
                            </div>
                          )
                        })
                      }
                    </div>
                    <FormBuilder id="board-2" className="board" ClearHtmlCode={ClearHtmlCode}>
                    
                    </FormBuilder>
                </div>
        
            </div>
        </Route>
        <Route exact path="/form">
            <Form domHtml={dom} />
        </Route>
     </Switch>
  
  )
}
export default App;
