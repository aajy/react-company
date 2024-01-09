import Visual from '../visual/Visual';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Banner from '../banner/Banner';
import Btns from '../btns/Btns';
import './MainWrap.scss';
import Illust from '../illust/Illust';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Illust />
			<Banner />
			<Btns />
		</div>
	);
}
