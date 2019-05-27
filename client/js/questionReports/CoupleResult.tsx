import * as React from "react";
import * as moize from "moize";
import {ResultToSingleQuestion} from "../../../server/shared/Question";

export interface CoupleResultProps {
    left: ResultToSingleQuestion;
    right: ResultToSingleQuestion;
}

let CoupleResultAbs = (props: CoupleResultProps) => {

    return (
        <div className={"couple-result"}>
            <div>
                {props.left.rankedResults[1][0].choice.label}
            </div>
            <div className={"couple-result-is-with"}>
                {"<3"}
            </div>
            <div>
                {props.right.rankedResults[1][0].choice.label}
            </div>
        </div>
    );

};

export let CoupleResult = moize.default.reactSimple(CoupleResultAbs);
