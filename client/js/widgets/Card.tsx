import * as React from "react";
import {CSSProperties} from "react";

export namespace Card {
    export interface Props {
        onClick?: () => void;
        className?: string
        selected?: boolean;
        hidden?: boolean;
        top?: number;
        zIndex?: number;
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


    private readonly _onClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render(): React.ReactNode {
        let classList = ["card"];
        let style: CSSProperties = {};
        if (this.props.className) {
            classList.push(this.props.className);
        }
        if (this.props.onClick) {
            classList.push("card-can-be-selected");
        }
        if (this.props.selected) {
            classList.push("card-selected");
        }
        if (this.props.hidden) {
            classList.push("card-hidden");
        }
        if (this.props.top != null) {
            classList.push("card-absolute");
            style.top = this.props.top + "px";
        }
        if(this.props.zIndex != null) {
            style.zIndex = this.props.zIndex;
        }


        return (
            <div className={classList.join(" ")}
                 style={style}
                 ref={(e) => this._root = e}
                 onClick={this._onClick}
            >
                {this.props.children}
            </div>
        )
    }
}
