import * as React from "react";

export namespace RoundImage {
    export interface Props {
        url: string;
    }
}

export class RoundImage extends React.Component<RoundImage.Props> {

    constructor(props: RoundImage.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        return (
            <img src={this.props.url} className={"round-image"} />
        )
    }
}
