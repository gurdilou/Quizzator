
export interface VoterMessageSend {
    type: "vote" | "whatsup";
}

export interface VoterVote extends VoterMessageSend {
    type: "vote";
    choiceId: string;
    clientId: string;
}

export interface VoterInitMessage extends VoterMessageSend{
    type: "whatsup";
    previousId: string | null;
}
