import * as React from "react";
import Websocket from 'react-websocket';
import {
    isResultToMegaQuestion,
    ResultToMegaQuestion,
    ResultToQuestion,
    ResultToSingleQuestion
} from "../../server/shared/Question";
import {Button} from "./widgets/Button";
import {QuestionResult} from "./questionReports/QuestionResult";
import {FinalReport} from "./questionReports/FinalReport";
import {
    ViewerError,
    ViewerEventNewQuestion,
    ViewerEventQuestionResult,
    ViewerEventResultUpdate,
    ViewerMessageReceive,
    ViewerNewParticipant,
    ViewerQuizResume
} from "../../server/shared/ViewerMessageReceive";
import {SocketError} from "./spec/SocketError";
import {ErrorWidget} from "./parts/ErrorWidget";
import {PageStub} from "./widgets/PageStub";
import {AdminGoToNextMessage} from "../../server/shared/AdminMessageSend";
import {ViewerWhatsUpMessage} from "../../server/shared/ViewerMessageSend";

export namespace Viewer {
    export interface Props {
        isAdmin?: boolean;
    }

    export interface State {
        state: "init" | "question" | "result" | "end" | "error";
        onGoingResult?: ResultToQuestion;
        report?: ResultToQuestion[];
        loading: boolean;
        error?: SocketError;
        secret: string;
        numberOfVoters: number;
        partOfMegaQuestion?: boolean;
    }
}

export class Viewer extends React.Component<Viewer.Props, Viewer.State> {
    private refWebSocket: any;

    constructor(props: Viewer.Props, context: any) {
        super(props, context);

        this.state = {
            state: "init",
            numberOfVoters: 0,
            loading: false,
            secret: null
        }
    }

    private readonly handleData = (msg: string) => {
        let data: ViewerMessageReceive = JSON.parse(msg);
        switch (data.type) {
            case "voterConnected":
                if (this.state.state === "init") {
                    this.setState({
                        numberOfVoters: (data as ViewerNewParticipant).numberOfVoters
                    });
                }
                break;
            case "question":
                this.setState({
                    state: "question",
                    onGoingResult: (data as ViewerEventNewQuestion).votes,
                    loading: false,
                    partOfMegaQuestion: (data as ViewerEventNewQuestion).partOfMegaQuestion
                });
                break;
            case "result":
                this.setState({
                    state: "result",
                    onGoingResult: (data as ViewerEventQuestionResult).votes,
                    loading: false,
                    partOfMegaQuestion: false
                });
                break;
            case "vote":
                this.setState({
                    state: "question",
                    onGoingResult: (data as ViewerEventResultUpdate).votes,
                    loading: false,
                    partOfMegaQuestion: (data as ViewerEventResultUpdate).partOfMegaQuestion
                });
                break;
            case "report":
                this.setState({
                    state: "end",
                    onGoingResult: undefined,
                    report: (data as ViewerQuizResume).report,
                    loading: false,
                    partOfMegaQuestion: false
                });
                break;
            case "error":
                this.setState({
                    state: "error",
                    onGoingResult: null,
                    report: null,
                    loading: false,
                    error: {...data as ViewerError},
                    partOfMegaQuestion: false
                });
                break;
            default:
                console.error("Message not handled : " + JSON.stringify(data));
        }
    };

    private readonly onNext = () => {
        if (this.refWebSocket && this.props.isAdmin) {
            this.setState({loading: true});
            this.refWebSocket.sendMessage(JSON.stringify({type: "next"} as AdminGoToNextMessage));
        }
    };

