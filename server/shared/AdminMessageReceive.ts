import {ResultToQuestion, ResultToSingleQuestion} from "./Question";

export interface AdminMessageReceive {
    type: "question" | "result" | "vote" | "report" | "error" | "voterConnected";
}

export interface AdminNewQuestionMessage extends AdminMessageReceive {
    type: "question";
    votes: ResultToSingleQuestion;
}


export interface AdminFinalQuestionResultMessage extends AdminMessageReceive {
    type: "result";
    votes: ResultToQuestion;
}

export interface AdminVoterUpdateResultMessage extends AdminMessageReceive {
    type: "vote";
    votes: ResultToSingleQuestion;
}

export interface AdminQuizzResumeMessage extends AdminMessageReceive {
    type: "report";
    report: ResultToQuestion[];
}

export interface AdminError extends AdminMessageReceive {
    type: "error";
    msg: string;
    error?: string;
}

export interface AdminNewVoterMessage extends AdminMessageReceive {
    type: "voterConnected";
    numberOfVoters: number;
}
