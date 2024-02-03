import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import * as types from './redux/action';

import { Route, Switch } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import { AnimatePresence } from 'framer-motion';
import Detail from './components/sub/youtube/Detail';
import Members from './components/sub/members/Members';
import Welcome from './components/sub/members/Welcome';
import CookieModal from './components/common/cookieModal/CookieModal';

export default function App() {
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);
	const Dark = useSelector((store) => store.darkReducer.dark);

	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		return dispatch({ type: types.MEMBERS.success, payload: json.members });
	},[dispatch]);
	const fetchMenuText = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/menuText.json`);
		const json = await data.json();
		return dispatch({ type: types.MENUTEXT.success, payload: json.menuText });
	}, [dispatch]);
	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 8;

		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		//playlist
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			const items = json.items;
			const newArray = items.map(item => {
        return { ...item, active: false };
			});
			return dispatch({ type: types.YOUTUBE.success, payload: newArray });
		} catch (err) {
			console.log(err);
		}
	}, [dispatch]);

	useEffect(() => {
		fetchDepartment();
		fetchMenuText();
		fetchYoutube();
	}, [fetchDepartment, fetchMenuText, fetchYoutube]);
	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Switch>
				<Route exact path='/' component={MainWrap} />
				<Route path='/' render={()=> <Header type={'sub'}/>} />
			</Switch>
			<Route path='/department' component={Department} />
			<Route exact path='/youtube' component={Youtube} />
			<Route path='/youtube/detail/:id' component={Detail} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/welcome/:id' component={Welcome} />
			<Switch>
				<Route exact path='/' render={()=> <Footer type={'main'}/>} />
				<Route path='/' render={()=> <Footer type={'sub'}/>} />
			</Switch>
			<AnimatePresence>
				<Menu />
			</AnimatePresence>
			<CookieModal>
				<h1>Cookie</h1>
				<p>This website uses cookies to ensure you get the best experience on our website.</p>
			</CookieModal>
		</div>
	);
}
