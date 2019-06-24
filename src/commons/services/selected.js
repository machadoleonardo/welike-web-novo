import axios from 'axios';

const URL_DEFAULT = "selected";

export default {
    save: (selected) => {
        axios.post(URL_DEFAULT, selected);
    },
    findByCampignId: async (id) => {
        const response = await axios.get(URL_DEFAULT + "/campaign/" + id);
        return response.data;
    },
}
