import * as React from "react";
import * as ReactDOM from "react-dom";
import {Voter} from "./Voter";
import {Viewer} from "./Viewer";


let bootstrap = () => {
    window.onerror = (event: Event | string, source?: string, fileno?: number, columnNumber?: number, error?: Error) => {
        document.body.innerHTML = `
            <h2>Quelquechose a planté</h2>
            <p>Essayer de rafraîchir la page pour reprendre le quiz</p>
            <h4>Détails techniques</h4>
            <p>
                Erreur: ${JSON.stringify(event)}
            </p>
            <p>
                Détails: ${JSON.stringify(error)}
            </p>
        `;
    };

    switch ((window as any)["role"]) {
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
