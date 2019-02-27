import React from 'react';
import { render } from 'react-dom';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {AutoSizer} from 'react-virtualized';

export default class Preview extends React.Component{
    constructor(props){
        super(props);

        this.style = {
            blackWhite: {
                container: {
                    width: 360,
                    backgroundColor: "white",
                    padding: 15,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderTopColor: "black",
                    boxSizing: "border-box"
                },
                sect: {
                    color: "black",
                    fontSize: 14,
                },
                sect2: {
                    color: "black",
                    fontSize: 14
                },
                sectP: {
                    margin: 0,
                    marginBottom: 5
                },
                headingOne: {
                    fontSize: 28,
                    lineHeight: 1.1,
                    margin: 0,
                    marginBottom: 5,
                    fontFamily: 'Crimson Text',
                },
                headingTwo: {
                    fontSize: 20,
                    margin: 0,
                    fontFamily: 'Crimson Text'
                },
                subHeading: {
                    fontSize: 14,
                    margin: 0,
                    fontWeight: "italic"
                },
                ruler: {
                    one: {
                        width: 320,
                        height: 4,
                        backgroundImage: "url(./assets/src/img/ruler1.svg)",
                        backgroundSize: "cover",
                        marginTop: 10,
                        marginBottom: 10,
                    },
                    two: {
                        borderStyle: "solid",
                        borderWidth: 0.5,
                        borderColor: "black"
                    }
                }
            },
            original: {
                container: {
                    width: 360,
                    backgroundColor: "#fdf1dc",
                    padding: 15,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderTopColor: "black",
                    boxSizing: "border-box"
                },
                sect: {
                    color: "#922610",
                    fontSize: 14,
                },
                sect2: {
                    color: "black",
                    fontSize: 14,
                },
                sectP: {
                    margin: 0,
                    marginBottom: 5
                },
                headingOne: {
                    fontSize: 28,
                    lineHeight: 1.1,
                    margin: 0,
                    marginBottom: 5,
                    fontFamily: 'Crimson Text',
                    color: "#922610"
                },
                headingTwo: {
                    fontSize: 20,
                    margin: 0,
                    fontFamily: 'Crimson Text',
                    color: "#922610"
                },
                subHeading: {
                    fontSize: 14,
                    margin: 0,
                    fontWeight: "italic"
                },
                ruler: {
                    one: {
                        width: 320,
                        height: 4,
                        backgroundImage: "url(./assets/src/img/ruler2.svg)",
                        backgroundSize: "cover",
                        marginTop: 10,
                        marginBottom: 10,
                    },
                    two: {
                        borderStyle: "solid",
                        borderWidth: 0.5,
                        borderColor: "#922610"
                    }
                }
            }
        }

        this.misc = {
            abilities: {
                padding: 0,
                listStyle: "none",

                li: {
                    margin: 20
                }
            }
        }

        this.cell = {
            width: 83.333,
            margin: 0,
            textAlign: "center"
        }

        this.state = {
            style: this.style.blackWhite
        }

        this.currentStyle = this.style.blackWhite;

    }

