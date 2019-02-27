import React from 'react';
import { render } from 'react-dom';

import Preview from './preview.es6';
import SpeedItem from './itemComponents/speedItem.es6';
import DamItem from './itemComponents/damItem.es6';
import ConItem from './itemComponents/conItem.es6';
import SenseItem from './itemComponents/senseItem.es6';
import AbilItem from './itemComponents/abilItem.es6';
import ActionItem from './itemComponents/actionItem.es6';
import SelectAction from './selectAction.es6'

let uniqid = require('uniqid');

export default class Body extends React.Component{
    constructor(){
        super();

        this.state = {
            monsterName: "Name",
            monsterSize: "Size",
            monsterType: "type",
            monsterAlignment: "alignment",

            monsterAC: "",
            monsterACNotes: "",
            monsterHealth: "",
            hitDiceAmount: 0,
            hitDiceType: "d4",
            hitDiceModifier: 0,
            monsterSpeed: 0,
            moveType: "walk",
            moveSpeed: 0,
            speedItems: [],
            speedList: [],
            speedCompList: [],
            speedString: "",
            savingThrowString: "",
            skillString: "",
            damageType: "Resistance",
            damage: "acid",
            resistArray: [],
            immuneArray: [],
            vulnerableArray: [],
            damageCompArray: [],
            damageArray: [],
            conditionType: "blinded",
            conditionArray: [],
            conditionCompArray: [],
            language: "Common",
            langArray: [],
            langCompArray: [],
            monsterChallenge: 0,
            challengeXP: 0,
            challengeString: "0",
            profBonus: 0,
            senseArray: [],
            senseCompArray: [],
            senseType: "blindsight",
            senseDistance: 0,
            senseString: "",

            statMod: 0,
            strStat: 0,
            strMod: "(0)",
            strString: "",
            strRawMod: 0,
            dexStat: 0,
            dexMod: "(0)",
            dexRawMod: 0,
            conStat: 0,
            conMod: "(0)",
            conRawMod: 0,
            intStat: 0,
            intMod: "(0)",
            intRawMod: 0,
            wisStat: 0,
            wisMod: "(0)",
            wisRawMod: 0,
            chaStat: 0,
            chaMod: "(0)",
            chaRawMod: 0,

            abilityTitle: "regulars",
            abilityDesc: "",
            abilityString: "",
            abilityArray: [],
            abilityCompArray: [],

            actionType: "regular",
            actionTitle: "",
            actionDesc: "",
            actionArray: [],
            actionString: "",
            reactionArray: [],
            reactionString: "",
            legendaryArray: [],
            legendaryString: [],
            actionsArray: [],
            actionsCompArray: [],

            pop: ""
        }

        this.savingThrows = {
            strength: false,
            dexterety: false,
            constitution: false,
            intellegence: false,
            wisdom: false,
            charisma: false
        }

        this.skills = {
            acrobatics: false,
            animalHandling: false,
            arcana: false,
            athletics: false,
            deception: false,
            history: false,
            insight: false,
            intimidation: false,
            investigation: false,
            medicine: false,
            nature: false,
            perception: false,
            perform: false,
            persuation: false,
            religion: false,
            sleightOfHand: false,
            stealth: false,
            survival: false
        }

        this.attacks = {
            name: "",
            type: "Melee Weapon Attack",
            modifier: "Strenght",
            reach: "Reach",
            reachDistance: "",
            targeting: "One Target",
            diceAmount: 0,
            diceType: "D4",
            damage: "acid"
        }

        this.popup = {
            active: false,
            deleteConf: false
        }
    }

    calculateHealthAverage(hitDiceAmount, hitDiceType, hitDiceModifier){
        let diceModifier = 1;
        let addModifier;

        if(hitDiceModifier != null){
            let modifier = hitDiceModifier.substr(0,1);
            let amount = hitDiceModifier.substr(1, hitDiceModifier.lenght);
            if(modifier == "+"){
                addModifier = parseInt(amount);
            } else if(modifier == "-"){
                addModifier = -parseInt(amount);
            } else if(modifier != "+" || modifier != "-"){
                addModifier = 0;
                document.querySelector("#healthModifier").value = "";
            }
        } else {
            addModifier = 0;
        }

        switch(hitDiceType){
            case "d4":
                diceModifier = 2.5;
                break;
            case "d6":
                diceModifier = 3.5;
                break;
            case "d8":
                diceModifier = 4.5;
                break;
            case "d10":
                diceModifier = 5.5;
                break;
            case "d12":
                diceModifier = 6.5;
                break;
        }

        this.setState({
            monsterHealth: hitDiceAmount * Math.round(diceModifier) + addModifier
        })
    }

    calculateHealthRoll(hitDiceAmount, hitDiceType, hitDiceModifier){
        let diceRoll = 1;
        let addModifier;

        if(hitDiceModifier != ""){
            let modifier = hitDiceModifier.substr(0,1);
            let amount = hitDiceModifier.substr(1, hitDiceModifier.lenght);
            if(modifier == "+"){
                addModifier = parseInt(amount);
            } else if(modifier == "-"){
                addModifier = -parseInt(amount);
            } else if(modifier != "+" || modifier != "-"){
                addModifier = 0;
                document.querySelector("#healthModifier").value = "";
            }
        } else {
            addModifier = 0;
        }

        switch(hitDiceType){
            case "d4":
                for(let i = 0; i < hitDiceAmount; i++){
                    diceRoll += Math.floor(Math.random() * 4 + 1);
                }
                break;
            case "d6":
                for(let i = 0; i < hitDiceAmount; i++){
                    diceRoll += Math.floor(Math.random() * 6 + 1);
                }
                break;
            case "d8":
                for(let i = 0; i < hitDiceAmount; i++){
                    diceRoll += Math.floor(Math.random() * 8 + 1);
                }
                break;
            case "d10":
                for(let i = 0; i < hitDiceAmount; i++){
                    diceRoll += Math.floor(Math.random() * 10 + 1);
                }
                break;
            case "d12":
                for(let i = 0; i < hitDiceAmount; i++){
                    diceRoll += Math.floor(Math.random() * 12 + 1);
                }
                break;
        }

        this.setState({monsterHealth: diceRoll + addModifier})
    }

    updateStat(e){
        let modifier;
        let rawMod;
        let saveString;

        if(e.target.value == 1){
            modifier = "(-" + 5  + ")";
            rawMod = -5;
        }
        else if(e.target.value > 1 && e.target.value < 4){
            modifier = "(-" + 4 + ")";
            rawMod = -4;
        }
        else if(e.target.value > 3 && e.target.value < 6){
            modifier = "(-" + 3 + ")";
            rawMod = -3;
        }
        else if(e.target.value > 5 && e.target.value < 8){
            modifier = "(-" + 2 + ")";
            rawMod = -2;
        }
        else if(e.target.value > 7 && e.target.value < 10){
            modifier = "(-" + 1 + ")";
            rawMod = -1;
        }
        else if(e.target.value > 9 && e.target.value < 12){
            modifier = "(" + 0 + ")";
            rawMod = 0;
        }
        else if(e.target.value > 11 && e.target.value < 14){
            modifier = "(+" + 1 + ")";
            rawMod = 1;
        }
        else if(e.target.value > 13 && e.target.value < 16){
            modifier = "(+" + 2 + ")";
            rawMod = 2;
        }
        else if(e.target.value > 15 && e.target.value < 18){
            modifier = "(+" + 3 + ")";
            rawMod = 3;
        }
        else if(e.target.value > 17 && e.target.value < 20){
            modifier = "(+" + 4 + ")";
            rawMod = 4;
        }
        else if(e.target.value > 19 && e.target.value < 22){
            modifier = "(+" + 5 + ")";
            rawMod = 5;
        }
        else if(e.target.value > 21 && e.target.value < 24){
            modifier = "(+" + 6 + ")";
            rawMod = 6;
        }
        else if(e.target.value > 23 && e.target.value < 26){
            modifier = "(+" + 7 + ")";
            rawMod = 7;
        }
        else if(e.target.value > 25 && e.target.value < 28){
            modifier = "(+" + 8 + ")";
            rawMod = 8;
        }
        else if(e.target.value > 27&& e.target.value < 30){
            modifier = "(+" + 9 + ")";
            rawMod = 9;
        }
        else if(e.target.value > 29&& e.target.value < 31){
            modifier = "(+" + 10 + ")";
            rawMod = 10;
        }
        else if(e.target.value > 30 || e.target.value < 1 || e.target.value == ""){
            e.target.value = "";
            modifier = "(" + 0 + ")";
            rawMod = 0;
        }

        switch(e.target.getAttribute('id')) {
            case "strAmount":
                this.setState({
                    strStat: e.target.value,
                    strMod: modifier,
                    strRawMod: rawMod
                });
                break;
            case "dexAmount":
                this.setState({
                    dexStat: e.target.value,
                    dexMod: modifier,
                    dexRawMod: rawMod
                });
                break;
            case "conAmount":
                this.setState({
                    conStat: e.target.value,
                    conMod: modifier,
                    conRawMod: rawMod
                });
                break;
            case "intAmount":
                this.setState({
                    intStat: e.target.value,
                    intMod: modifier,
                    intRawMod: rawMod
                });
                break;
            case "wisAmount":
                this.setState({
                    wisStat: e.target.value,
                    wisMod: modifier,
                    wisRawMod: rawMod
                });
                break;
            case "chaAmount":
                this.setState({
                    chaStat: e.target.value,
                    chaMod: modifier,
                    chaRawMod: rawMod
                });
                break;
        }

        this.createSaveString();
        this.createSkillString();
        this.createActionString(this.state.actionArray);
    }

