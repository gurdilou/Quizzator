import * as React from "react";
import {isResultToMegaQuestion, ResultToQuestion} from "../../../server/shared/Question";
import {SingleQuestionResult} from "./SingleQuestionResult";
import {MegaQuestionResult} from "./MegaQuestionResult";

export namespace QuestionResult {
    export interface Props {
        votes: ResultToQuestion;
    }
}

export class QuestionResult extends React.Component<QuestionResult.Props> {


    constructor(props: QuestionResult.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        if (isResultToMegaQuestion(this.props.votes)) {
            return (
                <MegaQuestionResult votes={this.props.votes}/>
            );
        } else {
            return (
                <SingleQuestionResult votes={this.props.votes} key={this.props.votes.question.key}/>
            )
        }
    }
}
