import * as React from "react";
import * as ReactDOM from "react-dom";
import {Voter} from "./Voter";
import {Admin} from "./Admin";


let bootstrap = () => {
    if((window as any)["admin"] === true) {
        ReactDOM.render(<Admin/>, document.getElementById("app"));
    }else {
        ReactDOM.render(<Voter/>, document.getElementById("app"));
    }
};


export = bootstrap;
