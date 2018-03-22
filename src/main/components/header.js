import React, { Component } from "react";
import './style/header.sass';
export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{color:"#f67894"}}>
                header-component
            </div>
        )
    }
}
