import axios from 'axios';

const URL_DEFAULT = "campaign";

export default {
    get: async () => {
        const response = await axios.get(URL_DEFAULT);
        return response.data;
    },
    save: (campanha) => {
        axios.post(URL_DEFAULT, campanha);
    },
    saveAndStart: (campanha) => {
        axios.post(URL_DEFAULT + "/" + "save/start", campanha);
    },
}
