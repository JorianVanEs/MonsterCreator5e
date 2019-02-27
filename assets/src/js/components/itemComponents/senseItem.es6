import React from 'react';
import { render } from 'react-dom';

export default class SenseItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            item:
                <li id="speed-item2"> <p> {this.props.distance} ft. {this.props.type} </p> <div id="buttons"> <button className="remove" onClick={() => this.props.remSense(this.props.id)}></button> </div> </li>
        }
    }

    render(){
        return this.state.item;
    };
}
