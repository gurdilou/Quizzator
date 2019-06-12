import {
    Choice,
    ChoicePickupResult,
    isSingleQuestion,
    MegaQuestion,
    Question,
    QuestionKind,
    RankedResults,
    ResultToMegaQuestion,
    ResultToQuestion,
    ResultToSingleQuestion,
    VotersMap
} from "../shared/Question";
import {QuizState} from "../shared/QuizState";

// TODO tlu Remove choice id require
export class Quiz {
    private results: ResultToQuestion[] = [];
    private closed: boolean = false;

    private currentMegaQuestion: MegaQuestion & ResultToMegaQuestion;
    private currentQuestion: {
        question: Question,
        answers: RawVotes,
        votes: VotersMap
    };

    constructor(private questions: QuestionKind[]) {
        if (!questions || !questions.length) {
            throw new Error("Quizz must have questions.");
        }

    }

    /**
     * Start a new question.
     * If a question was ongoing, skip result part.
     */
    public startNextQuestion(): Question | null {
        if (this.currentQuestion != null || (this.currentMegaQuestion && !this.currentMegaQuestion.questions.length)) {
            this.archiveCurrentQuestionResult();
        }

        if (!this.questions.length) {
            return null;
        }


        if (this.currentMegaQuestion) {
            this.currentQuestion = {
                question: this.currentMegaQuestion.questions.splice(0, 1)[0],
                answers: {},
                votes: {}
            };
            return this.currentQuestion.question
        }

        let nextQuestionKind = this.questions.splice(0, 1)[0];
        if (isSingleQuestion(nextQuestionKind)) {
            this.currentQuestion = {
                question: nextQuestionKind,
                answers: {},
                votes: {}
            };
        } else {
            this.currentMegaQuestion = {
                ...nextQuestionKind as MegaQuestion,
                results: [],
                finished: false
            };
            this.currentQuestion = {
                question: this.currentMegaQuestion.questions.splice(0, 1)[0],
                answers: {},
                votes: {}
            };
        }
        return this.currentQuestion.question;
    }

    public closeCurrentQuestionVoting(): ResultToQuestion | ResultToMegaQuestion {
        return this.archiveCurrentQuestionResult();
    }

    public hasNextQuestion(): boolean {
        return (this.questions.length > 0) || (this.currentMegaQuestion && this.currentMegaQuestion.questions.length > 0);
    }

    public getFinalReport(): ResultToQuestion[] {
        return this.results;
    }

    /**
     *
     * @param voterId unique  id of the voter
     * @param choiceSelectedId id of the choice voter votes for
     *
     * @return true if vote has been taken into account.
     */
    public votesFor(voterId: string, choiceSelectedId: string) {
        if (!this.currentQuestion) {
            throw new Error("Quizz not started, or votes have been closed");
        }
        let choice = this.getChoiceFromId(choiceSelectedId);
        if (!choice) {
            console.error("Choice does not exist : " + choiceSelectedId);
            return;
        }
        if (this.currentQuestion.votes.hasOwnProperty(voterId)) {
            //ignore
            console.error("Voter already voted : " + voterId);
            return;
        }


        if (!this.currentQuestion.answers.hasOwnProperty(choiceSelectedId)) {
            this.currentQuestion.answers[choiceSelectedId] = {
                choice: choice,
                votes: 0,
                percentage: 0
            };
        }


        this.currentQuestion.votes[voterId] = choice;
        this.currentQuestion.answers[choiceSelectedId] = {
            ...this.currentQuestion.answers[choiceSelectedId],
            votes: this.currentQuestion.answers[choiceSelectedId].votes + 1
        };
    }


    private archiveCurrentQuestionResult(): ResultToQuestion | ResultToMegaQuestion {
        let questionResult = this.getCurrentSingleQuestionResult();
        this.currentQuestion = null;


        if (this.currentMegaQuestion) {
            this.currentMegaQuestion.results.push(questionResult);
            if (!this.currentMegaQuestion.questions.length) {
                this.currentMegaQuestion.finished = true;

                let result = {
                    results: this.currentMegaQuestion.results,
                    finished: true
                } as ResultToMegaQuestion;
                this.results.push(result);
                this.currentMegaQuestion = null;
                return result;
            } else {
                return {
                    results: this.currentMegaQuestion.results,
                    finished: false
                } as ResultToMegaQuestion;
            }
        } else {
            this.results.push(questionResult);
            return questionResult;
        }
    }


    private getChoiceFromId(choiceSelectedId: string) {
        return this.currentQuestion.question.choices.find(value => value.id === choiceSelectedId);
    }

    public getUserVote(voterId: string): Choice | null {
        let singleQuestionResult = this.getCurrentSingleQuestionResult();
        if (singleQuestionResult) {
            return singleQuestionResult.votes[voterId];
        }
        return null;
    }

    public getQuizState(): QuizState {
        if (this.currentQuestion != null) {
            // If question ongoing let user resume
            return this.currentQuestion.question;
        } else {
            if (this.results.length) {
                return this.results[this.results.length - 1];
            } else {
                return "waitingForQuizStart";
            }
        }
    }

    public isCurrentQuestionAMegaQuestion(): boolean {
        return this.currentMegaQuestion != null;
    }

    /**
     * Compute results...
     */
    public getCurrentSingleQuestionResult(): ResultToSingleQuestion {
        if (!this.currentQuestion) {
            return null;
        }

        let numberOfParticipants = Object.keys(this.currentQuestion.votes).length;
        let choiceVotesList: ChoicePickupResult[] = [];
        for (let choiceKey in this.currentQuestion.answers) {
            if (this.currentQuestion.answers.hasOwnProperty(choiceKey)) {
                let choiceVotes = this.currentQuestion.answers[choiceKey];
                choiceVotesList.push(choiceVotes);
                choiceVotes.percentage = choiceVotes.votes / numberOfParticipants;
            }
        }

        // Sort question according to numbers of votes
        choiceVotesList.sort((a, b) => {
            return (a.votes - b.votes);
        });

        //Generate ranked results
        let rankedResults: RankedResults = {};
        let currentRank = 1;
        let previousNumberOfVoters: number;
        for (let answer of choiceVotesList) {
            if (!previousNumberOfVoters || answer.votes === previousNumberOfVoters) {
                if (!rankedResults.hasOwnProperty(currentRank)) {
                    rankedResults[currentRank] = [];
                }
            } else {
                currentRank++;
                rankedResults[currentRank] = [];
            }
            rankedResults[currentRank].push(answer);
        }


        // Build final report
        return {
            question: this.currentQuestion.question,
            rankedResults: rankedResults,
            numberOfParticipants,
            votes: this.currentQuestion.votes
        };
    }

    public end() {
        this.closed = true;
    }

    public isClosed() {
        return this.closed;
    }
}

interface RawVotes {
    [choiceId: string]: ChoicePickupResult;
}
