import api from "libs/api";

export const getUserData = async () => {
    return api.get("user/get");
};