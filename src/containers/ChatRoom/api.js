import api from "libs/api";

export const getRoomData = async (data) => await api.get("room/get", data);