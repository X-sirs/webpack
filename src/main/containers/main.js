import React, { Component } from "react";
import Header from '../components/header';
export default class Datalist extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h2>react pre</h2>
                <Header/>
                <image src={require('./image/259304-140PFG23527.jpg')}/>
            </div>
        )
    }
}