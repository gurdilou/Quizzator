import {ResultToQuestion, ResultToSingleQuestion} from "./Question";

export interface ViewerMessageReceive {
    type: "question" | "result" | "vote" | "report" | "error" | "voterConnected";
}

export interface ViewerEventNewQuestion extends ViewerMessageReceive {
    type: "question";
    votes: ResultToSingleQuestion;
    partOfMegaQuestion: boolean;
}


export interface ViewerEventQuestionResult extends ViewerMessageReceive {
    type: "result";
    votes: ResultToQuestion;
}

export interface ViewerEventResultUpdate extends ViewerMessageReceive {
    type: "vote";
    votes: ResultToSingleQuestion;
    partOfMegaQuestion: boolean;
}

export interface ViewerQuizResume extends ViewerMessageReceive {
    type: "report";
    report: ResultToQuestion[];
}

export interface ViewerError extends ViewerMessageReceive {
    type: "error";
    msg: string;
    error?: string;
}

export interface ViewerNewParticipant extends ViewerMessageReceive {
    type: "voterConnected";
    numberOfVoters: number;
}
