import socket from "libs/socket";

const sendMessage = async (msg) => socket.emit("", msg);