import axios from "axios";

const REQUEST_TIMEOUT = 35_000;

const processResponse = (response) => {
    const status = response.status;
    if (status >= 200 && status < 300) {
        return response.data;
    } else if (status >= 300 && status <= 302) {
        // todo redirect
    } else {
        // process error
        if (response.data && response.data.code) {
            return response.data;
        } else if (response instanceof XMLHttpRequest) {
            return { code: 400, message: "Bad request" };
        } else {
            return { code: status, message: response.statusText };
        }
    }
};

const request = async (httpMethod, apiMethod, data = {}) => {
    const requestURL = `${APP_CONFIG.api.protocol}://${APP_CONFIG.api.host}/${apiMethod}`;
    const options = {
        method: httpMethod,
        url: requestURL,
        timeout: REQUEST_TIMEOUT,
        withCredentials: true
    };

    if (httpMethod === "get") {
        options.params = data;
    } else {
        options.data = data;
    }

    console.log(options, data);

    const res = await axios.request(options).catch(err => {
        const res = err.response ? err.response : err;
        console.log(processResponse(res));
        return Promise.reject(processResponse(res));
    });

    return processResponse(res);
};

const get = async (apiMethod, data) => {
    return await request("get", apiMethod, data);
};

const post = async (apiMethod, data) => {
    return await request("post", apiMethod, data);
};

const put = async (apiMethod, data) => {
    return await request("put", apiMethod, data);
};

const del = async (apiMethod, data) => {
    return await request("delete", apiMethod, data);
};

export default {
    get,
    post,
    put,
    del
};