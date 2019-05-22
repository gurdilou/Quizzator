import {Quiz} from "../../models/Quiz";
import {CommunicationChannels} from "../spec/CommunicationChannels";
import {isQuestion, isResultToMegaQuestion} from "../../shared/Question";
import {VoterNewQuestion, VoterQuestionResult, VoterQuizResultMessage} from "../../shared/VoterMessageReceive";
import {
    AdminFinalQuestionResultMessage,
    AdminNewQuestionMessage,
    AdminQuizzResumeMessage
} from "../../shared/AdminMessageReceive";

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
                channels.sendMessageToAdmin({
                    type: "question",
                    votes: quiz.getCurrentSingleQuestionResult()
                } as AdminNewQuestionMessage);
                resolve();
            }
            if (Array.isArray(state)) {
                channels.sendMessageToAllVoters({
                    type: "resume",
                    resume: state
                } as VoterQuizResultMessage);
                channels.sendMessageToAdmin({
                    type: "report",
                    report: state
                } as AdminQuizzResumeMessage);
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
                    channels.sendMessageToAdmin({
                        type: "question",
                        votes: quiz.getCurrentSingleQuestionResult()
                    } as AdminNewQuestionMessage);

                } else {
                    channels.sendMessageToAllVoters({
                        type: "result",
                        result: result
                    } as VoterQuestionResult);
                    channels.sendMessageToAdmin({
                        type: "result",
                        votes: result
                    } as AdminFinalQuestionResultMessage)
                }

            }
            resolve();
        });
    }
}
