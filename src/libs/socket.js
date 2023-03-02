import { Manager } from 'socket.io-client';

const manager = new Manager(APP_CONFIG.api.socket, {
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 3_000
});

let socketInst;

const socket = () => {
    return;

    if (!socketInst) {
        socketInst = manager.socket("/");

        socketInst.on("connect", () => {
            console.log("Socket connected");
        });

        socketInst.on("disconnect", () => {
            console.log("Socket disconnected");
            // todo add reconnect
        });
    }

    return socketInst;
};

export default socket();