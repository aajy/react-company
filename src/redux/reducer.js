import { combineReducers } from 'redux';

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_MEMBERS":
			return {...state, members:action.payload}
		default:
			return state;
	}
};
const menuReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_MENU":
			return {...state, menuTextArr:action.payload}
		default:
			return state;
	}
};
const reducers = combineReducers({memberReducer, menuReducer})
export default reducers;
