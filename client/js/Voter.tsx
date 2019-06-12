import * as React from "react";
import Websocket from 'react-websocket';
import {Choice, isQuestion, isResultToMegaQuestion, Question, ResultToQuestion} from "../../server/shared/Question";
import {QuestionResult} from "./questionReports/QuestionResult";
import {QuestionForm} from "./parts/QuestionForm";
import {VoterInitMessage, VoterVote} from "../../server/shared/VoterMessageSend";
import {
    VoterError,
    VoterIdMessage,
    VoterMessageReceive,
    VoterNewQuestion,
    VoterQuestionResult,
    VoterQuizResultMessage
} from "../../server/shared/VoterMessageReceive";
import {ErrorWidget} from "./parts/ErrorWidget";
import {SocketError} from "./spec/SocketError";
import {PageStub} from "./widgets/PageStub";
import {FinalReport} from "./questionReports/FinalReport";

export namespace Voter {
    export interface Props {

    }

    export interface State {
        show: "splash" | "question" | "result" | "error" | "resume";
        question: Question;
        vote: Choice;
        result: ResultToQuestion;
        resume: ResultToQuestion[];
        error: SocketError;
    }
}

export class Voter extends React.Component<Voter.Props, Voter.State> {
    private refWebSocket: any;
    private id: string = null;

    constructor(props: Voter.Props, context: any) {
        super(props, context);

        this.id = Voter.loadPreviouslySavedId();
        this.state = {
            show: "splash",
            question: null,
            vote: null,
            result: null,
            error: null,
            resume: null
        }
    }

    private readonly handleData = (msg: string) => {
        let data: VoterMessageReceive = JSON.parse(msg);
        switch (data.type) {
            case "newQuestion":
                this.setState({
                    show: "question",
                    question: (data as VoterNewQuestion).question,
                    vote: null,
                    result: null
                });
                break;
            case "result":
                this.setState({
                    show: "result",
                    question: null,
                    vote: null,
                    result: (data as VoterQuestionResult).result
                });
                break;
            case "id":
                let idMsg = (data as VoterIdMessage);
                this.id = idMsg.id;
                this.storeId();

                if (isQuestion(idMsg.currentState)) {
                    this.setState({
                        show: "question",
                        question: idMsg.currentState,
                        vote: idMsg.voterAnswer,
                        result: null
                    });
                } else if (Array.isArray(idMsg.currentState)) {
                    this.setState({
                        show: "resume",
                        question: null,
                        vote: null,
                        result: null,
                        resume: idMsg.currentState
                    });
                } else if (idMsg.currentState !== "waitingForQuizStart") {
                    this.setState({
                        show: "result",
                        question: null,
                        vote: null,
                        result: idMsg.currentState
                    });
                }
                break;
            case "error":
                this.setState({
                    show: "error",
                    question: null,
                    result: null,
                    error: {...data as VoterError}
                });
                break;
            case "resume":
                this.setState({
                    show: "resume",
                    question: null,
                    vote: null,
                    result: null,
                    resume: {...data as VoterQuizResultMessage}.resume
                });
                break;
            default:
                throw new Error("Not managed message : " + JSON.stringify(data));
        }
    };

    private readonly onVote = (choice: Choice) => {
        if (this.refWebSocket && this.id) {
            this.refWebSocket.sendMessage(JSON.stringify({
                choiceId: choice.id,
                type: "vote",
                clientId: this.id
            } as VoterVote));
            this.setState({
                vote: choice
            })
        }
    };

    render(): React.ReactNode {
        let config: {
            title: string,
            content: React.ReactElement<any>,
        };

        switch (this.state.show) {
            case "splash":
                config = {
                    title: "Quizz sur Paul et Pauline",
                    content: (
                        <div className="splash-screen">
                            <i className="fa fa-hourglass splash-screen-icon-spin fa-3x fa-fw"/>
                            <p className="splash-screen-waiting">
                                Le quizz va bientôt commencer...
                            </p>
                        </div>
                    )
                };
                break;
            case "question":
                config = {
                    title: this.state.question.label,
                    content: (
                        <QuestionForm question={this.state.question} onVote={!this.state.vote ? this.onVote : null}
                                      voted={this.state.vote}/>
                    )
                };
                break;
            case "result":
                config = {
                    title: isResultToMegaQuestion(this.state.result) ? "Résultat" : this.state.result.question.label,
                    content: (
                        <QuestionResult votes={this.state.result}/>
                    )
                };
                break;
            case "error":
                config = {
                    title: "Erreur :(",
                    content: (
                        <ErrorWidget error={this.state.error}/>
                    )
                };
                break;
            case "resume":
                config = {
                    title: "Merci d'avoir joué !",
                    content: (
                        <FinalReport report={this.state.resume}/>
                    )
                }
        }

        return (
            <PageStub title={config.title}>
                <Websocket url={Voter.computeWebSocketUrl()}
                           onMessage={this.handleData}
                           onOpen={() => {
                               this.refWebSocket.sendMessage(JSON.stringify({
                                   type: "whatsup",
                                   previousId: this.id ? this.id : null
                               } as VoterInitMessage));
                           }}
                           ref={(ref: any) => {
                               this.refWebSocket = ref;
                           }}
                />
                {config.content}
            </PageStub>
        )
    }

    private static loadPreviouslySavedId() {
        return sessionStorage.getItem("quiz-voter-id");
    }

    private storeId() {
        sessionStorage.setItem("quiz-voter-id", this.id);
    }

    private static computeWebSocketUrl() {
        let loc = window.location;
        let webSocketUri;
        if (loc.protocol === "https:") {
            webSocketUri = "wss:";
        } else {
            webSocketUri = "ws:";
        }
        webSocketUri += "//" + loc.host;
        webSocketUri += "/questions";
        return webSocketUri;
    }
}
