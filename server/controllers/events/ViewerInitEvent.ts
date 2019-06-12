import {Quiz} from "../../models/Quiz";
import {CommunicationChannels} from "../spec/CommunicationChannels";
import {isQuestion} from "../../shared/Question";
import {
    ViewerEventQuestionResult,
    ViewerEventNewQuestion,
    ViewerNewParticipant,
    ViewerQuizResume
} from "../../shared/ViewerMessageReceive";

export class ViewerInitEvent {
    public static handle = (quiz: Quiz, viewer: WebSocket, channels: CommunicationChannels): Promise<any> => {
        return new Promise<any>((resolve) => {
            channels.registerNewViewer(viewer);

            if(quiz.isClosed()) {
                channels.sendMessageToSingleViewer({
                    type: "report",
                    report: quiz.getFinalReport()
                } as ViewerQuizResume, viewer);
                resolve();
                return;
            }


            let state = quiz.getQuizState();
            if (state === "waitingForQuizStart") {
                channels.sendMessageToSingleViewer({
                    type: "voterConnected",
                    numberOfVoters: channels.getNumberOfVoters()
                } as ViewerNewParticipant, viewer);
                resolve();
                return;
            }

            if (isQuestion(state)) {
                channels.sendMessageToSingleViewer({
                    type: "question",
                    votes: quiz.getCurrentSingleQuestionResult(),
                    partOfMegaQuestion: quiz.isCurrentQuestionAMegaQuestion()
                } as ViewerEventNewQuestion, viewer);
            } else {
                channels.sendMessageToSingleViewer({
                    type: "result",
                    votes: state
                } as ViewerEventQuestionResult, viewer);
            }

            resolve();
        });
    }
}
