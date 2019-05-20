import axios from '../http/axios';

const URL_DEFAULT = "dashboard";

export default {
    getDashboard: async () => {
        const response = await axios.get(URL_DEFAULT);
        return response.data;
    }
};