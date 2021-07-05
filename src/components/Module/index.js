import React, {  useState,useEffect } from 'react';
import Modal from 'react-modal';
import uuid from 'react-uuid'
import '../App/main.css'


function Module(props) {
    const [newattributes, setNewAttributes] = useState({});
    const [options, setOptions] = useState([]);
    const attributes = [
        {nameTag:"button", id:"", title:"",value:"",children :"", type:["button", "reset", "submit"], autofocus:["false","true"], disabled:["false","true"] },
        {nameTag:"input", id:"", title:"",value:"",children :"", type:["button", "reset", "submit"], autofocus:["false","true"], disabled:["false","true"] },
        {nameTag:"text",id:"", title:"",value:"",type:["button", "email", "file", "number","password", "submit", "text","radio","checkbox"],  autofocus:["false","true"],disabled:["false","true"], placeholder:"",name:"",min:0,max:0 },
        {nameTag:"textarea", id:"",value:"", autofocus:["false","true"],disabled:["false","true"], placeholder:"", name:"", rows:0, wrap:0 },
        {nameTag:"select", id:"",multiple:["false","true"], autofocus:["false","true"],disabled:["false","true"],name:"",options: ["",""]},
        {nameTag:"radio", id:"", name:"",checked:["false","true"],value:"",disabled:""},
        {nameTag:"checkbox", id:"", name:"",checked:["false","true"],value:"",disabled:""},
        {nameTag:"div", id:"", name:"",checked:["false","true"],value:"",disabled:""}
    ];
 
    useEffect(() => {
        setOptions([]);
        const element = findElementNode();
        if(element !== undefined && element.props.children.type === "select"){
            for(let i =0; i<2; i++){
                const option = document.createElement("option");
                option.innerText = `select${i}`;
                option.value = `select${i}`
                setOptions([...options,option]);
            }
        }
    },[props]);

    const newAtribute = (key,value) => {
        setNewAttributes({
            ...newattributes,
            [key]:value,
        }) 
    }

    const newAtributeSelect = (key,value,index) => {
        const newItem = [...options];
        newItem[index].value = value;
        newItem[index].innerText = value;
        console.log(newItem[index].innerText);
        setOptions(newItem);
    }

    const showInputAtribute = (key,index) => {
        return (
            <div key={index}>
                <p>{key}</p>
                <input  type="text"  onChange={((e) => {newAtribute(key,e.target.value)})}/>
            </div>
        )
    }

    const showSelectAtribute =  (key,value,index) => {
        if( key === "options" ){
            return (
                <div key={index}>
                    {
                        options.map((e, index) => {
                            return (
                                <div key={"options"+index}>
                                    <p>{ "Option " + index }</p>
                                    <input type="text" value={options[index].value} onChange={((e) => {newAtributeSelect(key,e.target.value,index)})}/>
                                </div>
                            )
                        })
                    } 
                </div>
            )
        }

        return ( 
            <div key={uuid()}>
                <p>{key}</p>
                <select name={key} onChange={(e) => {newAtribute(key,e.target.value) }}>
                    {
                        value.map((e, keyOption) => {
                            return <option key={uuid()} value={e}>{e}</option>
                        })
                    }
                </select>
            </div>
        )
    }

    const whitchElement = (attributeTagName,elementTagName) => {
        if(elementTagName === "button" || elementTagName === "text" || elementTagName === "textarea"){
            return  attributeTagName === elementTagName;
        } 
        return attributeTagName === elementTagName;    
    }

    const addItem = () => {
        setOptions([...options,document.createElement("option")]);
    }

    const findElementNode = () => {
       return props.domTree.find(el => el.props.className === props.elementId);
    }

    const addAtribute = () => {
        const res = findElementNode();

        if( res === undefined ) {
            return null;
        }

        const result =  attributes.find(el => {
            if( res.props.children.type !== undefined ) {
                return whitchElement(el.nameTag,res.props.children.type); 
            } else if( res.props.children.type === undefined ) {
                return whitchElement(el.nameTag,res.props.children[0].type);  
            } else {
                return whitchElement(el.nameTag,res.props.children.props.type)
            }
        })
       
        return (
            <div>
                {
                    Object.entries(result).map(([key,value],index) => {
                        if(key === "nameTag") {
                            return (
                                <p key={uuid()}>{key +" "+ value}</p>
                            )
                        }

                        if(Array.isArray(result[key])){
                            return showSelectAtribute(key,value,index);
                        }

                        return showInputAtribute(key,index);
                    })
                }
                {result.nameTag === "select" ? <button onClick={addItem}>add</button> : null}
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
                    <button onClick={()=> {props.save(newattributes,props.elementId,options) }}>save</button>
                    <button onClick={props.openCloseModule}>close</button>
                </div>    
        </Modal>
    );
    
}
export default Module;