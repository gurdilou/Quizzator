import * as React from "react";
import * as ReactDOM from "react-dom";


let bootstrap = () => {
    console.log("Hello.");
    ReactDOM.render(<h1>Hello world</h1>, document.getElementById("toto"));
};


export = bootstrap;
