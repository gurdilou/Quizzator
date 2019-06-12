import * as React from "react";
import * as ReactDOM from "react-dom";
import {Voter} from "./Voter";
import {Viewer} from "./Viewer";


let bootstrap = () => {
    switch((window as any)["role"]) {
        case "admin":
            ReactDOM.render(<Viewer isAdmin/>, document.getElementById("app"));
            break;
        case "viewer":
            ReactDOM.render(<Viewer/>, document.getElementById("app"));
            break;
        default:
            ReactDOM.render(<Voter/>, document.getElementById("app"));
    }
};


export = bootstrap;
