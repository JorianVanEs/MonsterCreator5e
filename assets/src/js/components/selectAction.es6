import React from 'react';
import { render } from 'react-dom';

let uniqid = require('uniqid');

export default class SelectItem extends React.Component{
    constructor(){
        super();

        this.state = {
            selected: <div onClick={() => this.togglePopup()} id="selection"> <div id="icon" className="regular"> </div> <p> Regular Action </p> <div id="selectIcon"> </div> </div>,
            dropDown: "",
            choices: ["Attack", "Reaction", "Legendary"]
        }

        this.popup = {
            active: false 
        }
    }

    togglePopup(){
        this.popup.active = !this.popup.active;
        let choices = this.state.choices.map(element => {
            if(element == "Reaction"){
                return <li key={uniqid()} onClick={() => this.selectItem(element)}> <div id="icon" className={element.toLowerCase()}> </div> {element} </li>;
            } else {
                return <li key={uniqid()} onClick={() => this.selectItem(element)}> <div id="icon" className={element.toLowerCase()}> </div> {element + " Action"} </li>;
            }
        })
        if(this.popup.active){
            this.setState({
                dropDown:
                    <ul id="choices">
                        {choices}
                    </ul>
            })
        } else {
            this.setState({
                dropDown: ""
            })
        }
    }

    selectItem(choice){
        this.togglePopup();
        switch(choice){
            case "Regular":
                this.setState({
                    selected: <div onClick={() => this.togglePopup()} id="selection"> <div id="icon" className="regular"> </div> <p> Regular Action </p> <div id="selectIcon"> </div> </div>,
                    choices: ["Attack", "Reaction", "Legendary"]
                })
                this.props.selectAction("regular");
                break;
            case "Attack":
                this.setState({
                    selected: <div onClick={() => this.togglePopup()} id="selection"> <div id="icon" className="attack"> </div> <p> Attack Action </p> <div id="selectIcon"> </div> </div>,
                    choices: ["Regular", "Reaction", "Legendary"]
                })
                this.props.selectAction("attack");
                break;
            case "Reaction":
                this.setState({
                    selected: <div onClick={() => this.togglePopup()} id="selection"> <div id="icon" className="reaction"> </div> <p> Reaction </p> <div id="selectIcon"> </div> </div>,
                    choices: ["Regular", "Attack", "Legendary"]
                })
                this.props.selectAction("reaction");
                break;
            case "Legendary":
                this.setState({
                    selected: <div onClick={() => this.togglePopup()} id="selection"> <div id="icon" className="legendary"> </div> <p> Legendary Action </p> <div id="selectIcon"> </div> </div>,
                    choices: ["Regular", "Attack", "Reaction"]
                })
                this.props.selectAction("legendary");
                break;
        }
    }

    render(){
        return (
            <div id="selector">
                {this.state.selected}
                {this.state.dropDown}
            </div>
        );
    };
}
