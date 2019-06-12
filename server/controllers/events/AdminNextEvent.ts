import {Quiz} from "../../models/Quiz";
import {CommunicationChannels} from "../spec/CommunicationChannels";
import {isQuestion, isResultToMegaQuestion, isResultToSingleQuestion} from "../../shared/Question";
import {VoterNewQuestion, VoterQuestionResult, VoterQuizResultMessage} from "../../shared/VoterMessageReceive";
import {
    ViewerEventNewQuestion,
    ViewerEventQuestionResult,
    ViewerQuizResume
} from "../../shared/ViewerMessageReceive";

export class AdminNextEvent {
    public static handle = (quiz: Quiz, channels: CommunicationChannels): Promise<any> => {
        return new Promise<any>((resolve) => {
            let state = quiz.getQuizState();

            if (state === "waitingForQuizStart") {
                let question = quiz.startNextQuestion();

                channels.sendMessageToAllVoters({
                    type: "newQuestion",
                    question: question
                } as VoterNewQuestion);
                channels.sendMessageToAllViewers({
                    type: "question",
                    votes: quiz.getCurrentSingleQuestionResult(),
                    partOfMegaQuestion: quiz.isCurrentQuestionAMegaQuestion()
                } as ViewerEventNewQuestion);
                resolve();
            }
            if (Array.isArray(state)) {
                channels.sendMessageToAllVoters({
                    type: "resume",
                    resume: state
                } as VoterQuizResultMessage);
                channels.sendMessageToAllViewers({
                    type: "report",
                    report: state
                } as ViewerQuizResume);
                resolve();
            }


            if (isQuestion(state)) {
                let result = quiz.closeCurrentQuestionVoting();
                if (isResultToMegaQuestion(result) && !result.finished) {
                    let question = quiz.startNextQuestion();
                    channels.sendMessageToAllVoters({
                        type: "newQuestion",
                        question: question
                    } as VoterNewQuestion);
                    channels.sendMessageToAllViewers({
                        type: "question",
                        votes: quiz.getCurrentSingleQuestionResult(),
                        partOfMegaQuestion: quiz.isCurrentQuestionAMegaQuestion()
                    } as ViewerEventNewQuestion);

                } else {
                    channels.sendMessageToAllVoters({
                        type: "result",
                        result: result
                    } as VoterQuestionResult);
                    channels.sendMessageToAllViewers({
                        type: "result",
                        votes: result
                    } as ViewerEventQuestionResult)
                }

            }

            if (isResultToMegaQuestion(state) || isResultToSingleQuestion(state)) {
                if (quiz.hasNextQuestion()) {
                    let question = quiz.startNextQuestion();
                    channels.sendMessageToAllVoters({
                        type: "newQuestion",
                        question: question
                    } as VoterNewQuestion);
                    channels.sendMessageToAllViewers({
                        type: "question",
                        votes: quiz.getCurrentSingleQuestionResult(),
                        partOfMegaQuestion: quiz.isCurrentQuestionAMegaQuestion()
                    } as ViewerEventNewQuestion);
                } else {
                    quiz.end();
                    let finalReport = quiz.getFinalReport();
                    channels.sendMessageToAllVoters({
                        type: "resume",
                        resume: finalReport
                    } as VoterQuizResultMessage);
                    channels.sendMessageToAllViewers({
                        type: "report",
                        report: finalReport
                    } as ViewerQuizResume);
                }
            }
            resolve();
        });
    }
}
