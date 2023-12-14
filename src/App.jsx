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

import { Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import { AnimatePresence } from 'framer-motion';
import Detail from './components/sub/youtube/Detail';
import Members from './components/sub/members/Members';

export default function App() {
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);
	const [Dark, setDark] = useState(false);
	const [ToggleMenu, setToggleMenu] = useState(false);

	const fetchDepartment = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: 'SET_MEMBERS', payload: json });
	};
	const fetchMenu = () => {
		fetch(`${path.current}/DB/menuText.json`)
		.then(data => data.json())
		.then(json => {
			console.log('menu',json.menuTextArr);
			dispatch({ type: 'SET_MENU', payload: json.menuTextArr})
		})
	};
	useEffect(()=>{
		fetchDepartment();
		fetchMenu();
	},[])
	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header
				isDark={Dark}
				setDark={() => setDark(!Dark)}
				ToggleMenu={ToggleMenu}
				setToggleMenu={setToggleMenu}
			/>
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route exact path='/youtube' component={Youtube} />
			<Route path='/youtube/detail/:id' component={Detail} />
			<Route path='/gallery' component={Gallery} />
			{/*TODO:: 게시글 검색 페이지 생성 <Route path='/community/search/:paramsKeyword' component={Contact} /> */}
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Footer />
			<AnimatePresence>
				{ToggleMenu && (
					<Menu
						isDark={Dark}
						setDark={() => setDark(!Dark)}
						setToggleMenu={setToggleMenu}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
