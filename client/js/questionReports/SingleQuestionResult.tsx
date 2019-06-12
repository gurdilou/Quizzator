import * as React from "react";
import {ChoicePickupResult, isResultToMegaQuestion, ResultToQuestion} from "../../../server/shared/Question";
import {Card} from "../widgets/Card";
import {SquareImage} from "../widgets/SquareImage";
import {RankBadge} from "../widgets/Badge";
import {ProgressBar} from "../widgets/ProgressBar";


const cardHeight = 130;


export namespace SingleQuestionResult {
    export interface Props {
        votes: ResultToQuestion;
        key: string;
    }
}

export class SingleQuestionResult extends React.Component<SingleQuestionResult.Props> {
    private keysDisplayed: string[] = [];

    constructor(props: SingleQuestionResult.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        let flattenedResults = this.flatten();
        let children = this.keysDisplayed.map(choiceKeyToDisplay => {
            if (flattenedResults.hasOwnProperty(choiceKeyToDisplay)) {
                let rankedResult = flattenedResults[choiceKeyToDisplay];
                delete flattenedResults[choiceKeyToDisplay];
                return (
                    <this.RankedCard rankedResult={rankedResult} key={rankedResult.key}/>
                )
            }
        });
        children = children.concat(Object.keys(flattenedResults).map(choiceKeyToDisplay => {
            let rankedResult = flattenedResults[choiceKeyToDisplay];
            this.keysDisplayed.push(choiceKeyToDisplay);
            return (
                <this.RankedCard rankedResult={rankedResult} key={rankedResult.key}/>
            )
        }));

        return (
            <div className="question-result"
                 style={{height: (cardHeight * children.length) + "px"}}>
                {children}
            </div>
        )
    }

    // noinspection JSUnusedLocalSymbols
    private RankedCard = (props: { rankedResult: PositionedResult }) => {
        let choice = props.rankedResult.choice.choice;
        return (
            <Card className="question-result-card" hidden={false} selected={false}
                  top={props.rankedResult.top} zIndex={1000 - props.rankedResult.rank}>
                {choice.imageUrl && <SquareImage url={choice.imageUrl}/>}
                <div className="question-result-choice">
                    <div className="question-result-choice-label">
                        <span className="question-result-choice-label-text">
                            {choice.label}
                        </span>
                        {props.rankedResult.rank <= 3 &&
                        <div className="question-result-choice-label-badge">
                            <RankBadge rank={props.rankedResult.rank}/>
                        </div>
                        }
                    </div>
                    <ProgressBar percent={props.rankedResult.choice.percentage * 100}/>
                </div>
            </Card>
        )
    };

    private flatten(): PositionedResultMap {
        let results: PositionedResultMap = {};
        if (!isResultToMegaQuestion(this.props.votes)) {
            for (let rank in this.props.votes.rankedResults) {
                if (this.props.votes.rankedResults.hasOwnProperty(rank)) {
                    let choiceAtThisRank = this.props.votes.rankedResults[rank];
                    choiceAtThisRank.forEach(item => {
                        results[item.choice.id] = {
                            key: item.choice.id,
                            top: Object.keys(results).length * cardHeight,
                            rank: +rank,
                            choice: item
                        };
                    });
                }
            }
            this.props.votes.rankedResults
        }

        return results;
    }
}

interface PositionedResult {
    key: string;
    top: number;
    rank: number;
    choice: ChoicePickupResult;
}

interface PositionedResultMap {
    [key: string]: PositionedResult;
}
