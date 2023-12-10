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
import { useState } from 'react';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import { AnimatePresence } from 'framer-motion';
import Detail from './components/sub/youtube/Detail';

export default function App() {
	const [Dark, setDark] = useState(false);
	const [ToggleMenu, setToggleMenu] = useState(false);

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
			{/* <Route path='/gallery/:paramsKeyword' component={Gallery} /> */}
			<Route path='/community' component={Community} />
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
