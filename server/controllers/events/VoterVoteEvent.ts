import {Quiz} from "../../models/Quiz";
import {CommunicationChannels} from "../spec/CommunicationChannels";
import {ViewerEventResultUpdate} from "../../shared/ViewerMessageReceive";
import {isQuestion} from "../../shared/Question";

export class VoterVoteEvent {
    public static handle = (quiz: Quiz, choiceId: string, clientId: string, channels: CommunicationChannels): Promise<any> => {
        return new Promise((resolve) => {

            let state = quiz.getQuizState();
            if (isQuestion(state)) {
                quiz.votesFor(clientId, choiceId);

                channels.sendMessageToAllViewers({
                    type: "vote",
                    votes: quiz.getCurrentSingleQuestionResult(),
                    partOfMegaQuestion: quiz.isCurrentQuestionAMegaQuestion()
                } as ViewerEventResultUpdate);
            }

            resolve();
        });
    }
}
