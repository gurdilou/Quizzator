import * as React from "react";
import {isResultToMegaQuestion, ResultToQuestion} from "../../../server/shared/Question";
import * as moize from "moize";
import {CoupleResult} from "./CoupleResult";
import {Card} from "../widgets/Card";
import {SquareImage} from "../widgets/SquareImage";

export interface FinalReportProps {
    report: ResultToQuestion[];
}

let FinalReportAbs = (props: FinalReportProps) => {
    let index = 0;
    if (!props.report) {
        return null;
    }

    return (
        <React.Fragment>
            <span className="final-report-intro">
                Résumé des réponses
            </span>

            {props.report.map(item => {
                index++;
                if (isResultToMegaQuestion(item)) {
                    switch (item.resultAnimation) {
                        case "couple-heart":
                        case "couple-plus":
                            let left = item.results[0];
                            let right = item.results[1];
                            return (
                                <div key={left.question.key + "-" + right.question.key} className={"final-report-item"}>
                                    <Index index={index}/>
                                    <span className="final-report-item-question-label">
                                        {left.question.label}
                                        <br/>
                                        {right.question.label}
                                    </span>
                                    <div className="final-report-item-result">
                                        <CoupleResult left={left} right={right} animation={item.resultAnimation}/>
                                    </div>
                                </div>
                            );
                    }
                    return null;
                } else {
                    let firsts = item.rankedResults[1];
                    if (!firsts || !firsts.length) {
                        return (
                            <div key={item.question.key} className={"final-report-item"}>
                                <Index index={index}/>
                                <span className="final-report-item-question-label">
                                    Pas de résultat...
                                </span>
                            </div>
                        )
                    }
                    return (
                        <div key={item.question.key} className={"final-report-item"}>
                            <Index index={index}/>
                            <span className="final-report-item-question-label">
                                {item.question.label}
                            </span>

                            <div className="final-report-item-result">
                                {firsts.map(firstItem => {
                                    return (
                                        <Card key={firstItem.choice.id}>
                                            {firstItem.choice.imageUrl &&
                                            <SquareImage url={firstItem.choice.imageUrl}/>}
                                            <span
                                                className={"final-report-item-result-label " + (firstItem.choice.imageUrl ? "" : "final-report-item-result-label-only")}>
                                                {firstItem.choice.label}
                                            </span>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            })}

            <span className="final-report-outro">
                Vive les mariés !
            </span>
        </React.Fragment>
    );
};

let Index = (props: { index: number }) => {
    return (
        <div className="final-report-item-index">
            <span className="final-report-item-index-badge">{props.index}</span>
            <hr className="final-report-item-index-rule"/>
        </div>
    )
};


export let FinalReport = moize.default.reactSimple(FinalReportAbs);
