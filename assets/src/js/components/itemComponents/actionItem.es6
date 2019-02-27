import React from 'react';
import { render } from 'react-dom';

export default class ActionItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            item:
                <li id="speed-item"> <div id="actionType" className={this.props.type}> </div> <p> {this.props.title} </p> <div id="buttons"> <button className="edit" onClick={() => this.props.modAction(this.props.id, this.props.type)}></button>  <button className="remove" onClick={() => this.props.remAction(this.props.id, this.props.type, this.props.title)}></button> </div> </li>
        }
    }

    render(){
        console.log(this.props.type)
        return this.state.item;
    };
}
