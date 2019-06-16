import * as React from "react";

export namespace ErrorBoundary {
    export interface Props {

    }

    export interface State {
        error?: any;
        info?: any;
    }
}

export class ErrorBoundary extends React.Component<ErrorBoundary.Props, ErrorBoundary.State> {

    constructor(props: ErrorBoundary.Props, context: any) {
        super(props, context);

        this.state = {};

    }


    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({
            error: error,
            info: errorInfo
        });
    }

    render(): React.ReactNode {
        if (this.state.error) {
            return (
                <div>
                    <h2>{this.state.error.message}</h2>
                    <p>
                        Rafraîchissez la page pour reprendre le quiz.
                    </p>
                    <p>
                        Détails techniques :
                    </p>
                    <p>
                        {JSON.stringify(this.state.error)}
                    </p>
                    <p>
                        {JSON.stringify(this.state.info)}
                    </p>
                </div>
            )
        }
        return this.props.children;
    }
}