    addSpeed(speedType, speedDistance){
        let arr = Object.assign(this.state.speedList);
        if(speedDistance != ""){
            arr.push({type: speedType, distance: speedDistance});
            this.setState({
                speedList: arr,
                speedCompList: arr.map((item, index) => {
                    return <SpeedItem key={uniqid()} id={index} type={item.type} distance={item.distance} remSpeed={x => {this.remSpeed(x)}} />;
                })
            })
        }
        this.createSpeedString(arr);
    }

    remSpeed(id){
        let arr = Object.assign(this.state.speedList);
        if(arr.length > 1){
            arr.splice(id, 1);
            this.setState({
                speedList: arr,
                speedCompList: arr.map((item, index) => {
                    return <SpeedItem key={uniqid()} id={index} type={item.type} distance={item.distance} remSpeed={x => {this.remSpeed(x)}} />;
                })
            })
        } else {
            arr = [];
            this.setState({
                speedList: [],
                speedCompList: []
            })
        }
        this.createSpeedString(arr);
    }

    createSpeedString(arr){
        this.setState({
            speedString: arr.map(element => {
                if(element.type == "walk"){
                     return element.distance + " ft.";
                } else {
                    return element.type + " " + element.distance + " ft.";
                }
            }).join(", ")
        })
    }

    createSaveString(){
        setTimeout(() => {
            let strStr, dexStr, conStr, intStr, wisStr, chaStr, stringSave;
            let stringArray = [];
            if(this.savingThrows.strength == true){
                if(this.state.strRawMod + 2 > -1){
                    strStr = "Str (+" + (this.state.strRawMod + this.state.profBonus) + ")";
                } else {
                    strStr = "Str (" + (this.state.strRawMod + this.state.profBonus) + ")";
                }
                stringArray.push(strStr);
            }
            if(this.savingThrows.dexterety == true){
                if(this.state.dexRawMod + 2 > -1){
                    dexStr = "Dex (+" + (this.state.dexRawMod + this.state.profBonus) + ")";
                } else {
                    dexStr = "Dex (" + (this.state.dexRawMod + this.state.profBonus) + ")";
                }
                stringArray.push(dexStr);
            }
            if(this.savingThrows.constitution == true){
                if(this.state.conRawMod + 2 > -1){
                    conStr = "Con (+" + (this.state.conRawMod + this.state.profBonus) + ")";
                } else {
                    conStr = "Con (" + (this.state.conRawMod + this.state.profBonus) + ")";
                }
                stringArray.push(conStr);
            }
            if(this.savingThrows.intellegence == true){
                if(this.state.intRawMod + 2 > -1){
                    intStr = "Int (+" + (this.state.intRawMod + this.state.profBonus) + ")";
                } else {
                    intStr = "Int (" + (this.state.intRawMod + this.state.profBonus) + ")";
                }
                stringArray.push(intStr);
            }
            if(this.savingThrows.wisdom == true){
                if(this.state.wisRawMod + 2 > -1){
                    wisStr = "Wis (+" + (this.state.wisRawMod + this.state.profBonus) + ")";
                } else {
                    wisStr = "Wis (" + (this.state.wisRawMod + this.state.profBonus) + ")";
                }
                stringArray.push(wisStr);
            }
            if(this.savingThrows.charisma == true){
                if(this.state.chaRawMod + 2 > -1){
                    chaStr = "Cha (+" + (this.state.chaRawMod + this.state.profBonus) + ")";
                } else {
                    chaStr = "Cha (" + (this.state.chaRawMod + this.state.profBonus) + ")";
                }
                stringArray.push(chaStr);
            }
            stringSave = stringArray.join(", ")
            this.setState({
                savingThrowString: stringSave
            })
        }, 250)
    }

