import * as express from "express";
import {Quiz} from "../models/Quiz";
import {questions} from "./questions";
import {VoterInitMessage, VoterMessageSend, VoterVote} from "../shared/VoterMessageSend";
import {VoterError, VoterMessageReceive} from "../shared/VoterMessageReceive";
import {AdminError, AdminMessageReceive} from "../shared/AdminMessageReceive";
import {AdminMessageSend} from "../shared/AdminMessageSend";
import {CommunicationChannels} from "./spec/CommunicationChannels";
import {VoterVoteEvent} from "./events/VoterVoteEvent";
import {VoterInitEvent} from "./events/VoterInitEvent";
import {AdminNextEvent} from "./events/AdminNextEvent";
import app from "../app";
import {AdminInitEvent} from "./events/AdminInitEvent";

const quiz = new Quiz(questions);

interface VoterMap {
    [voterId: string]: WebSocket;
}

let voters: VoterMap = {};


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


let adminSocket: WebSocket;
export let adminController = (ws: WebSocket, req: express.Request, next: express.NextFunction) => {
    if (req.query["secret"] !== "6154") {
        next(new Error("You are not an admin."));
    }

    ws.onmessage = function (msg: MessageEvent): any {
        adminSocket = this;

        let data: AdminMessageSend = JSON.parse(msg.data);
        let exec: Promise<any>;
        switch (data.type) {
            case "whatsup":
                exec = AdminInitEvent.handle(quiz, channels);
                break;
            case "next":
                exec = AdminNextEvent.handle(quiz, channels);
                break;
            default:
                channels.sendMessageToAdmin({
                    type: "error",
                    msg: "Message inconu"
                } as AdminError);
        }

        exec.then(() => {
            console.log("[Admin] message processed : " + data.type);
        }).catch(err => {
            console.error(err);
            channels.sendMessageToAdmin({
                type: "error",
                msg: "Quelque chose a planté, veuillez rafraîchir la page.",
                error: app.get('env') === 'development' ? JSON.stringify(err) : null
            } as AdminError);
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
    sendMessageToAdmin: (data: AdminMessageReceive) => {
        if (adminSocket) {
            try {
                adminSocket.send(JSON.stringify(data));
            } catch (e) {
                console.error("Failed to communicate with admin.");
            }
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

    getNumberOfVoters: () => {
        return Object.keys(voters).length;
    }
};
