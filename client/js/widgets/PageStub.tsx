import * as React from "react";

export namespace PageStub {
    export interface Props {
        title: string;
    }
}

export class PageStub extends React.Component<PageStub.Props> {

    constructor(props: PageStub.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <div className="page-title">
                    <div className="page-title-header">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="page-title-fancy">&nbsp;</div>
                </div>
                {this.props.children}
            </React.Fragment>
        )
    }
}
