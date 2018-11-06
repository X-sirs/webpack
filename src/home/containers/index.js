import React, { Component } from "react";
import Header from '../components/header';
import './style/main';
export default class MainPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="main">
                <h2 style={{color:"#55f577"}}>React Main Container</h2>
                <Header/>
                <img style={{width:"100px"}} src={require('./image/259304-140PFG23527.jpg')}/>
            </div>
        )
    }
}