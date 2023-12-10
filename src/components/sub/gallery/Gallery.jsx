import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';

export default function Gallery() {
	const myID = useRef('198783018@N02');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	const gap = useRef(20);
	const [Pics, setPics] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};
	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};
	const handleMine = (e) => {
		if (e.target.classList.contains('on') || isUser.current === myID.current)
			return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};
	const handleUser = (e) => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};
	const handleSearch = (e) => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return; //검색어없이 빈칸만 있을 때  fetching함수 호출 강제중지
		e.target.children[0].value = ''; //검색 후 input에 입력한 값 삭제
		fetchFlickr({ type: 'search', keyword: keyword });
	};
	const fetchFlickr = async (opt) => {
		const num = 50;

		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;
		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);
		const data = await fetch(url);
		const json = await data.json();

		setPics(json.photos.photo);
	};

	const openModal = (e) => {
		setOpen(true);
	};

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<>
			<Layout title={'Gallery'} className={'Gallery'}>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button className='on' onClick={handleMine}>
							My Gallery
						</button>
					</nav>
					<form onSubmit={handleSearch}>
						<input type='text' placeholder='Search' />
						<button className='btnSearch'>
							<LuSearch />
						</button>
					</form>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry
						className={'frame'}
						options={{ transitionDuration: '0.5s', gutter: gap.current }}
					>
						{Pics.length === 0 ? (
							<h2>해당 키워드 검색결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}
										>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
											/>
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={(e) =>
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													)
												}
											/>
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout>

			{/* <Modal Open={Open} setOpen={setOpen}>
				{Pics[Index] && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt={'img'}
					/>
				)}
			</Modal> */}
		</>
	);
}
