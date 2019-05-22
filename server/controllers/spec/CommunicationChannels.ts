import {VoterMessageReceive} from "../../shared/VoterMessageReceive";
import {AdminMessageReceive} from "../../shared/AdminMessageReceive";

export interface CommunicationChannels {
    sendMessageToAllVoters: (msg: VoterMessageReceive) => void;
    sendMessageToAdmin: (msg: AdminMessageReceive) => void;
    sendMessageToSingleVoter: (msg: VoterMessageReceive, voter: WebSocket) => void;
    registerNewVoter: (voterSocket: WebSocket, voterId: string) => void;
    getNumberOfVoters: () => number;
}
