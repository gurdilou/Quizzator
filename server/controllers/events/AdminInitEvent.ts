import {Quiz} from "../../models/Quiz";
import {CommunicationChannels} from "../spec/CommunicationChannels";
import {isQuestion} from "../../shared/Question";
import {
    AdminFinalQuestionResultMessage,
    AdminNewQuestionMessage,
    AdminNewVoterMessage,
    AdminQuizzResumeMessage
} from "../../shared/AdminMessageReceive";

export class AdminInitEvent {
    public static handle = (quiz: Quiz, channels: CommunicationChannels): Promise<any> => {
        return new Promise<any>((resolve) => {
            let state = quiz.getQuizState();
            if (state === "waitingForQuizStart") {
                channels.sendMessageToAdmin({
                    type: "voterConnected",
                    numberOfVoters: channels.getNumberOfVoters()
                } as AdminNewVoterMessage);
                resolve();
                return;
            }

            if (Array.isArray(state)) {
                channels.sendMessageToAdmin({
                    type: "report",
                    report: state
                } as AdminQuizzResumeMessage);
                resolve();
                return;
            }

            if (isQuestion(state)) {
                channels.sendMessageToAdmin({
                    type: "question",
                    votes: quiz.getCurrentSingleQuestionResult()
                } as AdminNewQuestionMessage);
            } else {
                channels.sendMessageToAdmin({
                    type: "result",
                    votes: state
                } as AdminFinalQuestionResultMessage);
            }
            resolve();
        });
    }
}
