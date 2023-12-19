import { combineReducers } from 'redux';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};
const menuTextReducer = (state = { menuTextArr: [] }, action) => {
	switch (action.type) {
		case 'SET_MENUTEXT':
			return { ...state, menuTextArr: action.payload };
		default:
			return state;
	}
};
const menuReducer = (state = { menu: false }, action) => {
	switch (action.type) {
		case 'SET_MENU':
			return { ...state, menu: action.payload };
		default:
			return state;
	}
};
const reducers = combineReducers({
	memberReducer,
	menuTextReducer,
	menuReducer,
});
export default reducers;
