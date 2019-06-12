import {Quiz} from "../../models/Quiz";
import {CommunicationChannels} from "../spec/CommunicationChannels";
import {VoterIdMessage} from "../../shared/VoterMessageReceive";
import {ViewerNewParticipant} from "../../shared/ViewerMessageReceive";

const uuidv4 = require('uuid/v4');


export class VoterInitEvent {

    public static handle = (previousVoterId: string | null, quiz: Quiz, voterSocket: WebSocket, channels: CommunicationChannels): Promise<any> => {
        return new Promise((resolve) => {
            let voterId = previousVoterId ? previousVoterId : uuidv4() as string;
            let state: VoterIdMessage = {
                type: "id",
                id: voterId,
                currentState: quiz.isClosed() ? quiz.getFinalReport() : quiz.getQuizState(),
                voterAnswer: previousVoterId ? quiz.getUserVote(voterId) : null,
            };
            channels.registerNewVoter(voterSocket, voterId);
            channels.sendMessageToSingleVoter(state, voterSocket);
            channels.sendMessageToAllViewers({
                type: "voterConnected",
                numberOfVoters: channels.getNumberOfVoters()
            } as ViewerNewParticipant);
            resolve();
        });
    }
}
