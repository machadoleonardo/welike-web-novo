import axios from 'axios';

const URL_DEFAULT = "campaign";

export default {
    get: async (id) => {
        const response = await axios.get(URL_DEFAULT + "/" + id);
        return response.data;
    },
    info: async (id) => {
        const response = await axios.get(URL_DEFAULT + "/info/" + id);
        return response.data;
    },
    list: async () => {
        const response = await axios.get(URL_DEFAULT);
        return response.data;
    },
    result: async () => {
        const response = await axios.get(URL_DEFAULT + "/result");
        return response.data;
    },
    save: (campanha) => {
        axios.post(URL_DEFAULT, campanha);
    },
    saveAndStart: (campanha) => {
        axios.post(URL_DEFAULT + "/" + "save/start", campanha);
    },
    start: (id) => {
        axios.post(URL_DEFAULT + "/" + "start/" + id);
    },
}
