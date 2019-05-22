import {Question, ResultToQuestion} from "./Question";

export type QuizState = "waitingForQuizStart" | Question | ResultToQuestion | ResultToQuestion[];
