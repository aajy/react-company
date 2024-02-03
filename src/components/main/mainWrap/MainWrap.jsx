import Header from '../../common/header/Header';
import Banner from '../banner/Banner';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import './MainWrap.scss';

export default function MainWrap() {
	return <div className='MainWrap'>
		<Header type={'main'}/>
		<Visual />
		<Info/>
		<Banner />
		<Pics />
	</div>;
}
