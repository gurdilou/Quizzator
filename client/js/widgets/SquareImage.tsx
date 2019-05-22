import * as React from "react";

export namespace SquareImage {
    export interface Props {
        url: string;
    }
}

export class SquareImage extends React.Component<SquareImage.Props> {

    constructor(props: SquareImage.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        return (
            <img src={this.props.url} className="square-image"/>
        );
    }
}
