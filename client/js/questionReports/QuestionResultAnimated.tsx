import * as React from "react";
import {isResultToMegaQuestion, ResultToQuestion} from "../../../server/shared/Question";

export namespace QuestionResultAnimated {
    export interface Props {
        votes: ResultToQuestion;
    }
}

export class QuestionResultAnimated extends React.Component<QuestionResultAnimated.Props> {

    constructor(props: QuestionResultAnimated.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        if (isResultToMegaQuestion(this.props.votes)) {
            return (
                <div>
                    {this.props.votes.results.map(result => {
                        return (
                            <div>
                                {JSON.stringify(result.rankedResults)}
                            </div>
                        )
                    })}
                </div>
            );
        } else {
            return (
                <div>
                    {JSON.stringify(this.props.votes.rankedResults)}
                </div>
            )
        }
    }

}
