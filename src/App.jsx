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

import { Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import { AnimatePresence } from 'framer-motion';
import Detail from './components/sub/youtube/Detail';
import Members from './components/sub/members/Members';
import Welcome from './components/sub/members/Welcome';

export default function App() {
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);
	const Dark = useSelector((store) => store.darkReducer.dark);

	const fetchDepartment = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		console.log('fetchDepartment: ', json.members);
		return dispatch({ type: types.MEMBERS.success, payload: json.members });
	};
	const fetchMenuText = async () => {
		const data = await fetch(`${path.current}/DB/menuText.json`);
		const json = await data.json();
		console.log('fetchMenuText: ', json.menuText);
		return dispatch({ type: types.MENUTEXT.success, payload: json.menuText });
	};
	const fetchYoutube = async () => {
		//TODO :: 검색 후 받은 데이터로 재검색해야 할 때
	};

	useEffect(() => {
		fetchDepartment();
		fetchMenuText();
	}, []);
	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route exact path='/youtube' component={Youtube} />
			<Route path='/youtube/detail/:id' component={Detail} />
			<Route path='/gallery' component={Gallery} />
			{/*TODO:: 게시글 검색 페이지 생성 <Route path='/community/search/:paramsKeyword' component={Contact} /> */}
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/welcome/:id' component={Welcome} />
			<Footer />
			<AnimatePresence>
				<Menu />
			</AnimatePresence>
		</div>
	);
}
