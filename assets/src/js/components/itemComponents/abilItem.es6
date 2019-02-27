import React from 'react';
import { render } from 'react-dom';

export default class AbilItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            item:
                <li id="speed-item"> <p> {this.props.title} </p> <div id="buttons"> <button className="edit" onClick={() => this.props.modAbil(this.props.id)}></button> <button className="remove" onClick={() => this.props.remAbil(this.props.id)}></button> </div> </li>
        }
    }

    render(){
        return this.state.item;
    };
}
