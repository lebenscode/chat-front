import api from "libs/api";

export const login = async (data) => {
    return api.post("login", data);
};