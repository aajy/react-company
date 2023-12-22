import { combineReducers } from 'redux';
import * as types from './action';

const memberReducer = (state = { members: {} }, action) => {
	if (action.type === types.MEMBERS.start) return state;
	else if (action.type === types.MEMBERS.success)
		return { ...state, members: action.payload };
	else if (action.type === types.MEMBERS.fail)
		return { ...state, members: action.payload };
	else return state;
};
const menuTextReducer = (state = { menuText: [] }, action) => {
	if (action.type === types.MENUTEXT.start) return state;
	else if (action.type === types.MENUTEXT.success)
		return { ...state, menuText: action.payload };
	else if (action.type === types.MENUTEXT.fail)
		return { ...state, menuText: action.payload };
	else return state;
};
const menuReducer = (state = { menu: false }, action) => {
	if (action.type === types.MENU.start)
		return { ...state, menu: action.payload };
	else return state;
};
const darkReducer = (state = { dark: false }, action) => {
	if (action.type === types.DARK.start)
		return { ...state, dark: action.payload };
	else return state;
};
const youtubeReducer = (state = { youtube: [] }, action) => {
	if (action.type === types.YOUTUBE.start) return state;
	else if (action.type === types.YOUTUBE.success)
		return { ...state, youtube: action.payload };
	else if (action.type === types.YOUTUBE.fail)
		return { ...state, youtube: action.payload };
	else return state;
};
const reducers = combineReducers({
	memberReducer,
	menuTextReducer,
	menuReducer,
	darkReducer,
	youtubeReducer,
});
export default reducers;
