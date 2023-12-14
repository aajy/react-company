import { combineReducers } from 'redux';

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_MEMBERS":
			return {...state, members:action.payload}
		default:
			return state;
	}
};
const reducers = combineReducers({memberReducer})
export default reducers;