    createSkillString(){
        setTimeout(() => {
            let acrStr, ahStr, arcStr, athStr, decStr, hisStr, insStr, intStr, invStr, medStr, natStr, perStr, prfStr, psnStr, relStr, sohStr, steStr, surStr, stringSkill;
            let stringArray = [];
            if(this.skills.acrobatics == true){
                if(this.state.dexRawMod + 2 > -1){
                    acrStr = "Acrobatics (+" + (this.state.dexRawMod + this.state.profBonus) + ")"
                } else {
                    acrStr = "Acrobatics (" + (this.state.dexRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(acrStr);
            }
            if(this.skills.animalHandling == true){
                if(this.state.wisRawMod + 2 > -1){
                    ahStr = "Animal Handling (+" + (this.state.wisRawMod + this.state.profBonus) + ")"
                } else {
                    ahStr = "Animal Handling (" + (this.state.wisRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(ahStr);
            }
            if(this.skills.arcana == true){
                if(this.state.intRawMod + 2 > -1){
                    arcStr = "Arcana (+" + (this.state.intRawMod + this.state.profBonus) + ")"
                } else {
                    arcStr = "Arcana (" + (this.state.intRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(arcStr);
            }
            if(this.skills.athletics == true){
                if(this.state.strRawMod + 2 > -1){
                    athStr = "Athlethics (+" + (this.state.strRawMod + this.state.profBonus) + ")"
                } else {
                    athStr = "Athlethics (" + (this.state.strRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(athStr);
            }
            if(this.skills.deception == true){
                if(this.state.chaRawMod + 2 > -1){
                    decStr = "Deception (+" + (this.state.chaRawMod + this.state.profBonus) + ")"
                } else {
                    decStr = "Deception (" + (this.state.chaRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(decStr);
            }
            if(this.skills.history == true){
                if(this.state.intRawMod + 2 > -1){
                    hisStr = "History (+" + (this.state.intRawMod + this.state.profBonus) + ")"
                } else {
                    hisStr = "History (" + (this.state.intRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(hisStr);
            }
            if(this.skills.insight == true){
                if(this.state.wisRawMod + 2 > -1){
                    insStr = "Insight (+" + (this.state.wisRawMod + this.state.profBonus) + ")"
                } else {
                    insStr = "Insight (" + (this.state.wisRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(insStr);
            }
            if(this.skills.intimidation == true){
                if(this.state.chaRawMod + 2 > -1){
                    intStr = "Intimidation (+" + (this.state.chaRawMod + this.state.profBonus) + ")"
                } else {
                    intStr = "Intimidation (" + (this.state.chaRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(intStr);
            }
            if(this.skills.investigation == true){
                if(this.state.intRawMod + 2 > -1){
                    invStr = "Investigation (+" + (this.state.intRawMod + this.state.profBonus) + ")"
                } else {
                    invStr = "Investigation (" + (this.state.intRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(invStr);
            }
            if(this.skills.medicine == true){
                if(this.state.wisRawMod + 2 > -1){
                    medStr = "Medicine (+" + (this.state.wisRawMod + this.state.profBonus) + ")"
                } else {
                    medStr = "Medicine (" + (this.state.wisRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(medStr);
            }
            if(this.skills.nature == true){
                if(this.state.intRawMod + 2 > -1){
                    natStr = "Nature (+" + (this.state.intRawMod + this.state.profBonus) + ")"
                } else {
                    natStr = "Nature (" + (this.state.intRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(natStr);
            }
            if(this.skills.perception == true){
                if(this.state.wisRawMod + 2 > -1){
                    perStr = "Perception (+" + (this.state.wisRawMod + this.state.profBonus) + ")"
                } else {
                    perStr = "Perception (" + (this.state.wisRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(perStr);
            }
            if(this.skills.perform == true){
                if(this.state.chaRawMod + 2 > -1){
                    prfStr = "Performance (+" + (this.state.chaRawMod + this.state.profBonus) + ")"
                } else {
                    prfStr = "Performance (" + (this.state.chaRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(prfStr);
            }
            if(this.skills.persuation == true){
                if(this.state.chaRawMod + 2 > -1){
                    psnStr = "Persuasion (+" + (this.state.chaRawMod + this.state.profBonus) + ")"
                } else {
                    psnStr = "Persuasion (" + (this.state.chaRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(psnStr);
            }
            if(this.skills.religion == true){
                if(this.state.intRawMod + 2 > -1){
                    relStr = "Religion (+" + (this.state.intRawMod + this.state.profBonus) + ")"
                } else {
                    relStr = "Religion (" + (this.state.intRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(relStr);
            }
            if(this.skills.sleightOfHand == true){
                if(this.state.dexRawMod + 2 > -1){
                    sohStr = "Sleight of Hand (+" + (this.state.dexRawMod + this.state.profBonus) + ")"
                } else {
                    sohStr = "Sleight of Hand (" + (this.state.dexRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(sohStr);
            }
            if(this.skills.stealth == true){
                if(this.state.dexRawMod + 2 > -1){
                    steStr = "Stealth (+" + (this.state.dexRawMod + this.state.profBonus) + ")"
                } else {
                    steStr = "Stealth (" + (this.state.dexRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(steStr);
            }
            if(this.skills.survival == true){
                if(this.state.wisRawMod + 2 > -1){
                    surStr = "Survival (+" + (this.state.wisRawMod + this.state.profBonus) + ")"
                } else {
                    surStr = "Survival (" + (this.state.wisRawMod + this.state.profBonus) + ")"
                }
                stringArray.push(surStr);
            }
            stringSkill = stringArray.join(", ").toString()
            this.setState({
                skillString: stringSkill
            })
        }, 250)
    }

    addDamage(damType, damElem){
        let arr = [];
        let compArr = Object.assign(this.state.damageArray);
        if(damType == "Resistance"){
            arr = Object.assign(this.state.resistArray);
            arr.push(damElem);
            this.setState({
                resistArray: arr
            })
        } else if(damType == "Immunity"){
            arr = Object.assign(this.state.immuneArray);
            arr.push(damElem);
            this.setState({
                immuneArray: arr
            })
        } else if(damType == "Vulnerability"){
            arr = Object.assign(this.state.vulnerableArray);
            arr.push(damElem);
            this.setState({
                vulnerableArray: arr
            })
        }
        compArr.push({type: damType, damage: damElem});
        this.setState({
            damageArray: compArr,
            damageCompArray: compArr.map((item, index) => {
                return <DamItem key={uniqid()} id={index} type={item.type} damage={item.damage} remDamage={(x,y,z) => this.remDamage(x,y,z)} />;
            })
        })
    }

    remDamage(type, damage, id){
        let compArr = Object.assign(this.state.damageArray);
        let arr = [];
        let foundID;
        if(type == "Resistance"){
            arr = Object.assign(this.state.resistArray);
            foundID = arr.findIndex(item => {
                return item == damage;
            })
            arr.splice(foundID, 1);
            this.setState({
                resistArray: arr
            })
        }
        if(type == "Immunity"){
            arr = Object.assign(this.state.immuneArray);
            foundID = arr.findIndex(item => {
                return item == damage;
            })
            arr.splice(foundID, 1);
            this.setState({
                immuneArray: arr
            })
        }
        if(type == "Vulnerability"){
            arr = Object.assign(this.state.vulnerableArray);
            foundID = arr.findIndex(item => {
                return item == damage;
            })
            arr.splice(foundID, 1);
            this.setState({
                vulnerableArray: arr
            })
        }
        if(compArr.length > 1){
            compArr.splice(id, 1);
            this.setState({
                damageArray: compArr,
                damageCompArray: compArr.map((item, index) => {
                    return <DamItem key={uniqid()} id={index} type={item.type} damage={item.damage} remDamage={(x,y,z) => this.remDamage(x,y,z)} />;
                })
            })
        } else {
            this.setState({
                damageArray: [],
                damageCompArray: []
            })
        }
    }

    addCondition(type){
        let arr = Object.assign(this.state.conditionArray);
        arr.push(type);
        this.setState({
            conditionArray: arr,
            conditionCompArray: arr.map((item, index) => {
               return <ConItem key={uniqid()} type={item} id={index} remCon={x => this.remCondition(x)} />;
            })
        });
    }

    remCondition(id){
        let arr = Object.assign(this.state.conditionArray);
        arr.splice(id, 1);
        this.setState({
            conditionArray: arr,
            conditionCompArray: arr.map((item, index) => {
               return <ConItem key={uniqid()} type={item} id={index} remCon={x => this.remCondition(x)} />;
            })
        });
    }

    addLanguage(type){
        let arr = Object.assign(this.state.langArray);
        arr.push(type);
        this.setState({
            langArray: arr,
            langCompArray: arr.map((item, index) => {
               return <ConItem key={uniqid()} type={item} id={index} remCon={x => this.remLanguage(x)} />;
            })
        });
    }

    remLanguage(id){
        let arr = Object.assign(this.state.langArray);
        arr.splice(id, 1);
        this.setState({
            langArray: arr,
            langCompArray: arr.map((item, index) => {
               return <ConItem key={uniqid()} type={item} id={index} remCon={x => this.remLanguage(x)} />;
            })
        });
    }

    calculateXP(challenge){
        let exp = 0;
        let prof = 0;
        switch(challenge) {
            case "0":
                exp = 0;
                prof = 2;
                break;
            case "1/8":
                exp = 25;
                prof = 2;
                break;
            case "1/4":
                exp = 50;
                prof = 2;
                break;
            case "1/2":
                exp = 100;
                prof = 2;
                break;
            case "1":
                exp = 200;
                prof = 2;
                break;
            case "2":
                exp = 450;
                prof = 2;
                break;
            case "3":
                exp = 700;
                prof = 2;
                break;
            case "4":
                exp = 1100;
                prof = 2;
                break;
            case "5":
                exp = 1800;
                prof = 3;
                break;
            case "6":
                exp = 2300;
                prof = 3;
                break;
            case "7":
                exp = 2900;
                prof = 3;
                break;
            case "8":
                exp = 3900;
                prof = 3;
                break;
            case "9":
                exp = 5000;
                prof = 4;
                break;
            case "10":
                exp = 5900;
                prof = 4;
                break;
            case "11":
                exp = 7200;
                prof = 4;
                break;
            case "12":
                exp = 8400;
                prof = 4;
                break;
            case "13":
                exp = 10000;
                prof = 5;
                break;
            case "14":
                exp = 11500;
                prof = 5;
                break;
            case "15":
                exp = 13000;
                prof = 5;
                break;
            case "16":
                exp = 15000;
                prof = 5;
                break;
            case "17":
                exp = 18000;
                prof = 6;
                break;
            case "18":
                exp = 20000;
                prof = 6;
                break;
            case "19":
                exp = 22000;
                prof = 6;
                break;
            case "20":
                exp = 25000;
                prof = 6;
                break;
            case "21":
                exp = 33000;
                prof = 7;
                break;
            case "22":
                exp = 41000;
                prof = 7;
                break;
            case "23":
                exp = 50000;
                prof = 7;
                break;
            case "24":
                exp = 62000;
                prof = 7;
                break;
            case "25":
                exp = 75000;
                prof = 8;
                break;
            case "26":
                exp = 90000;
                prof = 8;
                break;
            case "27":
                exp = 105000;
                prof = 8;
                break;
            case "28":
                exp = 120000;
                prof = 8;
                break;
            case "29":
                exp = 135000;
                prof = 9;
                break;
            case "30":
                exp = 155000;
                prof = 9;
                break;
        }
        this.setState({
            challengeString: challenge,
            challengeXP: exp,
            profBonus: prof
        })

        this.createSaveString();
        this.createSkillString();
        this.createActionString(this.state.actionArray);
    }

    addSense(senseType, senseDistance){
        let arr = Object.assign(this.state.senseArray);
        if(senseDistance != ""){
            arr.push({type: senseType, distance: senseDistance});
            this.setState({
                senseArray: arr,
                senseCompArray: arr.map((item, index) => {
                    return <SenseItem key={uniqid()} id={index} type={item.type} distance={item.distance} remSense={x => {this.removeSense(x)}} />;
                })
            })
        }
        this.createSenseString(arr);
    }

    removeSense(id){
        let arr = Object.assign(this.state.senseArray);
            arr.splice(id, 1);
            this.setState({
                senseArray: arr,
                senseCompArray: arr.map((item, index) => {
                    return <SenseItem key={uniqid()} id={index} type={item.type} distance={item.distance} remSense={x => {this.removeSense(x)}} />;
                })
            })
        this.createSenseString(arr);
    }

    createSenseString(arr){
        this.setState({
            senseString: arr.map(element => {
                if(element.type != "Perception"){
                    return element.type + " " + element.distance + " ft.";
                } else {
                   return "passive " + element.type + " " + element.distance;
                }
            }).join(", ")
        })
    }

    handlePopup(title, html){
        this.popup.active = !this.popup.active;
        this.updatePopup(title, html);
    }

    updatePopup(title, html){
        if(this.popup.active == false){
            this.setState({
                pop: ""
            })
        } else {
            this.setState({
                pop:
                    <div id="popup">
                        <div id="container">
                            <div id="header">
                                <h1> {title} </h1>
                                <button onClick={() => this.handlePopup()}></button>
                            </div>
                            <section>
                                {html}
                            </section>
                        </div>
                    </div>
            })
        }
    }

    addAbility(){
        const html =
            <div id="ability">
                <input id="title-input" type="text" onChange={e => this.setState({abilityTitle: e.target.value})} />
                <textarea onChange={e => this.setState({abilityDesc: e.target.value})} />
                <button onClick={() => this.addToAbilityArray(this.state.abilityTitle, this.state.abilityDesc)}> Add </button>
            </div>;
        this.handlePopup("Add Trait", html);
    }

    addToAbilityArray(title, desc){
        this.handlePopup();
        let arr = Object.assign(this.state.abilityArray);
        arr.push({title: title, desc: desc});
        this.setState({
            abilityArray: arr,
            abilityCompArray: arr.map((item, index) => {
                return <AbilItem key={uniqid()} id={index} title={item.title} desc={item.desc} remAbil={x => this.removeFromAbilityArray(x)} modAbil={x => this.modifiAbilityArray(x)} />
            })
        })
        this.createAbilityString(arr);
    }

    modifiAbilityArray(index){
        let arr = Object.assign(this.state.abilityArray);
        this.setState({
            abilityTitle: arr[index].title,
            abilityDesc: arr[index].desc
        })
        const html =
            <div id="ability">
                <input id="title-input" type="text" defaultValue={this.state.abilityTitle} onChange={e => this.setState({abilityTitle: e.target.value})} />
                <textarea defaultValue={this.state.abilityDesc} onChange={e => this.setState({abilityDesc: e.target.value})} />
                <button onClick={() => {this.popup.deleteConf = true; this.confirmModify(this.state.abilityTitle, this.state.abilityDesc, index)}}> Edit </button>
            </div>;
        this.handlePopup("Edit Trait", html);
    }

    confirmModify(title, desc, index){
        this.handlePopup();
        let arr = Object.assign(this.state.abilityArray);
        arr[index].title = title;
        arr[index].desc = desc
        this.setState({
            abilityArray: arr,
            abilityCompArray: arr.map((item, index) => {
                return <AbilItem key={uniqid()} id={index} title={item.title} desc={item.desc} remAbil={x => this.removeFromAbilityArray(x)} modAbil={x => this.modifiAbilityArray(x)} />
            })
        })
        this.createAbilityString(arr);
    }

    removeFromAbilityArray(index){
        let arr = Object.assign(this.state.abilityArray);
        arr.splice(index, 1);
        this.setState({
            abilityArray: arr,
            abilityCompArray: arr.map((item, index) => {
                return <AbilItem key={uniqid()} id={index} title={title} remAbil={x => this.removeFromAbilityArray(x)} modAbil={x => this.modifiAbilityArray(x)} />
            })
        })
        this.createAbilityString(arr);
    }

    createAbilityString(arr){
        this.setState({
            abilityString: arr.map(element => {
                return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.title + ". "} </b> {element.desc} </p> </li>
            })
        })
    }

    addAction(){
        this.setState({
            actionType: "regular"
        })
        const html =
        <div id="action">
            <div id="regular">
                <SelectAction selectAction={x => this.determineAction(x)} />
                <hr />
                <input id="title-input" type="text" onChange={e => this.setState({actionTitle: e.target.value})} />
                <textarea onChange={e => this.setState({actionDesc: e.target.value})} />
                <hr />
                <button onClick={() => this.addToActionArray(this.state.actionType, this.state.actionTitle, this.state.actionDesc)}> Add </button>
            </div>
        </div>;
        this.handlePopup("Add Action", html);
    }

    determineAction(string){
        let html;

        this.setState({
            actionType: string
        })

        if(string == "attack"){
            html =
                <div id="action">
                    <div id="regular">
                        <SelectAction selectAction={x => this.determineAction(x)} />
                    </div>
                    <hr />
                    <ul id="attack">
                        <li>
                            <label> Weapon Name </label>
                            <input type="text" onChange={e =>{ this.attacks.name = e.target.value}} />
                        </li>
                        <li>
                            <label> Attack Type </label>
                            <select  onChange={e =>{this.attacks.type = e.target.value}}>
                                <option value="Melee Weapon Attack"> Melee Weapon Attack </option>
                                <option value="Ranged Weapon Attack"> Ranged Weapon Attack </option>
                                <option value="Melee Spell Attack"> Melee Spell Attack </option>
                                <option value="Ranged Spell Attack"> Ranged Spell Attack </option>
                            </select>
                        </li>
                        <li>
                            <label> Attack Modifier </label>
                            <select onChange={e =>{this.attacks.modifier = e.target.value}}>
                                <option value="Strenght"> Strength </option>
                                <option value="Dexterety"> Dexterety </option>
                            </select>
                        </li>
                        <li>
                            <label> Reach/Range </label>
                            <select onChange={e =>{this.attacks.reach = e.target.value}}>
                                <option value="reach"> Reach  </option>
                                <option value="range"> Range  </option>
                            </select>
                            <input type="text" onChange={e =>{ this.attacks.reachDistance = e.target.value}} />
                        </li>
                        <li>
                            <label> Targeting </label>
                            <select onChange={e =>{ this.attacks.targeting = e.target.value}}>
                                <option value=""> one target </option>
                                <option value=""> one creature </option>
                            </select>
                        </li>
                        <li>
                            <label> Damage </label>
                            <input type="text" onChange={e =>{ this.attacks.diceAmount = e.target.value}} />
                            <select  onChange={e =>{this.attacks.diceType = e.target.value}}>
                                <option value="D4"> D4 </option>
                                <option value="D6"> D6 </option>
                                <option value="D8"> D8 </option>
                                <option value="D10"> D10 </option>
                                <option value="D12"> D12 </option>
                            </select>
                        </li>
                        <li>
                            <label> Damage Type </label>
                            <select className="margin" onChange={e =>{this.attacks.damage = e.target.value}}>
                                <option value="acid"> Acid </option>
                                <option value="bludgeoning"> Bludgeoning </option>
                                <option value="cold"> Cold </option>
                                <option value="fire"> Fire </option>
                                <option value="force"> Force </option>
                                <option value="lightning"> Lightning </option>
                                <option value="necrotic"> Necrotic </option>
                                <option value="piercing"> Piercing </option>
                                <option value="poison"> Poison </option>
                                <option value="psychic"> Psychic </option>
                                <option value="radiant"> Radiant </option>
                                <option value="slashing"> Slashing </option>
                                <option value="thunder"> Thunder </option>
                            </select>
                        </li>
                    </ul>
                    <hr />
                    <button onClick={() => this.addToActionArray(this.state.actionType, this.state.actionTitle, this.state.actionDesc)}> Add </button>
                </div>;
        } else {
            html =
                <div id="action">
                    <div id="regular">
                        <SelectAction selectAction={x => this.determineAction(x)} />
                        <hr />
                        <input id="title-input" type="text" onChange={e => this.setState({actionTitle: e.target.value})} />
                        <textarea onChange={e => this.setState({actionDesc: e.target.value})} />
                        <hr />
                        <button onClick={() => this.addToActionArray(this.state.actionType, this.state.actionTitle, this.state.actionDesc)}> Add </button>
                    </div>
                </div>;
        }

        this.updatePopup("Add Action", html);
    }

    addToActionArray(type, title, desc){
        this.handlePopup();
        let arr, totalArray;
        totalArray = Object.assign(this.state.actionsArray);
        if(type == "regular" || type == "attack"){
            arr = Object.assign(this.state.actionArray);
            if(type == "attack"){
                if(this.attacks.name != ""){
                    arr.push({type: type, title: this.attacks.name, desc: {name: this.attacks.name, type: this.attacks.type, modifier: this.attacks.modifier, reach: this.attacks.reach, reachDistance: this.attacks.reachDistance, targeting: this.attacks.targeting, diceAmount: this.attacks.diceAmount, diceType: this.attacks.diceType, damage: this.attacks.damage}});
                    totalArray.push({type: type, title: this.attacks.name, desc: desc});
                }
            } else {
                if(title != "" || desc != ""){
                    arr.push({type: type, title: title, desc: desc});
                    totalArray.push({type: type, title: title, desc: desc});
                }
            }
            this.setState({
                actionArray: arr
            })
        } else if(type == "reaction"){
            arr = Object.assign(this.state.reactionArray);
            if(title != "" || desc != ""){
                arr.push({type: type, title: title, desc: desc});
                totalArray.push({type: type, title: title, desc: desc});
            }
            this.setState({
                reactionArray: arr
            })
        } else if(type == "legendary"){
            arr = Object.assign(this.state.legendaryArray);
            if(title != "" || desc != ""){
                arr.push({type: type, title: title, desc: desc});
                totalArray.push({type: type, title: title, desc: desc});
            }
            this.setState({
                reactionArray: arr
            })
        }
        this.setState({
            actionsArray: totalArray,
            actionsCompArray: totalArray.map((item, index) => {
                return <ActionItem key={uniqid()} type={item.type} id={index} title={item.title} modAction={(x, y) => this.modifiActionArray(x, y)} remAction={(x, y, z) => this.removeFromActionArray(x, y, z)} />
            })
        })

        this.createActionString(arr, type);
    }

    removeFromActionArray(index, type, title){
        let arr, foundID;
        let totalArray = Object.assign(this.state.actionsArray);
        totalArray.splice(index, 1);
        this.setState({
            actionsArray: totalArray,
            actionsCompArray: totalArray.map((item, index) => {
                return <ActionItem key={uniqid()} type={item.type} id={index} title={item.title} modAction={(x, y) => this.modifiActionArray(x, y)} remAction={(x, y, z) => this.removeFromActionArray(x, y, z)} />
            })
        })
        if(type == "regular" || type == "attack"){
            arr = Object.assign(this.state.actionArray);
            foundID = arr.findIndex(item => {
                return item.title == title;
            })
            arr.splice(foundID, 1);
            this.setState({
                actionArray: arr
            })
        } else if(type == "reaction"){
            arr = Object.assign(this.state.reactionArray);
            arr.splice(index, 1);
            foundID = arr.findIndex(item => {
                return item.title == title;
            })
            arr.splice(foundID, 1);
            this.setState({
                reactionArray: arr
            })
        }
        else if(type == "legendary"){
           arr = Object.assign(this.state.legendaryArray);
           arr.splice(index, 1);
           foundID = arr.findIndex(item => {
               return item.title == title;
           })
           arr.splice(foundID, 1);
           this.setState({
               legendaryArray: arr
           })
       }
        this.createActionString(arr, type);
    }

    modifiActionArray(index, type){
        let html, arr;
        if(type == "attack"){
            arr = Object.assign(this.state.actionArray);
            html =
                <div id="action">
                    <ul id="attack">
                        <li>
                            <label> Weapon Name </label>
                            <input type="text" defaultValue={arr[index].desc.name} onChange={e =>{ this.attacks.name = e.target.value}} />
                        </li>
                        <li>
                            <label> Attack Type </label>
                            <select defaultValue={arr[index].desc.type} onChange={e =>{this.attacks.type = e.target.value}}>
                                <option value="Melee Weapon Attack"> Melee Weapon Attack </option>
                                <option value="Ranged Weapon Attack"> Ranged Weapon Attack </option>
                                <option value="Melee Spell Attack"> Melee Spell Attack </option>
                                <option value="Ranged Spell Attack"> Ranged Spell Attack </option>
                            </select>
                        </li>
                        <li>
                            <label> Attack Modifier </label>
                            <select defaultValue={arr[index].desc.modifier} onChange={e =>{this.attacks.modifier = e.target.value}}>
                                <option value="Strenght"> Strength </option>
                                <option value="Dexterety"> Dexterety </option>
                            </select>
                        </li>
                        <li>
                            <label> Reach/Range </label>
                            <select defaultValue={arr[index].desc.reach} onChange={e =>{this.attacks.reach = e.target.value}}>
                                <option value="reach"> Reach  </option>
                                <option value="range"> Range  </option>
                            </select>
                            <input type="text" defaultValue={arr[index].desc.reachDistance} onChange={e =>{ this.attacks.reachDistance = e.target.value}} />
                        </li>
                        <li>
                            <label> Targeting </label>
                            <select defaultValue={arr[index].desc.targeting} onChange={e =>{ this.attacks.targeting = e.target.value}}>
                                <option value=""> one target </option>
                                <option value=""> one creature </option>
                            </select>
                        </li>
                        <li>
                            <label> Damage </label>
                            <input type="text" defaultValue={arr[index].desc.diceAmount} onChange={e =>{ this.attacks.diceAmount = e.target.value}} />
                            <select defaultValue={arr[index].desc.diceType} onChange={e =>{this.attacks.diceType = e.target.value}}>
                                <option value="D4"> D4 </option>
                                <option value="D6"> D6 </option>
                                <option value="D8"> D8 </option>
                                <option value="D10"> D10 </option>
                                <option value="D12"> D12 </option>
                            </select>
                        </li>
                        <li>
                            <label> Damage Type </label>
                            <select defaultValue={arr[index].desc.damage} className="margin" onChange={e =>{this.attacks.damage = e.target.value}}>
                                <option value="acid"> Acid </option>
                                <option value="bludgeoning"> Bludgeoning </option>
                                <option value="cold"> Cold </option>
                                <option value="fire"> Fire </option>
                                <option value="force"> Force </option>
                                <option value="lightning"> Lightning </option>
                                <option value="necrotic"> Necrotic </option>
                                <option value="piercing"> Piercing </option>
                                <option value="poison"> Poison </option>
                                <option value="psychic"> Psychic </option>
                                <option value="radiant"> Radiant </option>
                                <option value="slashing"> Slashing </option>
                                <option value="thunder"> Thunder </option>
                            </select>
                        </li>
                    </ul>
                    <button onClick={() => this.confirmActionModify(this.state.actionType, this.attacks.name, this.state.actionDesc, index)}> Edit </button>
                </div>;
        } else if(type == "regular"){
            arr = Object.assign(this.state.actionArray);
            html =
                <div id="action">
                    <div id="regular">
                        <input defaultValue={arr[index].title} id="title-input" type="text" onChange={e => this.setState({actionTitle: e.target.value})} />
                        <textarea defaultValue={arr[index].desc} onChange={e => this.setState({actionDesc: e.target.value})} />
                        <hr />
                        <button onClick={() => this.confirmActionModify(this.state.actionType, this.state.actionTitle, this.state.actionDesc, index)}> Edit </button>
                    </div>
                </div>;
        } else if(type == "reaction"){
            arr = Object.assign(this.state.reactionArray);
            html =
                <div id="action">
                    <div id="regular">
                        <input defaultValue={arr[index].title} id="title-input" type="text" onChange={e => this.setState({actionTitle: e.target.value})} />
                        <textarea defaultValue={arr[index].desc} onChange={e => this.setState({actionDesc: e.target.value})} />
                        <hr />
                        <button onClick={() => this.confirmActionModify(this.state.actionType, this.state.actionTitle, this.state.actionDesc, index)}> Edit </button>
                    </div>
                </div>;
        } else if(type == "legendary"){
            arr = Object.assign(this.state.legendaryArray);
            html =
                <div id="action">
                    <div id="regular">
                        <input defaultValue={arr[index].title} id="title-input" type="text" onChange={e => this.setState({actionTitle: e.target.value})} />
                        <textarea defaultValue={arr[index].desc} onChange={e => this.setState({actionDesc: e.target.value})} />
                        <hr />
                        <button onClick={() => this.confirmActionModify(this.state.actionType, this.state.actionTitle, this.state.actionDesc, index)}> Edit </button>
                    </div>
                </div>;
        }
        this.handlePopup("Edit Action", html);
    }

    confirmActionModify(type, title, desc, index){
        this.handlePopup();
        let arr, foundID;
        let totalArray = Object.assign(this.state.actionsArray);
        if(type == "attack"){
            arr = Object.assign(this.state.actionArray);
            foundID = totalArray.findIndex(item => {
                return item.title == arr[index].title;
            })
            arr[index].title = title;
            arr[index].desc = {name: this.attacks.name, type: this.attacks.type, modifier: this.attacks.modifier, reach: this.attacks.reach, reachDistance: this.attacks.reachDistance, targeting: this.attacks.targeting, diceAmount: this.attacks.diceAmount, diceType: this.attacks.diceType, damage: this.attacks.damage};
            totalArray[foundID].title = title;
        } else if(type == "regular"){
            arr = Object.assign(this.state.actionArray);
            foundID = totalArray.findIndex(item => {
                return item.title == arr[index].title;
            })
            arr[index].title = title;
            arr[index].desc = desc;
            totalArray[foundID].title = title;
        } else if(type == "reaction"){
            arr = Object.assign(this.state.reactionArray);
            foundID = totalArray.findIndex(item => {
                return item.title == arr[index].title;
            })
            arr[index].title = title;
            arr[index].desc = desc;
            totalArray[foundID].title = title;
        } else if(type == "legendary"){
            arr = Object.assign(this.state.legendaryArray);
            foundID = totalArray.findIndex(item => {
                return item.title == arr[index].title;
            })
            arr[index].title = title;
            arr[index].desc = desc;
            totalArray[foundID].title = title;
        }
        this.setState({
            reactionArray: arr,
            actionsArray: totalArray,
            actionsCompArray: totalArray.map((item, index) => {
                return <ActionItem key={uniqid()} type={item.type} id={index} title={item.title} modAction={(x, y) => this.modifiActionArray(x, y)} remAction={(x, y, z) => this.removeFromActionArray(x, y, z)} />
            })
        })
        this.createActionString(arr, type);
    }

    createActionString(arr, type){
        setTimeout(() => {
            let hitpoints, modifier;
            if(type != null){
                if(type == "attack" || type == "regular"){
                    this.setState({
                        actionString: arr.map(element => {
                            if(element.type != "attack"){
                                return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.title + ". "} </b> {element.desc} </p> </li>
                            } else {
                                switch(element.desc.modifier){
                                    case "Dexterety":
                                        modifier = this.state.dexRawMod;
                                        break;
                                    case "Strenght":
                                        modifier = this.state.strRawMod;
                                        break;
                                }
                                switch(element.desc.diceType){
                                    case "D4":
                                        hitpoints = Math.round(element.desc.diceAmount * 2.5 + modifier);
                                        break;
                                    case "D6":
                                        hitpoints = Math.round(element.desc.diceAmount * 3.5  + modifier);
                                        break;
                                    case "D8":
                                        hitpoints = Math.round(element.desc.diceAmount * 4.5  + modifier);
                                        break;
                                    case "D10":
                                        hitpoints = Math.round(element.desc.diceAmount * 5.5  + modifier);
                                        break;
                                    case "D12":
                                        hitpoints = Math.round(element.desc.diceAmount * 6.5  + modifier);
                                        break;
                                }
                                if(element.desc.modifier == "Strenght"){
                                    if((this.state.strRawMod + this.state.profBonus) > -1){
                                        return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.desc.name + ". "} </b> <i> {element.desc.type + ":"} </i> {"+" + (this.state.strRawMod + this.state.profBonus) + " to hit, " + element.desc.reach.toLowerCase() + " " + element.desc.reachDistance + ", " + element.desc.targeting.toLowerCase() + ". Hit: " + hitpoints + " (" + element.desc.diceAmount + element.desc.diceType.toLowerCase() + " + " + modifier + ") " + element.desc.damage + " damage."} </p> </li>
                                    } else {
                                        return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.desc.name + ". "} </b> <i> {element.desc.type + ":"} </i> {(this.state.strRawMod + this.state.profBonus) + " to hit, " + element.desc.reach.toLowerCase() + " " + element.desc.reachDistance + ", " + element.desc.targeting.toLowerCase() + ". Hit: " + hitpoints + " (" + element.desc.diceAmount + element.desc.diceType.toLowerCase() + " + " + modifier + ") " + element.desc.damage + " damage."} </p> </li>
                                    }
                                } else {
                                    if((this.state.strRawMod + this.state.profBonus) > -1){
                                        return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.desc.name + ". "} </b> <i> {element.desc.type + ":"} </i> {"+" + (this.state.dexRawMod + this.state.profBonus) + " to hit, " + element.desc.reach.toLowerCase() + " " + element.desc.reachDistance + ", " + element.desc.targeting.toLowerCase() + ". Hit: " + hitpoints + " (" + element.desc.diceAmount + element.desc.diceType.toLowerCase() + " + " + modifier + ") " + element.desc.damage + " damage."} </p> </li>
                                    } else {
                                        return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.desc.name + ". "} </b> <i> {element.desc.type + ":"} </i> {(this.state.dexRawMod + this.state.profBonus) + " to hit, " + element.desc.reach.toLowerCase() + " " + element.desc.reachDistance + ", " + element.desc.targeting.toLowerCase() + ". Hit: " + hitpoints + " (" + element.desc.diceAmount + element.desc.diceType.toLowerCase() + " + " + modifier + ") " + element.desc.damage + " damage."} </p> </li>
                                    }
                                }
                            }
                        })
                    })
                } else if(type == "reaction"){
                    this.setState({
                        reactionString: arr.map(element => {
                            return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.title + ". "} </b> {element.desc} </p> </li>
                        })
                    })
                } else if(type == "legendary"){
                    this.setState({
                        legendaryString: arr.map(element => {
                            return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.title + ". "} </b> {element.desc} </p> </li>
                        })
                    })
                }
            } else {
                this.setState({
                    actionString: arr.map(element => {
                        if(element.type != "attack"){
                            return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.title + ". "} </b> {element.desc} </p> </li>
                        } else {
                            switch(element.desc.modifier){
                                case "Dexterety":
                                    modifier = this.state.dexRawMod;
                                    break;
                                case "Strenght":
                                    modifier = this.state.strRawMod;
                                    break;
                            }
                            switch(element.desc.diceType){
                                case "D4":
                                    hitpoints = Math.round(element.desc.diceAmount * 2.5 + modifier);
                                    break;
                                case "D6":
                                    hitpoints = Math.round(element.desc.diceAmount * 3.5  + modifier);
                                    break;
                                case "D8":
                                    hitpoints = Math.round(element.desc.diceAmount * 4.5  + modifier);
                                    break;
                                case "D10":
                                    hitpoints = Math.round(element.desc.diceAmount * 5.5  + modifier);
                                    break;
                                case "D12":
                                    hitpoints = Math.round(element.desc.diceAmount * 6.5  + modifier);
                                    break;
                            }
                            if(element.desc.modifier == "Strenght"){
                                if((this.state.strRawMod + this.state.profBonus) > -1){
                                    return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.desc.name + ". "} </b> <i> {element.desc.type + ":"} </i> {"+" + (this.state.strRawMod + this.state.profBonus) + " to hit, " + element.desc.reach.toLowerCase() + " " + element.desc.reachDistance + ", " + element.desc.targeting.toLowerCase() + ". Hit: " + hitpoints + " (" + element.desc.diceAmount + element.desc.diceType.toLowerCase() + " + " + modifier + ") " + element.desc.damage + " damage."} </p> </li>
                                } else {
                                    return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.desc.name + ". "} </b> <i> {element.desc.type + ":"} </i> {(this.state.strRawMod + this.state.profBonus) + " to hit, " + element.desc.reach.toLowerCase() + " " + element.desc.reachDistance + ", " + element.desc.targeting.toLowerCase() + ". Hit: " + hitpoints + " (" + element.desc.diceAmount + element.desc.diceType.toLowerCase() + " + " + modifier + ") " + element.desc.damage + " damage."} </p> </li>
                                }
                            } else {
                                if((this.state.strRawMod + this.state.profBonus) > -1){
                                    return <li key={uniqid()} style={{marginTop: 10}} className="abilityItem"> <p> <b> {element.desc.name + ". "} </b> <i> {element.desc.type + ":"} </i> {"+" + (this.state.dexRawMod + this.state.profBonus) + " to hit, " + element.desc.reach.toLowerCase() + " " + element.desc.reachDistance + ", " + element.desc.targeting.toLowerCase() + ". Hit: " + hitpoints + " (" + element.desc.diceAmount + element.desc.diceType.toLowerCase() + " + " + modifier + ") " + element.desc.damage + " damage."} </p> </li>
                                }
                            }
                        }
                    })
                })
            }
        }, 250);
    }

    render(){
        return (
            <div id="body">
                <Preview
                    name={this.state.monsterName}
                    size={this.state.monsterSize}
                    type={this.state.monsterType}
                    alignment={this.state.monsterAlignment}
                    armorClass={this.state.monsterAC}
                    armorNotes={this.state.monsterACNotes}
                    hitPoints={this.state.monsterHealth}
                    speed={this.state.monsterSpeed}
                    statStr={this.state.strStat}
                    modStr={this.state.strMod}
                    statDex={this.state.dexStat}
                    modDex={this.state.dexMod}
                    statCon={this.state.conStat}
                    modCon={this.state.conMod}
                    statInt={this.state.intStat}
                    modInt={this.state.intMod}
                    statWis={this.state.wisStat}
                    modWis={this.state.wisMod}
                    statCha={this.state.chaStat}
                    modCha={this.state.chaMod}
                    speeds={this.state.speedString}
                    save={this.state.savingThrowString}
                    skill={this.state.skillString}
                    damRes={this.state.resistArray}
                    damImm={this.state.immuneArray}
                    damVul={this.state.vulnerableArray}
                    conditions={this.state.conditionArray}
                    langs={this.state.langArray.join(", ")}
                    challenge={this.state.challengeString}
                    chalXP={this.state.challengeXP}
                    senses={this.state.senseString}
                    ability={this.state.abilityString}
                    actions={this.state.actionString}
                    reactions={this.state.reactionString}
                    legendaries={this.state.legendaryString}
                />
                <div id="settings">
                    <ul id="container">
                        <li>
                            <p id="label"> Name </p>
                            <input type="text" className="name" onChange={e => {this.setState({monsterName: e.target.value}); if(e.target.value == ""){this.setState({monsterName: "Name"})}}}  />
                        </li>
                        <li>
                            <p id="label"> Size </p>
                            <select name="size" onChange={e => {this.setState({monsterSize: e.target.value})}}>
                                <option value="Tiny"> Tiny </option>
                                <option value="Small"> Small </option>
                                <option value="Medium"> Medium </option>
                                <option value="Large"> Large </option>
                                <option value="Huge"> Huge </option>
                                <option value="Gargantuan"> Gargantuan </option>
                            </select>
                        </li>
                        <li>
                            <p id="label"> Type </p>
                            <select name="size" onChange={e => {this.setState({monsterType: e.target.value})}}>
                                <option value="abberation"> Abberation </option>
                                <option value="beast"> Beast </option>
                                <option value="celestial"> Celestial </option>
                                <option value="construct"> Construct </option>
                                <option value="dragon"> Dragon </option>
                                <option value="elemental"> Elemental </option>
                                <option value="fey"> Fey </option>
                                <option value="fiend"> Fiend </option>
                                <option value="giant"> Giant </option>
                                <option value="humanoid"> Humanoid </option>
                                <option value="monstrosity"> Monstrosity </option>
                                <option value="ooze"> Ooze </option>
                                <option value="plant"> Plant </option>
                                <option value="undead"> Undead </option>
                            </select>
                        </li>
                        <li>
                            <p id="label"> Alignment </p>
                            <select name="alignment" onChange={e => {this.setState({monsterAlignment: e.target.value})}}>
                                <option value="lawful good"> Lawful Good </option>
                                <option value="neutral good"> Neutral Good </option>
                                <option value="chaotic good"> Chaotic Good </option>
                                <option value="lawful neutral"> Lawful Neutral </option>
                                <option value="true neutral"> True Neutral </option>
                                <option value="chaotic neutral"> Chaotic Neutral </option>
                                <option value="lawful evil"> Lawful Evil </option>
                                <option value="neutral evil"> Neutral Evil </option>
                                <option value="chaotic evil"> Chaotic Evil </option>
                                <option value="unaligned"> Unaligned </option>
                            </select>
                        </li>
                    </ul>
                    <ul id="container">
                        <li>
                            <p id="label"> Armor Class </p>
                            <input  id="acAmount"
                                    onChange={
                                        e => {
                                            if(!isNaN(e.target.value)){
                                                this.setState({monsterAC: e.target.value})
                                            } else {
                                                e.target.value = "";
                                            }
                                        }
                                    }
                                   type="text"
                                   className="ac"
                            />
                            <input id="armorClassNote" onChange={e => {this.setState({monsterACNotes: e.target.value})}} type="text" />
                        </li>
                        <li>
                            <p id="label"> Hit Points </p>
                            <input id="diceAmount"
                                   onChange={
                                       e => {
                                           if(!isNaN(e.target.value)){
                                               this.setState({hitDiceAmount: e.target.value})
                                           } else {
                                               e.target.value = "";
                                           }
                                       }
                                   }
                                   type="text"
                                   className="hitDiceAmount"
                           />
                            <select className="margin" name="alignment" onChange={e => {this.setState({hitDiceType: e.target.value})}}>
                                <option value="d4"> D4 </option>
                                <option value="d6"> D6 </option>
                                <option value="d8"> D8 </option>
                                <option value="d10"> D10 </option>
                                <option value="d12"> D12 </option>
                            </select>
                            <input id="healthModifier" className="hitModifier" onChange={e => {this.setState({hitDiceModifier: e.target.value})}}  type="text" />
                            <p className="totalHP"> {this.state.monsterHealth} </p>
                            <button onClick={() => {this.calculateHealthRoll(this.state.hitDiceAmount, this.state.hitDiceType, this.state.hitDiceModifier)}}> Roll </button>
                            <button onClick={() => {this.calculateHealthAverage(this.state.hitDiceAmount, this.state.hitDiceType, this.state.hitDiceModifier)}}> Average </button>
                        </li>
                        <li>
                            <p id="label"> Speed </p>
                            <select id="speedTypes" className="margin" onChange={e => {this.setState({moveType: e.target.value})}}>
                                <option value="walk"> Walk</option>
                                <option value="climb"> Climb </option>
                                <option value="fly"> Fly </option>
                                <option value="swim"> Swim </option>
                                <option value="burrow"> Burrow </option>
                            </select>
                            <input id="movementSpeed" className="distance"  onChange={
                                 e => {
                                     if(!isNaN(e.target.value)){
                                         this.setState({moveSpeed: e.target.value})
                                     } else {
                                         e.target.value = "";
                                     }
                                 }
                             }
                               type="text" />
                            <p className="margin"> ft. </p>
                            <button onClick={() => {this.addSpeed(this.state.moveType, this.state.moveSpeed)}}> Add </button>
                        </li>
                        <li>
                            <p id="label"></p>
                            <ul id="speedContainer">{this.state.speedCompList}</ul>
                        </li>
                    </ul>
                    <ul id="container">
                        <li>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th> STR </th>
                                            <th> DEX </th>
                                            <th> CON </th>
                                            <th> INT </th>
                                            <th> WIS </th>
                                            <th> CHA </th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input
                                                    maxLength="2"
                                                    id="strAmount"
                                                    onChange={
                                                        e => {
                                                            if(!isNaN(e.target.value)){
                                                                this.updateStat(e)
                                                            } else {
                                                                e.target.value = "";
                                                            }
                                                        }
                                                    }
                                                    type="text"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    maxLength="2"
                                                    id="dexAmount"
                                                    onChange={
                                                        e => {
                                                            if(!isNaN(e.target.value)){
                                                                this.updateStat(e)
                                                            } else {
                                                                e.target.value = "";
                                                            }
                                                        }
                                                    }
                                                    type="text"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    maxLength="2"
                                                    id="conAmount"
                                                    onChange={
                                                        e => {
                                                            if(!isNaN(e.target.value)){
                                                                this.updateStat(e)
                                                            } else {
                                                                e.target.value = "";
                                                            }
                                                        }
                                                    }
                                                    type="text"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    maxLength="2"
                                                    id="intAmount"
                                                    onChange={
                                                        e => {
                                                            if(!isNaN(e.target.value)){
                                                                this.updateStat(e)
                                                            } else {
                                                                e.target.value = "";
                                                            }
                                                        }
                                                    }
                                                    type="text"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    maxLength="2"
                                                    id="wisAmount"
                                                    onChange={
                                                        e => {
                                                            if(!isNaN(e.target.value)){
                                                                this.updateStat(e)
                                                            } else {
                                                                e.target.value = "";
                                                            }
                                                        }
                                                    }
                                                    type="text"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    maxLength="2"
                                                    id="chaAmount"
                                                    onChange={
                                                        e => {
                                                            if(!isNaN(e.target.value)){
                                                                this.updateStat(e)
                                                            } else {
                                                                e.target.value = "";
                                                            }
                                                        }
                                                    }
                                                    type="text"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> <p> {this.state.strMod} </p> </td>
                                            <td> <p> {this.state.dexMod} </p> </td>
                                            <td> <p> {this.state.conMod} </p> </td>
                                            <td> <p> {this.state.intMod} </p> </td>
                                            <td> <p> {this.state.wisMod} </p> </td>
                                            <td> <p> {this.state.chaMod} </p> </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                    </ul>
                    <ul id="container">
                        <li>
                            <p id="label"> Saving Throws </p>
                            <ul id="checkbox">
                                <li> <input type="checkbox" onChange={() => {this.savingThrows.strength = !this.savingThrows.strength; this.createSaveString()}} /> <p> Strength </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.savingThrows.dexterety = !this.savingThrows.dexterety; this.createSaveString()}} /> <p> Dexterety </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.savingThrows.constitution = !this.savingThrows.constitution; this.createSaveString()}} /> <p> Constitution </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.savingThrows.intellegence = !this.savingThrows.intellegence; this.createSaveString()}} /> <p> Intellegence </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.savingThrows.wisdom = !this.savingThrows.wisdom; this.createSaveString()}} /> <p> Wisdom </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.savingThrows.charisma = !this.savingThrows.charisma; this.createSaveString()}} /> <p> Charisma </p> </li>
                            </ul>
                        </li>
                        <li>
                            <p id="label"> Skills </p>
                            <ul id="checkbox">
                                <li> <input type="checkbox" onChange={() => {this.skills.acrobatics = !this.skills.acrobatics; this.createSkillString()}} /> <p> Acrobatics </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.animalHandling = !this.skills.animalHandling; this.createSkillString()}}/> <p> Animal Handling </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.arcana = !this.skills.arcana; this.createSkillString()}} /> <p> Arcana </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.athletics = !this.skills.athletics; this.createSkillString()}} /> <p> Athletics </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.deception = !this.skills.deception; this.createSkillString()}} /> <p> Deception </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.history = !this.skills.history; this.createSkillString()}} /> <p> History </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.insight = !this.skills.insight; this.createSkillString()}} /> <p> Insight </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.intimidation = !this.skills.intimidation; this.createSkillString()}} /> <p> Intimidation </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.investigation = !this.skills.investigation; this.createSkillString()}} /> <p> Investigation </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.medicine = !this.skills.medicine; this.createSkillString()}} /> <p> Medicine </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.nature = !this.skills.nature; this.createSkillString()}} /> <p> Nature </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.perception = !this.skills.perception; this.createSkillString()}}/> <p> Perception </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.perform = !this.skills.perform; this.createSkillString()}}/> <p> Performance </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.persuation = !this.skills.persuation; this.createSkillString()}} /> <p> Persuasion </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.religion = !this.skills.religion; this.createSkillString()}} /> <p> Religion </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.sleightOfHand = !this.skills.sleightOfHand; this.createSkillString()}} /> <p> Sleight of Hand </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.stealth = !this.skills.stealth; this.createSkillString()}} /> <p> Stealth </p> </li>
                                <li> <input type="checkbox" onChange={() => {this.skills.survival = !this.skills.survival; this.createSkillString()}} /> <p> Survival </p> </li>
                            </ul>
                        </li>
                        <li>
                            <p id="label"> Damage </p>
                            <select className="margin" onChange={e => {this.setState({damageType: e.target.value});}}>
                                <option value="Resistance"> Damage Resistance </option>
                                <option value="Immunity"> Damage Immunity </option>
                                <option value="Vulnerability"> Damage Vulnerability </option>
                            </select>
                            <select className="margin" onChange={e => {this.setState({damage: e.target.value});}}>
                                <option value="acid"> Acid </option>
                                <option value="bludgeoning"> Bludgeoning </option>
                                <option value="cold"> Cold </option>
                                <option value="fire"> Fire </option>
                                <option value="force"> Force </option>
                                <option value="lightning"> Lightning </option>
                                <option value="necrotic"> Necrotic </option>
                                <option value="piercing"> Piercing </option>
                                <option value="poison"> Poison </option>
                                <option value="psychic"> Psychic </option>
                                <option value="radiant"> Radiant </option>
                                <option value="slashing"> Slashing </option>
                                <option value="thunder"> Thunder </option>
                            </select>
                            <button onClick={() => this.addDamage(this.state.damageType, this.state.damage)}> Add </button>
                        </li>
                        <li>
                            <p id="label"></p>
                            <ul id="speedContainer">{this.state.damageCompArray}</ul>
                        </li>
                        <li>
                            <p id="label"> Conditions</p>
                            <select className="margin" onChange={e => {this.setState({conditionType: e.target.value});}}>
                                <option value="blinded"> Blinded </option>
                                <option value="charmed"> Charmed </option>
                                <option value="deafened"> Deafened </option>
                                <option value="exhausted"> Exhausted </option>
                                <option value="fatigued"> Fatigued </option>
                                <option value="frightened"> Frightened </option>
                                <option value="grappled"> Grappled </option>
                                <option value="paralyzed"> Paralyzed </option>
                                <option value="petrified"> Petrified </option>
                                <option value="poisoned"> Poisoned </option>
                                <option value="prone"> Prone </option>
                                <option value="restrained"> Restrained </option>
                                <option value="stunned"> Stunned </option>
                                <option value="unconcious"> Unconcious </option>
                            </select>
                            <button onClick={() => this.addCondition(this.state.conditionType)}> Add </button>
                        </li>
                        <li>
                            <p id="label"></p>
                            <ul id="speedContainer">{this.state.conditionCompArray}</ul>
                        </li>
                        <li>
                            <p id="label"> Senses </p>
                            <select className="margin" onChange={e => {this.setState({senseType: e.target.value});}}>
                                <option value="blindsight"> Blindsight </option>
                                <option value="darkvision"> Darkvision </option>
                                <option value="tremorsense"> Tremorsense </option>
                                <option value="truesight"> Truesight </option>
                                <option value="Perception"> passive Perception </option>
                            </select>
                            <input type="text" className="senses" onChange={e => {this.setState({senseDistance: e.target.value});}} />
                            <button onClick={() => {this.addSense(this.state.senseType, this.state.senseDistance);}}> Add </button>
                        </li>
                        <li>
                            <p id="label"></p>
                            <ul id="speedContainer">{this.state.senseCompArray}</ul>
                        </li>
                        <li>
                            <p id="label"> Languages </p>
                            <select className="margin" onChange={e => {this.setState({language: e.target.value});}}>
                                <option> Common </option>
                                <option> Dwarvish </option>
                                <option> Elvish </option>
                                <option> Giant </option>
                                <option> Gnomish </option>
                                <option> Goblin </option>
                                <option> Halfling </option>
                                <option> Orc </option>
                                <option> Abyssal </option>
                                <option> Celestial </option>
                                <option> Draconic </option>
                                <option> Deep Speech </option>
                                <option> Infernal </option>
                                <option> Primordial </option>
                                <option> Sylvian </option>
                                <option> Undercommon </option>
                            </select>
                            <button onClick={() => this.addLanguage(this.state.language)}> Add </button>
                        </li>
                        <li>
                            <p id="label"></p>
                            <ul id="speedContainer">{this.state.langCompArray}</ul>
                        </li>
                        <li>
                            <p id="label"> Challenge </p>
                            <input type="text" onChange={e => {this.setState({language: e.target.value}); this.calculateXP(e.target.value);}} />
                            <p> ({this.state.challengeXP} XP/+{this.state.profBonus}) </p>
                        </li>
                    </ul>
                    <ul id="container">
                        <li>
                            <p id="label"> Traits </p>
                            <button onClick={() => this.addAbility()}> Add Trait </button>
                        </li>
                        <li>
                            <ul id="speedContainer">{this.state.abilityCompArray}</ul>
                        </li>
                        <li>
                            <p id="label"> Actions </p>
                            <button onClick={() => this.addAction()}> Add Action </button>
                        </li>
                        <li>
                            <ul id="speedContainer">{this.state.actionsCompArray}</ul>
                        </li>
                    </ul>
                </div>
                {this.state.pop}
            </div>
        );
    };
}
