import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Members from './components/sub/members/Members';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';

function App() {
	return (
		<>
			<Header />
			<MainWrap />
			<Department />
			<Youtube />
			<Gallery />
			<Community />
			<Members />
			<Contact />
			<Footer />
		</>
	);
}

export default App;
