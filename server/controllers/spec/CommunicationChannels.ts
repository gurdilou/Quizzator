import {VoterMessageReceive} from "../../shared/VoterMessageReceive";
import {ViewerMessageReceive} from "../../shared/ViewerMessageReceive";

export interface CommunicationChannels {
    sendMessageToAllVoters: (msg: VoterMessageReceive) => void;
    sendMessageToAllViewers: (msg: ViewerMessageReceive) => void;

    sendMessageToSingleViewer: (msg: ViewerMessageReceive, viewer: WebSocket) => void;
    sendMessageToSingleVoter: (msg: VoterMessageReceive, voter: WebSocket) => void;

    registerNewViewer: (viewerSocket: WebSocket) => void;
    registerNewVoter: (voterSocket: WebSocket, voterId: string) => void;
    getNumberOfVoters: () => number;
}
