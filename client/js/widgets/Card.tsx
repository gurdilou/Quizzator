import * as React from "react";

export namespace Card {
    export interface Props {
        for: string;
        className: string
        margin: boolean;
        selected: boolean;
        hidden: boolean;
    }
}

export class Card extends React.Component<Card.Props> {
    private _root: HTMLElement;

    constructor(props: Card.Props, context: any) {
        super(props, context);
    }


    componentDidMount(): void {
        this._root.style.height = (this._root.offsetHeight - 2) + "px";
    }

    render(): React.ReactNode {
        let classList = ["card"];
        classList.push(this.props.className);
        if (this.props.margin) {
            classList.push("card-with-margin")
        }
        if (this.props.selected) {
            classList.push("card-selected");
        }
        if (this.props.hidden) {
            classList.push("card-hidden");
        }


        return (
            <label className={classList.join(" ")}
                   htmlFor={this.props.for}
                   ref={(e) => this._root = e}
            >
                {this.props.children}
            </label>
        )
    }
}
