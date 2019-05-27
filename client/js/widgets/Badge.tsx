import * as React from "react";

export namespace RankBadge {
    export interface Props {
        rank: number;
    }
}

export class RankBadge extends React.PureComponent<RankBadge.Props> {

    constructor(props: RankBadge.Props, context: any) {
        super(props, context);

    }


    render(): React.ReactNode {
        let badges = [];
        for (let i = 0; i < 3; i++) {
            let rank = i + 1;
            badges.push(
                <div key={"rank-" + rank}
                     className={"rank-badge-" + rank + " rank-badge " + (this.props.rank !== rank ? "rank-badge-hidden" : "")}/>
            );
        }


        return (
            <div className={"rank-badge-container"}>
                {badges}
            </div>
        );
    }
}
