import {createAction, handleActions} from 'redux-actions';

// ACTION TYPES
const UPDATE_INFLUENCER_SELECTED = `${process.env.PUBLIC_URL}/INFLUENCER/UPDATE_INFLUENCER_SELECTED`;
const DELETE_INFLUENCER_SELECTED = `${process.env.PUBLIC_URL}/INFLUENCER/DELETE_INFLUENCER_SELECTED`;
const INSERT_INFLUENCER_SELECTED = `${process.env.PUBLIC_URL}/INFLUENCER/INSERT_INFLUENCER_SELECTED`;

export const influencerTypes = {
    UPDATE_INFLUENCER_SELECTED,
    DELETE_INFLUENCER_SELECTED,
    INSERT_INFLUENCER_SELECTED,
};

// ACTIONS
const updateInfluencersSelecteds = createAction(UPDATE_INFLUENCER_SELECTED);
const deleteInfluencersSelecteds = createAction(DELETE_INFLUENCER_SELECTED);
const insertInfluencersSelecteds = createAction(INSERT_INFLUENCER_SELECTED);

export const influencerActions = {
    updateInfluencersSelecteds,
    insertInfluencersSelecteds,
    deleteInfluencersSelecteds,
};

// INITIAL STATE
const initialState = {
    influencersSelected: [],
};

// REDUCERS
const reducer = handleActions({
    [DELETE_INFLUENCER_SELECTED]: (state, action) => {
        const influencersSelected = [];
        return {influencersSelected};
    },
    [INSERT_INFLUENCER_SELECTED]: (state, action) => {
        const selecteds = action.payload;
        return {selecteds};
    },
    [UPDATE_INFLUENCER_SELECTED]: (state, action) => {
        const selected = action.payload;
        const influencersSelected = Object.assign(state.influencersSelected);
        let exists = false;

        influencersSelected.forEachSync((influencer) => {
            if (influencer.userName === selected.userName) {
                exists = true;
            }
        });

        if (!exists) {
            influencersSelected.push(action.payload);
        }

        return {influencersSelected};
    },
}, initialState);

export default reducer;

// SELECTORS
const getInfluencersSelecteds = (state) => {
    return state.influencer.influencersSelected;
};

export const influencerSelectors = {
    getInfluencersSelecteds,
};