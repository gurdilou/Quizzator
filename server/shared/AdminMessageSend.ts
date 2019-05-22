import {Question, ResultToQuestion, ResultToSingleQuestion} from "./Question";

export interface AdminMessageSend {
    type: "next" | "whatsup";
}

export interface AdminGoToNextMessage extends AdminMessageSend {
    type: "next";
}

export interface AdminInitEventMessage extends AdminMessageSend {
    type: "whatsup";
}
