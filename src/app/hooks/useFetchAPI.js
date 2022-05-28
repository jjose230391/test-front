import axios from "../../axios";

const url = process.env.REACT_APP_URL_API;

const getHeader = () => {
    if (JSON.parse(window.localStorage.getItem("token") !== null)) {
        const tokenData = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenData,
        };
        return headers;
    }
};

const errorHandle = function(e) {
    if (e.message === "Network Error") {
        return handleMsg({ response: { status: "offline" } });
    }
    switch (e.response.status) {
        case 500:
        case 503:
        case 401:
        case 404:
        case 406:
        case 400:
        case 403:
        case 422:
        case 420: {
            return handleMsg(e);
        }
        default:
            return "Network Error";
    }
};

const handleMsg = function(error) {
    return {
        message: error.response.data !== undefined ? error.response.data : null,
        status: error.response["status"],
    };
};

const useFetchAPI = () => {

    const get = async (domain) => {
        try {
            const body = {};
            const params = {};
            return await axios.get(`${url}/${domain}`, body, {
                params,
                headers: getHeader(),
            });
        } catch (error) {
            return errorHandle(error);
        }
    };

    const getById = async (domain, id) => {
        try {
            const body = {};
            const params = {};
            return await axios.get(`${url}/${domain}/${id}`, body, {
                params,
                headers: getHeader(),
            });
        } catch (error) {
            return errorHandle(error);
        }
    };

    const post = async (domain, body) => {
        try {
            const params = {};
            return await axios.post(`${url}/${domain}`, body, {
                params,
                headers: getHeader(),
            });
        } catch (error) {
            return error;
        }
    };

    const put = async (domain, body, id) => {
        try {
            const params = {};
            return await axios.put(`${url}/${domain}/${id}`, body, {
                params,
                headers: getHeader(),
            });
        } catch (error) {
            return errorHandle(error);
        }
    };

    const del = async (domain, id) => {
        try {
            const params = {};
            return await axios.delete(`${url}/${domain}/${id}`, {}, {
                params,
                headers: getHeader(),
            });
        } catch (error) {
            return errorHandle(error);
        }
    };

    return {get, getById, post, put, del};
};

export default useFetchAPI;