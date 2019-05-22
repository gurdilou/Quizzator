import {Quiz} from "../../models/Quiz";
import {CommunicationChannels} from "../spec/CommunicationChannels";
import {AdminVoterUpdateResultMessage} from "../../shared/AdminMessageReceive";

export class VoterVoteEvent {
    public static handle = (quiz: Quiz, choiceId: string, clientId: string, channels: CommunicationChannels): Promise<any> => {
        return new Promise((resolve) => {

            quiz.votesFor(clientId, choiceId);
            channels.sendMessageToAdmin({
                type: "vote",
                votes: quiz.getCurrentSingleQuestionResult()
            } as AdminVoterUpdateResultMessage);

            resolve();
        });
    }
}
