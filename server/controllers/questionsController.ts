import * as express from "express";
import {Quiz} from "../models/Quiz";
import {questions} from "./questions";
import {VoterInitMessage, VoterMessageSend, VoterVote} from "../shared/VoterMessageSend";
import {VoterError, VoterMessageReceive} from "../shared/VoterMessageReceive";
import {ViewerError, ViewerMessageReceive} from "../shared/ViewerMessageReceive";
import {CommunicationChannels} from "./spec/CommunicationChannels";
import {VoterVoteEvent} from "./events/VoterVoteEvent";
import {VoterInitEvent} from "./events/VoterInitEvent";
import {AdminNextEvent} from "./events/AdminNextEvent";
import app from "../app";
import {ViewerInitEvent} from "./events/ViewerInitEvent";
import {admin} from "./pageController";
import {AdminGoToNextMessage} from "../shared/AdminMessageSend";
import {ViewerWhatsUpMessage} from "../shared/ViewerMessageSend";

const quiz = new Quiz(questions);

interface VoterMap {
    [voterId: string]: WebSocket;
}

let voters: VoterMap = {};
let viewers: WebSocket[] = [];


export let questionsController = (ws: WebSocket, req: express.Request, next: express.NextFunction) => {
    ws.onmessage = function (msg: MessageEvent): any {
        console.log("receive : " + msg.data);
        let exec: Promise<any>;
        let data: VoterMessageSend = JSON.parse(msg.data);
        switch (data.type) {
            case "whatsup":
                let previousId = (data as VoterInitMessage).previousId;
                exec = VoterInitEvent.handle(previousId, quiz, this, channels);
                break;
            case "vote":
                let vote = data as VoterVote;
                exec = VoterVoteEvent.handle(quiz, vote.choiceId, vote.clientId, channels);
                break;
            default:
                channels.sendMessageToSingleVoter({
                    type: "error",
                    msg: "Message inconu"
                } as VoterError, this);
        }
        exec.then(() => {
            console.log("message processed : " + data.type);
        }).catch(err => {
            console.error(err);
            channels.sendMessageToSingleVoter({
                type: "error",
                msg: "Quelque chose a planté, veuillez rafraîchir la page.",
                error: app.get('env') === 'development' ? JSON.stringify(err) : null
            } as VoterError, this);
        });
    };
    next();
};


export let adminController = (ws: WebSocket, req: express.Request, next: express.NextFunction) => {
    if (req.query["secret"] !== "6154") {
        next(new Error("You are not an admin."));
    }

    ws.onmessage = function (msg: MessageEvent): any {
        let adminSocket = this;

        let data: AdminGoToNextMessage | ViewerWhatsUpMessage = JSON.parse(msg.data);
        let exec: Promise<any>;
        switch (data.type) {
            case "whatsup":
                exec = ViewerInitEvent.handle(quiz, adminSocket, channels);
                break;
            case "next":
                exec = AdminNextEvent.handle(quiz, channels);
                break;
            default:
                channels.sendMessageToSingleViewer({
                    type: "error",
                    msg: "Message inconu"
                } as ViewerError, adminSocket);
        }

        exec.then(() => {
            console.log("[Admin] message processed : " + data.type);
        }).catch(err => {
            console.error(err);
            channels.sendMessageToSingleViewer({
                type: "error",
                msg: "Quelque chose a planté, veuillez rafraîchir la page.",
                error: app.get('env') === 'development' ? JSON.stringify(err) : null
            } as ViewerError, adminSocket);
        });
    };
    next();
};

export let viewerController = (ws: WebSocket, req: express.Request, next: express.NextFunction) => {
    ws.onmessage = function (msg: MessageEvent): any {
        let data: ViewerWhatsUpMessage = JSON.parse(msg.data);
        let exec = ViewerInitEvent.handle(quiz, this, channels);

        exec.then(() => {
            console.log("[Viewer] message processed : " + data.type);
        }).catch(err => {
            console.error(err);
            channels.sendMessageToSingleVoter({
                type: "error",
                msg: "Quelque chose a planté, veuillez rafraîchir la page.",
                error: app.get('env') === 'development' ? JSON.stringify(err) : null
            } as ViewerError, this);
        });
    };
    next();
};


const channels: CommunicationChannels = {
    sendMessageToAllVoters: (data: VoterMessageReceive) => {
        let disconnectedClients: string[] = [];
        for (let voterId in voters) {
            if (voters.hasOwnProperty(voterId)) {
                let socket = voters[voterId];
                try {
                    socket.send(JSON.stringify(data));
                } catch (e) {
                    disconnectedClients.push(voterId);
                }
            }
        }

        for (let clientDisconnectedId of disconnectedClients) {
            delete voters[clientDisconnectedId];
        }
    },
    sendMessageToAllViewers: (data: ViewerMessageReceive) => {
        viewers = viewers.filter(socket => {
            try {
                socket.send(JSON.stringify(data));
            } catch (e) {
                return false;
            }
            return true;
        });
    },

    sendMessageToSingleViewer: (data: ViewerMessageReceive, viewer: WebSocket) => {
        try {
            viewer.send(JSON.stringify(data));
        } catch (e) {
            console.error("Failed to communicate with viewer.");
        }
    },

    sendMessageToSingleVoter: (data: VoterMessageReceive, socket: WebSocket) => {
        try {
            socket.send(JSON.stringify(data));
        } catch (e) {
            console.error("Failed to communicate with client.");
        }
    },

    registerNewVoter: (voterSocket: WebSocket, clientId: string) => {
        voters[clientId] = voterSocket;
    },
    registerNewViewer: (viewerSocket: WebSocket) => {
        viewers.push(viewerSocket);
    },

    getNumberOfVoters: () => {
        return Object.keys(voters).length;
    }
};
