import {createAction, handleActions} from 'redux-actions';

// ACTION TYPES
const UPDATE_INFLUENCER_SELECTED = `${process.env.PUBLIC_URL}/INFLUENCER/UPDATE_INFLUENCER_SELECTED`;

export const influencerTypes = {
    UPDATE_INFLUENCER_SELECTED,
};

// ACTIONS
const updateInfluencersSelecteds = createAction(UPDATE_INFLUENCER_SELECTED);

export const influencerActions = {
    updateInfluencersSelecteds,
};

// INITIAL STATE
const initialState = {
    influencersSelected: null,
};

// REDUCERS
const reducer = handleActions({
    [UPDATE_INFLUENCER_SELECTED]: (state, action) => {
        const influencersSelected = Object.assign(state.influencersSelected);
        influencersSelected.push(action.payload);
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