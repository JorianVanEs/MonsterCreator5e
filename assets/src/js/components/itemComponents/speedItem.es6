import React from 'react';
import { render } from 'react-dom';

export default class SpeedItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            item:
                <li id="speed-item"> <p> {this.props.distance} ft. {this.props.type} </p> <div id="buttons"> <button className="remove" onClick={() => this.props.remSpeed(this.props.id)}></button> </div> </li>
        }
    }

    render(){
        return this.state.item;
    };
}