    render(): React.ReactNode {
        // if (this.props.isAdmin && !this.state.secret) {
        //     return (
        //         <div>
        //             <h3>Set admin secret token</h3>
        //             <input type="password" name="it_is_a_secret" onChange={(event: React.ChangeEvent<any>) => {
        //                 if (event.target.value.length === 4) {
        //                     this.setState({
        //                         secret: event.target.value
        //                     });
        //                 }
        //             }}/>
        //         </div>
        //     );
        // }


        let config: {
            title: string,
            content: React.ReactElement<any>,
            buttonLabel: string,
        };
        switch (this.state.state) {
            case "init":
                config = {
                    title: "En attente des joueurs",
                    content: (
                        <WaitingStart playersCounter={this.state.numberOfVoters} isAdmin={this.props.isAdmin}/>
                    ),
                    buttonLabel: this.props.isAdmin ? "Commencer" : null
                };
                break;
            case "question":
                config = {
                    title: this.getCurrentQuestionLabel(),
                    content: (
                        <div className={"viewer-result "+((this.state.partOfMegaQuestion && !this.props.isAdmin) ? "viewer-result-fill" : "")}>
                            <VoterCounter votesCount={this.getCurrentSingleQuestionResult().numberOfParticipants}/>
                            {
                                (this.state.partOfMegaQuestion && !this.props.isAdmin) ?
                                    <HiddenResult/> : <QuestionResult votes={this.state.onGoingResult}/>
                            }
                        </div>
                    ),
                    buttonLabel: this.props.isAdmin ? "Clore les votes" : null
                };
                break;
            case "result":
                config = {
                    title: this.getCurrentQuestionLabel(),
                    content: (
                        <QuestionResult votes={this.state.onGoingResult}/>
                    ),
                    buttonLabel: this.props.isAdmin ? "Démarrer une nouvelle question" : null
                };
                break;
            case "end":
                config = {
                    title: "Terminé !",
                    content: (
                        <FinalReport report={this.state.report}/>
                    ),
                    buttonLabel: null
                };
                break;
            case "error":
                config = {
                    title: "Erreur",
                    content: (
                        <ErrorWidget error={this.state.error}/>
                    ),
                    buttonLabel: null
                };
                break;
        }

        return (
            <PageStub title={config.title}>
                <Websocket url={this.computeWebSocketUrl()}
                           onOpen={() => {
                               this.refWebSocket.sendMessage(JSON.stringify({type: "whatsup"} as ViewerWhatsUpMessage));
                           }}
                           onMessage={this.handleData}
                           ref={(ref: any) => {
                               this.refWebSocket = ref;
                           }}
                />

                {config.content}

                {config.buttonLabel &&
                <Button onClick={this.onNext} label={config.buttonLabel} loading={this.state.loading}
                        alignSelf="center"/>
                }
            </PageStub>
        )
    }

    private getCurrentQuestionLabel() {
        if (this.state.onGoingResult) {
            let questionResult: ResultToSingleQuestion = this.getCurrentSingleQuestionResult();
            return questionResult.question.label;
        }
        return null;
    }

    private getCurrentSingleQuestionResult(): ResultToSingleQuestion {
        if (isResultToMegaQuestion(this.state.onGoingResult)) {
            let megaQuestion: ResultToMegaQuestion = this.state.onGoingResult;
            return megaQuestion.results[megaQuestion.results.length - 1];
        } else {
            return this.state.onGoingResult;
        }
    }

    private computeWebSocketUrl() {
        let loc = window.location;
        let webSocketUri;
        if (loc.protocol === "https:") {
            webSocketUri = "wss:";
        } else {
            webSocketUri = "ws:";
        }
        webSocketUri += "//" + loc.host;
        if (this.props.isAdmin) {
            webSocketUri += "/quizAdmin?secret=6154";
        } else {
            webSocketUri += "/quizViewer";
        }
        return webSocketUri;
    }
}


let WaitingStart = (props: { playersCounter: number, isAdmin: boolean }) => {
    return (
        <div className="viewer-waiting-start">
            <div className="viewer-waiting-start-counter">
                <i className="fa fa-2x fa-plug viewer-waiting-start-counter-icon"/>
                <span className="viewer-waiting-start-counter-label">
                    {props.playersCounter} personnes connectée{props.playersCounter > 1 ? "s" : ""}...
                </span>
            </div>
            {props.isAdmin &&
            <div className="viewer-waiting-start-hint">
                <span className="viewer-waiting-start-hint-label">
                    Pour commencer le quiz, appuyer sur "Commencer".
                </span>
                <i className="fa fa-3x fa-arrow-down"/>
            </div>
            }
        </div>
    )
};

let VoterCounter = (props: { votesCount: number }) => {
    return (
        <div className="viewer-voter-count">
            <i className="fa fa-envelope-o viewer-voter-count-icon"/>
            <span className="viewer-voter">
                {props.votesCount} vote{props.votesCount > 1 ? "s" : ""}
            </span>
        </div>
    );
};

let HiddenResult = () => {
    return (
        <div className="viewer-result-secret">
            <i className="fa fa-5x fa-user-secret viewer-result-secret-icon"/>
            <span className={"viewer-result-secret-label"}>Le résultat est masqué pour l'instant</span>
        </div>
    );
};
