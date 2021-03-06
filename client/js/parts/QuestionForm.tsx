import * as React from "react";
import {Choice, Question} from "../../../server/shared/Question";
import {Button} from "../widgets/Button";
import {Card} from "../widgets/Card";
import {SquareImage} from "../widgets/SquareImage";

export namespace QuestionForm {
    export interface Props {
        question: Question;
        onVote: (choice: Choice) => void;
        voted?: Choice;
    }

    export interface State {
        vote: Choice | null;
    }
}

export class QuestionForm extends React.Component<QuestionForm.Props, QuestionForm.State> {

    constructor(props: QuestionForm.Props, context: any) {
        super(props, context);

        this.state = {
            vote: null
        }
    }

    render(): React.ReactNode {
        return (
            <form onSubmit={(event) => {
                    if (this.props.onVote) {
                        this.props.onVote(this.state.vote);
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }}
                className="voter-form"
            >

                {this.props.question.choices.map((item: Choice) => {
                    let hidden = false;
                    if (this.props.voted) {
                        hidden = (this.props.voted.id !== item.id);
                    }
                    let itemIsSelected = (item === this.state.vote) || (this.props.voted && item.id === this.props.voted.id);
                    let onClickCallback = null;
                    if (!this.props.voted) {
                        onClickCallback = () => {
                            this.setState({
                                vote: item
                            });
                        }
                    }
                    return (
                        <Card key={item.id} className={"voter-form-choice"}
                              selected={itemIsSelected}
                              onClick={onClickCallback}
                              hidden={hidden}>
                            {item.imageUrl && <SquareImage url={item.imageUrl}/>}
                            <div className="voter-form-choice-label">
                                <span className="voter-form-choice-label-text">
                                    {item.label}
                                </span>
                            </div>
                        </Card>
                    );
                })}
                <div className={"voter-form-footer"}>
                    <Button label={this.props.voted ? "Merci d'avoir voté" : "Voter"}
                            disabled={(this.state.vote == null) || (this.props.voted != null)}
                            type="submit" alignSelf="center"/>
                    {this.props.voted &&
                    <p>Les résultats seront bientôt affichés</p>
                    }
                </div>
            </form>
        );
    }
}
