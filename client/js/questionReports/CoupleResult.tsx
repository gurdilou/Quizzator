import * as React from "react";
import {ChoicePickupResult, MegaQuestionAnimations, ResultToSingleQuestion} from "../../../server/shared/Question";
import {RoundImage} from "../widgets/RoundImage";

export type IconChoice = "heart" | "plus";

export namespace CoupleResult {
    export interface Props {
        left: ResultToSingleQuestion;
        right: ResultToSingleQuestion;
        animation: MegaQuestionAnimations;
    }

    export interface State {
        displayed: boolean;
    }
}


export class CoupleResult extends React.Component<CoupleResult.Props, CoupleResult.State> {

    constructor(props: CoupleResult.Props, context: any) {
        super(props, context);

        this.state = {
            displayed: false
        }
    }


    componentDidMount(): void {
        this.setState({
            displayed: true
        });
    }

    public render() {
        let elected: PickupCouple = this.getFirstAndSecondChoice();
        if (!elected.left || !elected.right) {
            return (
                <span>Pas de couple choisi :(</span>
            );
        }

        return (
            <div className={"couple-result " + (this.state.displayed ? "couple-result-displayed" : "")}>
                <div className="couple-result-top">
                    <div className="couple-result-top-left">
                        <RoundImage url={elected.left.choice.imageUrl} label={elected.left.choice.label}/>
                        <span className="couple-result-top-left-label">
                        {this.getShortLabel(elected.left.choice.label)}
                        </span>
                    </div>
                    <Icon bump={this.state.displayed} name={this.props.animation === "couple-plus" ? "plus" : "heart"}/>
                    <div className="couple-result-top-right">
                        <RoundImage url={elected.right.choice.imageUrl} label={elected.right.choice.label}/>
                        <span className="couple-result-top-right-label">
                        {this.getShortLabel(elected.right.choice.label)}
                        </span>
                    </div>
                </div>

                <div className="couple-result-equals">
                    {(elected.leftEquals || elected.rightEquals) &&
                    <span className="couple-result-equals-label">
                        À égalité avec
                    </span>
                    }
                    <div className="couple-result-equals-part couple-result-equals-part-first">
                        {elected.leftEquals &&
                        <React.Fragment>

                            {elected.leftEquals.map(item => {
                                return (
                                    <div key={item.choice.id}>{this.getShortLabel(item.choice.label)}</div>
                                );
                            })}
                        </React.Fragment>
                        }
                    </div>
                    <div className="couple-result-equals-part">
                        {elected.rightEquals &&
                        <React.Fragment>
                            {elected.rightEquals.map(item => {
                                return (
                                    <div key={item.choice.id}>{this.getShortLabel(item.choice.label)}</div>
                                );
                            })}
                        </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }

    private getShortLabel = (label: string) => {
        if (!label) {
            return "";
        }
        let commaIndex = label.indexOf(",");
        if (commaIndex > -1) {
            return label.slice(0, commaIndex);
        } else {
            return label;
        }
    };

    private getFirstAndSecondChoice = (): PickupCouple => {
        let elected: PickupCouple = {};
        if (this.props.left && this.props.left.rankedResults[1] && this.props.left.rankedResults[1].length) {
            elected.left = this.props.left.rankedResults[1][0];
            if (this.props.left.rankedResults[1].length > 1) {
                elected.leftEquals = this.props.left.rankedResults[1].slice(1)
            }
        }

        if (this.props.right && this.props.right.rankedResults[1] && this.props.right.rankedResults[1].length) {
            elected.right = this.props.right.rankedResults[1][0];
            if (this.props.right.rankedResults[1].length > 1) {
                elected.rightEquals = this.props.right.rankedResults[1].slice(1)
            }
        }

        return elected;
    };

}

interface PickupCouple {
    left?: ChoicePickupResult,
    right?: ChoicePickupResult
    leftEquals?: ChoicePickupResult[]
    rightEquals?: ChoicePickupResult[]
}


let Icon = (props: { bump: boolean, name: IconChoice }) => {
    return (
        <div className="couple-result-top-icon">
            <i className={"fa fa-" + props.name + " couple-result-top-icon-glyph  "
            + "couple-result-top-icon-glyph-" + props.name + " "
            + (props.bump ? ("couple-result-top-icon-glyph-" + props.name + "-bump") : "")}/>
            <span className="couple-result-top-icon-separator"> - </span>
        </div>
    );
};


