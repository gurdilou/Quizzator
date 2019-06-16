import * as React from "react";

export namespace RoundImage {
    export interface Props {
        url: string;
        label: string;
    }
}

export class RoundImage extends React.Component<RoundImage.Props> {

    constructor(props: RoundImage.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        if (!this.props.url) {
            return (
                <div style={{width: "120px", height: "120px"}}>
                    &nbsp;
                </div>
            );
        }

        return (
            <img src={this.props.url} className={"round-image"} alt={this.props.label}/>
        )
    }
}
