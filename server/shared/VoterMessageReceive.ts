import {Choice, Question, ResultToQuestion, VoterAnswer} from "./Question";
import {QuizState} from "./QuizState";

// TODO tlu : differentiate sender receiver

export interface VoterMessageReceive {
    type: "newQuestion" | "result" | "id" | "error" | "resume";
}

export interface VoterNewQuestion extends VoterMessageReceive {
    type: "newQuestion";
    question: Question;
}

export interface VoterQuestionResult extends VoterMessageReceive {
    type: "result";
    result: ResultToQuestion;
}

export interface VoterQuizResultMessage extends VoterMessageReceive {
    type: "resume";
    resume: ResultToQuestion[];
}


export interface VoterIdMessage extends VoterMessageReceive {
    type: "id";
    id: string;
    currentState: QuizState;
    voterAnswer?: Choice;
}
export interface VoterError extends VoterMessageReceive {
    type: "error";
    msg: string;
    error?: string;
}
