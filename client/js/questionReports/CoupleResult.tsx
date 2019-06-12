import * as React from "react";
import {ChoicePickupResult, ResultToSingleQuestion} from "../../../server/shared/Question";
import {RoundImage} from "../widgets/RoundImage";

export namespace CoupleResult {
    export interface Props {
        left: ResultToSingleQuestion;
        right: ResultToSingleQuestion;
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
                        <RoundImage url={elected.left.choice.imageUrl}/>
                        <span className="couple-result-top-left-label">
                        {elected.left.choice.label}
                        </span>
                    </div>
                    <Heart bump={this.state.displayed}/>
                    <div className="couple-result-top-right">
                        <RoundImage url={elected.right.choice.imageUrl}/>
                        <span className="couple-result-top-right-label">
                        {elected.right.choice.label}
                        </span>
                    </div>
                </div>
                {elected.leftEquals &&
                <div className="couple-result-equals">
                    <span className="couple-result-equals-label">
                    À égalité avec {elected.left.choice.label} :
                    </span>

                    {elected.leftEquals.map(item => {
                        return (
                            <div key={item.choice.id}>{item.choice.label}</div>
                        );
                    })}
                </div>
                }
                {elected.rightEquals &&
                <div className="couple-result-equals">
                    <span className="couple-result-equals-label">
                    À égalité avec {elected.right.choice.label} :
                    </span>

                    {elected.rightEquals.map(item => {
                        return (
                            <div key={item.choice.id}>{item.choice.label}</div>
                        );
                    })}
                </div>
                }
            </div>
        );
    }

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


let Heart = (props: {bump: boolean}) => {
    return (
        <div className="couple-result-top-heart">
            <i className={"fa fa-heart couple-result-top-heart-icon "+(props.bump ? "couple-result-top-heart-icon-bump" : "")}/>
            <span className="couple-result-top-heart-separator"> - </span>
        </div>
    );
};


