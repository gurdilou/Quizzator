import * as React from "react";

declare module "react-websocket" {
    export interface WebSocketProps {
        url: string;
        onMessage: (data: any) => void;
        onOpen?: () => void;
        onClose?: () => void;
        /**
         * Dev only, default is false.
         */
        debug?: boolean;
        /**
         * Default is true.
         */
        reconnect?: boolean;
    }
    let  Websocket: (props: WebSocketProps) => React.Component<WebSocketProps>;

}
export default Websocket;
