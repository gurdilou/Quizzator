import {Omit} from "./Utils";

export type QuestionKind = Question | MegaQuestion;

export type MegaQuestionAnimations = "couple";

export interface Question {
    key: string;
    label: string;
    choices: Choice[];
}

export interface SingleQuestion extends Question {
    resultAnimation: "top3" | "top1";
}
export interface MegaQuestion{
    questions: Question[];
    resultAnimation: MegaQuestionAnimations;
}
export let isMegaQuestion = (data: any): data is Question => {
    return data.hasOwnProperty("questions")
        && data.hasOwnProperty("resultAnimation");
};


export let isQuestion = (data: any): data is Question => {
    return data.hasOwnProperty("label")
        && data.hasOwnProperty("choices");
};
export let isSingleQuestion = (data: any): data is SingleQuestion => {
    return isQuestion(data)
        && data.hasOwnProperty("resultAnimation");
};

export interface Choice {
    id: string;
    label: string;
    imageUrl?: string;
}



/**
 * Ranked results, in case of equality a rank can have numerous choices.
 */
export interface RankedResults {
    [rank: number]: ChoicePickupResult[];
}
export interface ChoicePickupResult {
    choice: Choice;
    votes: number;
    percentage: number;
}

export interface ResultToMegaQuestion {
    results: ResultToSingleQuestion[];
    finished: boolean;
    resultAnimation: MegaQuestionAnimations;
}

export let isResultToMegaQuestion = (data: any): data is ResultToMegaQuestion => {
    return data.hasOwnProperty("results")
        && data.hasOwnProperty("finished")
        && data.hasOwnProperty("resultAnimation");
};

export interface ResultToSingleQuestion {
    question : Omit<Question, "choices">;
    rankedResults: RankedResults;
    numberOfParticipants: number;
    votes: VotersMap
}

export type ResultToQuestion = ResultToSingleQuestion | ResultToMegaQuestion;

export interface VoterAnswer {
    question : Omit<Question, "choices">;
    vote: Choice;
}

export interface VotersMap {
    [voterId: string]: Choice;
}
