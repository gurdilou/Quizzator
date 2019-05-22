import * as React from "react";

export namespace Button {
    export interface Props {
        label: string;
        onClick?: () => void;
        loading?: boolean;
        type?: "button" | "submit";
        disabled?: boolean;
        align?: "center";
    }
}

export class Button extends React.Component<Button.Props> {

    constructor(props: Button.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        // TODO tlu : animate & co.
        return (
            <button
                className={"fancy-button " + (this.props.align ? "fancy-button-"+this.props.align : "")}
                type={this.props.type ? this.props.type : "button"}
                onClick={this.props.onClick} disabled={this.props.disabled}>
                {this.props.loading ? "loading...." : this.props.label}
            </button>
        )
    }
}
