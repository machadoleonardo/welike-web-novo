import axios from 'axios';

const URL_DEFAULT = "selected";

export default {
    save: (selected) => {
        axios.post(URL_DEFAULT, selected);
    },
}
