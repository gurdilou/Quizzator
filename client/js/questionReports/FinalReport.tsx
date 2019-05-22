import * as React from "react";
import {ResultToQuestion} from "../../../server/shared/Question";

export namespace FinalReport {
    export interface Props {
        report: ResultToQuestion[];
    }
}

export class FinalReport extends React.Component<FinalReport.Props> {

    constructor(props: FinalReport.Props, context: any) {
        super(props, context);
    }

    render(): React.ReactNode {
        return super.render();
    }
}