    componentDidMount(){
        this.updateComp();
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.updateComp();
        }
    }

    updateComp(){
        let saveString, resistString, immunityString, vulnerableString, conditionString, sensesString, actionsString, actionsRuler, reactionsString, reactionsRuler, legendaryRuler, legendaryString, skillString, langstring = ""
        if(this.props.save != ""){
            saveString = <p style={this.state.style.sectP}> <b style={this.state.style.sectP}> Saving Throws </b> {this.props.save} </p>
        }
        if(this.props.damRes.length > 0){
            resistString = <p style={this.state.style.sectP}> <b> Damage Resistances </b> {this.props.damRes.join(", ")} </p>;
        }
        if(this.props.damImm.length > 0){
            immunityString = <p style={this.state.style.sectP}> <b> Damage Immunities </b> {this.props.damImm.join(", ")} </p>;
        }
        if(this.props.damVul.length > 0){
            vulnerableString = <p style={this.state.style.sectP}> <b> Damage Vulnerabilities </b> {this.props.damVul.join(", ")} </p>;
        }
        if(this.props.conditions.length > 0){
            conditionString = <p style={this.state.style.sectP}> <b> Condition Immunities </b> {this.props.conditions.join(", ")} </p>;
        }
        if(this.props.senses.length > 0){
            sensesString = <p style={this.state.style.sectP}> <b> Senses </b> {this.props.senses} </p>;
        }
        if(this.props.actions != ""){
            actionsString = <h2 style={this.state.style.headingTwo}> Actions </h2>;
            actionsRuler = <div style={this.state.style.ruler.two} />;
        } else {
            actionsString = "";
            actionsRuler = "";
        }
        if(this.props.reactions != ""){
            reactionsString = <h2 style={this.state.style.headingTwo}> Reactions </h2>;
            reactionsRuler = <div style={this.state.style.ruler.two} />;
        } else {
            reactionsString = "";
            reactionsRuler = "";
        }
        if(this.props.legendaries != ""){
            legendaryString = <h2 style={this.state.style.headingTwo}> Legendary Actions </h2>;
            legendaryRuler = <div style={this.state.style.ruler.two} />;
        } else {
            legendaryString = "";
            legendaryRuler = "";
        }
        if(this.props.skill != ""){
            skillString = <p style={this.state.style.sectP}> <b style={this.state.style.sectP}> Skills </b> {this.props.skill} </p>;
        } else {
            skillString = "";
        }
        if(this.props.langs != ""){
            langstring = <p style={this.state.style.sectP}> <b> Languages </b> {this.props.langs} </p>;
        } else {
            langstring = "";
        }

        let html = (
            <div id="preview" style={this.state.style.container}>
                <h1 id="title" style={this.state.style.headingOne}> {this.props.name} </h1>
                <p id="subtitle" style={this.state.style.subHeading}> <i> {this.props.size} {this.props.type}, {this.props.alignment} </i> </p>
                <div style={this.state.style.ruler.one} />
                <section style={this.state.style.sect}>
                    <p style={this.state.style.sectP}> <b> Armor Class </b> {this.props.armorClass} {this.props.armorNotes} </p>
                    <p style={this.state.style.sectP}> <b> Hit Points </b> {this.props.hitPoints}</p>
                    <p style={this.state.style.sectP}> <b> Speed </b> {this.props.speeds}</p>
                </section>
                <div style={this.state.style.ruler.one} />
                <table style={this.state.style.sect}>
                    <tbody>
                        <tr>
                            <th style={this.cell}> STR </th>
                            <th style={this.cell}> DEX </th>
                            <th style={this.cell}> CON </th>
                            <th style={this.cell}> INT </th>
                            <th style={this.cell}> WIS </th>
                            <th style={this.cell}> CHA </th>
                        </tr>
                        <tr>
                            <td style={this.cell}> {this.props.statStr} {this.props.modStr} </td>
                            <td style={this.cell}> {this.props.statDex} {this.props.modDex} </td>
                            <td style={this.cell}> {this.props.statCon} {this.props.modCon} </td>
                            <td style={this.cell}> {this.props.statInt} {this.props.modInt} </td>
                            <td style={this.cell}> {this.props.statWis} {this.props.modWis} </td>
                            <td style={this.cell}> {this.props.statCha} {this.props.modCha} </td>
                        </tr>
                    </tbody>
                </table>
                <div style={this.state.style.ruler.one} />
                <section style={this.state.style.sect}>
                    {saveString}
                    {skillString}
                    {resistString}
                    {immunityString}
                    {vulnerableString}
                    {conditionString}
                    {sensesString}
                    {langstring}
                    <p style={this.state.style.sectP}> <b> Challenge </b> {this.props.challenge} {"(" + this.props.chalXP + " XP)" } </p>
                </section>
                <div style={this.state.style.ruler.one} />
                <section style={this.state.style.sect2}>
                    <ul style={this.misc.abilities}>
                        {this.props.ability}
                    </ul>
                    {actionsString}
                    {actionsRuler}
                    <ul style={this.misc.abilities}>
                        {this.props.actions}
                    </ul>
                    {reactionsString}
                    {reactionsRuler}
                    <ul style={this.misc.abilities}>
                        {this.props.reactions}
                    </ul>
                    {legendaryString}
                    {legendaryRuler}
                    <ul style={this.misc.abilities}>
                        {this.props.legendaries}
                    </ul>
                </section>
            </div>
        )
        this.setState({
            html: html
        })
    }

    changeStyle(style){
        switch(style){
            case "bandw":
                this.setState({
                    style: this.style.blackWhite
                })
                this.updateComp();
                break;
            case "dandori":
                this.setState({
                    style: this.style.original
                })
                break;
        }
    }

    printPDF(name){
        var html2pdf = require('html2pdf.js');
        const element = document.getElementById('preview');
        const opt = {
          margin:       20,
          filename:     name + '.pdf',
          image:        { type: 'jpg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'mm', orientation: 'portrait' },
          allowTaint:   true
        };
        html2pdf().from(element).set(opt).save();
    }

    printJPG(name){
        html2canvas(document.querySelector("#placeholder").querySelector("#preview")).then(function(canvas) {
            canvas.toBlob(function(blob) {
                saveAs(blob, name + ".jpg");
            });
        });
    }

    printPNG(name){
        html2canvas(document.querySelector("#placeholder").querySelector("#preview")).then(function(canvas) {
            canvas.toBlob(function(blob) {
                saveAs(blob, name + ".jpg");
            });
        });
    }

    render(){
        return (
            <div id="preview-frame" style={{display: "flex", flexDirection: "column"}}>
                <div id="tool-bar">
                    <select onChange={e => this.changeStyle(e.target.value)}>
                        <option value="bandw"> Black and White </option>
                        <option value="dandori"> Colored </option>
                    </select>
                    <button onClick={() => this.printPDF(this.props.name)}> PDF </button>
                    <button onClick={() => this.printJPG(this.props.name)}> JPG </button>
                    <button onClick={() => this.printPNG(this.props.name)}> PNG </button>
                </div>
                <div id="viewer">
                    <div id="top" style={{width: "100%", height: "calc(100% - 40px)"}}>
                        <AutoSizer>
                            {(({width, height}) => width === 0 || height === 0 ? null : (
                                <ReactSVGPanZoom width={width} height={height} background={"#566573"} miniaturePosition="none">
                                    <sgv width={width} height={height}>
                                        <rect fill="#566573" stroke="#566573" strokeWidth="20" width={width} height={height}> </rect>
                                        <foreignObject x={width/3} y={100} width={width} height={height}>
                                            {this.state.html}
                                        </foreignObject>
                                    </sgv>
                                </ReactSVGPanZoom>
                            ))}
                        </AutoSizer>
                    </div>
                    <div id="placeholder">
                        {this.state.html}
                    </div>
                </div>
            </div>
        );
    };
}
