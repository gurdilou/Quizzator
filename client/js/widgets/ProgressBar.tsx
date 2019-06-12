import * as React from "react";
import * as moize from "moize";

export interface ProgressBarProps {
    /**
     * A number between 0 and 100.
     */
    percent: number;
}

let ProgressBarAbs = (props: ProgressBarProps) => {
    let percentRounded = Math.round(props.percent * 100) / 100;
    return (
        <div className="progress-bar">
            <div className="progress-bar-progress" style={{width: percentRounded + "%"}}>
                <span className="progress-bar-progress-on-background">
                {percentRounded}%
                </span>
            </div>
        </div>
    );
};

export let ProgressBar = moize.default.reactSimple(ProgressBarAbs);
