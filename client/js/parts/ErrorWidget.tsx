import * as React from "react";
import {SocketError} from "../spec/SocketError";

export namespace ErrorWidget {
    export interface Props {
        error: SocketError;
    }
}

export class ErrorWidget extends React.Component<ErrorWidget.Props> {

    constructor(props: ErrorWidget.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <h2>
                    {this.props.error.msg}
                </h2>
                <p>
                    Rafraîchissez la page pour reprendre le quiz.
                </p>
                {this.props.error.error &&
                    <p>
                        {this.props.error.error}
                    </p>
                }
            </React.Fragment>

        );
    }
}
