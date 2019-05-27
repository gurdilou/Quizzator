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
import {AdminGoToNextMessage, AdminInitEventMessage} from "../../server/shared/AdminMessageSend";
import {
    AdminError,
    AdminFinalQuestionResultMessage,
    AdminMessageReceive,
    AdminNewQuestionMessage, AdminNewVoterMessage,
    AdminQuizzResumeMessage,
    AdminVoterUpdateResultMessage
} from "../../server/shared/AdminMessageReceive";
import {SocketError} from "./spec/SocketError";
import {ErrorWidget} from "./parts/ErrorWidget";
import {PageStub} from "./widgets/PageStub";

export namespace Admin {
    export interface Props {

    }

    export interface State {
        state: "init" | "question" | "result" | "end" | "error";
        onGoingResult?: ResultToQuestion;
        report?: ResultToQuestion[];
        loading: boolean;
        error?: SocketError;
        secret: string;
        numberOfVoters: number;
    }
}

export class Admin extends React.Component<Admin.Props, Admin.State> {
    private refWebSocket: any;

    constructor(props: Admin.Props, context: any) {
        super(props, context);

        this.state = {
            state: "init",
            numberOfVoters: 0,
            loading: false,
            secret: null
        }
    }

    private readonly handleData = (msg: string) => {
        let data: AdminMessageReceive = JSON.parse(msg);
        switch (data.type) {
            case "voterConnected":
                if(this.state.state === "init") {
                    this.setState({
                        numberOfVoters: (data as AdminNewVoterMessage).numberOfVoters
                    });
                }
                break;
            case "question":
                this.setState({
                    state: "question",
                    onGoingResult: (data as AdminNewQuestionMessage).votes,
                    loading: false
                });
                break;
            case "result":
                this.setState({
                    state: "result",
                    onGoingResult: (data as AdminFinalQuestionResultMessage).votes,
                    loading: false
                });
                break;
            case "vote":
                this.setState({
                    state: "question",
                    onGoingResult: (data as AdminVoterUpdateResultMessage).votes,
                    loading: false
                });
                break;
            case "report":
                this.setState({
                    state: "end",
                    onGoingResult: undefined,
                    report: (data as AdminQuizzResumeMessage).report,
                    loading: false
                });
                break;
            case "error":
                this.setState({
                    state: "error",
                    onGoingResult: null,
                    report: null,
                    loading: false,
                    error: {...data as AdminError}
                });
                break;
            default:
                console.error("Message not handled : " + JSON.stringify(data));
        }
    };

    private readonly onNext = () => {
        if (this.refWebSocket) {
            this.setState({loading: true});
            this.refWebSocket.sendMessage(JSON.stringify({type: "next"} as AdminGoToNextMessage));
        }
    };

    render(): React.ReactNode {
        // if (!this.state.secret) {
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
                    title: "Bienvenue",
                    content: (
                        <div className="admin-waiting-start">
                            <p>
                                Nombre de joueurs : {this.state.numberOfVoters}
                            </p>
                            <p>
                                Pour commencer le quiz, appuyer sur "Commencer".
                            </p>
                        </div>
                    ),
                    buttonLabel: "Commencer"
                };
                break;
            case "question":
                config = {
                    title: this.getCurrentQuestionLabel(),
                    content: (
                        <div>
                            <h3>{this.getCurrentQuestionResult().numberOfParticipants} votants.</h3>
                            <QuestionResult votes={this.state.onGoingResult}/>
                        </div>
                    ),
                    buttonLabel: "Clore les votes."
                };
                break;
            case "result":
                config = {
                    title: this.getCurrentQuestionLabel(),
                    content: (
                        <QuestionResult votes={this.state.onGoingResult}/>
                    ),
                    buttonLabel: "Nouvelle question"
                };
                break;
            case "end":
                config = {
                    title: "Résultats",
                    content: (
                        <FinalReport report={this.state.report}/>
                    ),
                    buttonLabel: ""
                };
                break;
            case "error":
                config = {
                    title: "Erreur",
                    content: (
                        <ErrorWidget error={this.state.error}/>
                    ),
                    buttonLabel: ""
                };
                break;
        }

        return (
            <PageStub title={config.title}>
                <Websocket url={this.computeWebSocketUrl()}
                            onOpen={() => {
                                this.refWebSocket.sendMessage(JSON.stringify({type: "whatsup"} as AdminInitEventMessage));
                            }}
                           onMessage={this.handleData}
                           ref={(ref: any) => {
                               this.refWebSocket = ref;
                           }}
                />

                {config.content}

                {config.buttonLabel &&
                <Button onClick={this.onNext} label={config.buttonLabel} loading={this.state.loading} align="center"/>
                }
            </PageStub>
        )
    }

    private getCurrentQuestionLabel() {
        if (this.state.onGoingResult) {
            let questionResult: ResultToSingleQuestion = this.getCurrentQuestionResult();
            return questionResult.question.label;
        }
        return null;
    }

    private getCurrentQuestionResult(): ResultToSingleQuestion {
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
        webSocketUri += "/quizAdmin?secret=6154";
        return webSocketUri;
    }
}
