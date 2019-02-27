var html2pdf = require('html2pdf.js');

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header.es6';
import Body from './components/body.es6';

class App extends React.Component{
    render(){
        return(
            <div id="page">
                <Header />
                <Body />
            </div>
        )
    };
};

ReactDOM.render(<App />, document.querySelector('#app'));
