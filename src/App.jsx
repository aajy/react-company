import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import { AnimatePresence } from 'framer-motion';
import Detail from './components/sub/youtube/Detail';
import Members from './components/sub/members/Members';
import Welcome from './components/sub/members/Welcome';
import CookieModal from './components/common/cookieModal/CookieModal';
import { useGlobalData } from './hooks/useGlobalData';

export default function App() {
	const { Mode } = useGlobalData();
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<div
				className={`wrap ${Mode === 'LIGHT' ? 'LIGHT' : 'DARK'} ${useMedia()}`}
			>
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
				<CookieModal>
					<h1>Cookie</h1>
				</CookieModal>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
