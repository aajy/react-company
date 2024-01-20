import Banner from '../banner/Banner';
import Btns from '../btns/Btns';
import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import './MainWrap.scss';

export default function MainWrap() {
	return <div className='MainWrap'>
		<Visual />
		<Pics />
		<Banner />
		<Btns />
	</div>;
}
