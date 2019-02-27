import React from 'react';
import { render } from 'react-dom';

export default class DamItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            item:
                <li id="speed-item"> <div id="damType" className={this.props.type}> </div> <p> {this.props.damage} </p> <div id="buttons"> <button className="remove" onClick={() => this.props.remDamage(this.props.type, this.props.damage, this.props.id)}></button> </div> </li>
        }
    }

    render(){
        return this.state.item;
    };
}
