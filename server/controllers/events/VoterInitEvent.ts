import {Quiz} from "../../models/Quiz";
import {CommunicationChannels} from "../spec/CommunicationChannels";
import {VoterIdMessage} from "../../shared/VoterMessageReceive";
import {AdminNewVoterMessage} from "../../shared/AdminMessageReceive";

const uuidv4 = require('uuid/v4');


export class VoterInitEvent {

    public static handle = (previousVoterId: string | null, quiz: Quiz, voterSocket: WebSocket, channels: CommunicationChannels): Promise<any> => {
        return new Promise((resolve, reject) => {
            // try {
                let voterId = previousVoterId ? previousVoterId : uuidv4() as string;
                let state: VoterIdMessage = {
                    type: "id",
                    id: voterId,
                    currentState: quiz.getQuizState(),
                    voterAnswer: previousVoterId ? quiz.getUserVote(voterId) : null,
                };
                channels.registerNewVoter(voterSocket, previousVoterId);
                channels.sendMessageToSingleVoter(state, voterSocket);
                channels.sendMessageToAdmin({
                    type: "voterConnected",
                    numberOfVoters: channels.getNumberOfVoters()
                } as AdminNewVoterMessage);
                resolve();
            // } catch (e) {
            //     reject(e);
            // }
        });
    }
}
