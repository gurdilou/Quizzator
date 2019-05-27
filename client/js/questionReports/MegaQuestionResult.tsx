import * as React from "react";
import {ResultToMegaQuestion} from "../../../server/shared/Question";
import {CoupleResult} from "./CoupleResult";

export namespace MegaQuestionResult {
    export interface Props {
        votes: ResultToMegaQuestion;
    }
}

export class MegaQuestionResult extends React.Component<MegaQuestionResult.Props> {

    constructor(props: MegaQuestionResult.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        // noinspection JSRedundantSwitchStatement
        switch (this.props.votes.resultAnimation) {
            case "couple":
                return (
                    <CoupleResult left={this.props.votes.results[0]} right={this.props.votes.results[1]}/>
                );
        }
    }
}
