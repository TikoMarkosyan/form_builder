import React, {  useState } from 'react';
import Modal from 'react-modal';
import '../App/main.css'


function Module(props) {
    const [newattributes, setNewAttributes] = useState({});
    const attributes = [
        {nameTag:"button", id:"", title:"",value:"",children :"", type:["button", "reset", "submit"], autofocus:["false","true"], disabled:["false","true"] },
        {nameTag:"input", id:"", title:"",value:"",children :"", type:["button", "reset", "submit"], autofocus:["false","true"], disabled:["false","true"] },
        {nameTag:"text",id:"", title:"",value:"",type:["button", "email", "file", "number","password", "submit", "text","radio","checkbox"],  autofocus:["false","true"],disabled:["false","true"], placeholder:"",name:"",min:0,max:0 },
        {nameTag:"textarea", id:"",value:"", autofocus:["false","true"],disabled:["false","true"], placeholder:"", name:"", rows:0, wrap:0 },
        {nameTag:"select", id:"",multiple:["false","true"], autofocus:["false","true"],disabled:["false","true"],name:"",options:["",""]},
        {nameTag:"radio", id:"", name:"",checked:["false","true"],value:"",disabled:""},
        {nameTag:"checkbox", id:"", name:"",checked:["false","true"],value:"",disabled:""},
        {nameTag:"div", id:"", name:"",checked:["false","true"],value:"",disabled:""}
    ]

    const newAtribute = (key,value) => {
        setNewAttributes({
            ...newattributes,
            [key]:value,
        })
    }

    const showInputAtribute = (key) => {
        return (
            <>
                <p>{key}</p>
                <input type="text" onChange={((e) => {newAtribute(key,e.target.value)})}/>
            </>
        )
    }
    const showSelectAtribute =  (key,value) => {
        return ( 
            <select name={key} onChange={(e) => {newAtribute(key,e.target.value) }}>
                {
                    value.map((e, keyOption) => {
                        return <option key={keyOption} value={e}>{e}</option>;
                    })
                }
            </select>
        )
    }
    const whitchElement = (attributeTagName,elementTagName) => {
        if(elementTagName === "button" || elementTagName === "text" || elementTagName === "textarea"){
            return  attributeTagName === elementTagName;
        } 
        return attributeTagName === elementTagName;    
    }

    const addAtribute = () => {
        const res =  props.domTree.find(el => el.props.className === props.elementId);

        if(res === undefined){
            return null;
        }

        const result =  attributes.find(el => {
            if(res.props.children.type !== undefined){

                return whitchElement(el.nameTag,res.props.children.type);
                
            }else if(res.props.children.type === undefined){
                return whitchElement(el.nameTag,res.props.children[0].type);
                
            }
            else{

                return whitchElement(el.nameTag,res.props.children.props.type)

            }

        })
       
        return (
            <div>
                {
                    Object.entries(result).map(([key,value]) => {
                        if(key === "nameTag") {
                            return (
                                <p>{key +" "+ value}</p>
                            )
                        }

                        if(Array.isArray(result[key])){
                            return showSelectAtribute(key,value);
                        }

                        return showInputAtribute(key);
                    })
                }
            </div>
        )

    }
    return (
        <Modal 
            isOpen={props.showModal}
            contentLabel="onRequestClose Example"
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
            >
                <div>
                    {addAtribute()}
                    <button onClick={()=> {props.save(newattributes,props.elementId) }}>save</button>
                    <button onClick={props.openCloseModule}>close</button>
                </div>    
        </Modal>
    );
}
export default Module;

