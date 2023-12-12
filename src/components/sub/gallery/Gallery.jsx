import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Modal from '../../common/modal/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowRightDownLine, RiArrowRightUpLine } from 'react-icons/ri';
import { IoCheckmarkSharp } from 'react-icons/io5';

export default function Gallery() {
	const path = useRef(process.env.PUBLIC_URL);
	const myID = useRef('198783018@N02');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	const gap = useRef(20);
	const refSearchKeyword = useRef(null);
	const [SearchKeyword, setSearchKeyword] = useState('');
	const [Pics, setPics] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);
	const [IsMask, setIsMask] = useState(false);
	const [CheckedList, setCheckedList] = useState([]);

	const searchedKeywords = ['computer', 'keyboard', 'tea', 'grey'];
	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};
	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		if (refSearchKeyword.current) {
			refSearchKeyword.current.value = '';
			setSearchKeyword('');
		}
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};
	const handleMine = (e) => {
		if (e.target.classList.contains('on') || isUser.current === myID.current)
			return;
		isUser.current = myID.current;
		if (refSearchKeyword.current) {
			refSearchKeyword.current.value = '';
			setSearchKeyword('');
		}
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
		let keyword;
		e.preventDefault();
		activateBtn(e);
		keyword =
			e.target.tagName !== 'BUTTON'
				? e.target.innerText
				: refSearchKeyword.current.value;
		isUser.current = '';

		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		btns[btns.length - 1].classList.add('on');
		refSearchKeyword.current.value = keyword;
		setSearchKeyword(keyword);

		if (!keyword.trim()) return; //검색어없이 빈칸만 있을 때  fetching함수 호출 강제중지

		fetchFlickr({ type: 'search', keyword: keyword });
	};
	const handleResetInput = (e) => {
		if (refSearchKeyword.current) {
			refSearchKeyword.current.value = '';
		}
	};
	const fetchFlickr = async (opt) => {
		const num = 12;

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

	useEffect(() => {
		refSearchKeyword.current.value = null;
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<>
			<Layout title={'Gallery'} className={'Gallery'}>
				<div className='top'>
					<h2>
						CREATIVE
						<br />
						BOXING
						<br />
						CO<strong>&reg;</strong>
					</h2>
					<div>
						<form onSubmit={handleSearch} className='search'>
							<div>
								<input
									type='text'
									ref={refSearchKeyword}
									placeholder='Find out more interesting things!'
								/>
								<span onClick={handleResetInput}>
									<AiOutlineClose />
								</span>
							</div>
							<button onClick={handleSearch}>search</button>
						</form>
						<div>
							<h3>The Top Searched</h3>
							{/* TODO:: table 생성 후, 추천 검색어 입니다.
							검색어 관리 Modal을 여시겠습니까?로 검색어 관리 Modal open*/}
							<ul>
								{searchedKeywords.map((keyword, idx) => {
									return (
										<li key={keyword + idx} onClick={handleSearch}>
											{keyword}
											<AiOutlineClose />
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button className='on' onClick={handleMine}>
							My Gallery
						</button>
						<button
							onClick={() => {
								refSearchKeyword.current.focus();
							}}
						>
							Search
						</button>
					</nav>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry
						className={'frame'}
						options={{ transitionDuration: '0.5s', gutter: gap.current }}
					>
						{Pics.length === 0 ? (
							<div className='noPics'>
								<h2>
									No search results for that keyword.
									<RiArrowRightUpLine />
								</h2>
							</div>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id} className={IsMask ? 'mask' : ''}>
										<p>
											<span>{pic.id}</span>
											<span>{pic.secret}</span>
										</p>
										<h2>{pic.title}</h2>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
												onClick={() => {
													setOpen(true);
													setIndex(idx);
												}}
											/>

											<svg
												viewBox='0 0 350 350'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
											>
												<path
													fill-rule='evenodd'
													clip-rule='evenodd'
													d='M350 0H0C55.2285 0 100 44.7715 100 100V150C100 205.228 144.772 250 200 250H250C305.228 250 350 294.772 350 350V0Z'
												/>
											</svg>
											<label className='checkBox'>
												<input
													type='checkbox'
													onChange={(e) => {
														e.target.checked
															? setCheckedList((prevList) => [
																	...prevList,
																	{
																		id: pic.id,
																		title: pic.title,
																		server: pic.server,
																		secret: pic.secret,
																	},
															  ])
															: console.log('remove');
													}}
												/>
												<span className='checkbox-button'></span>
											</label>
										</div>
										<div className='profile'>
											<p onClick={handleUser}>
												<span>{pic.server}</span>
												<span>{pic.owner}</span>
											</p>
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
										</div>
									</article>
								);
							})
						)}
					</Masonry>
					<article className='info'>
						<h3>{SearchKeyword.toUpperCase() || 'KEYWORD'}</h3>
						<div className='topBottom'>
							<div>
								Mask
								<RiArrowRightDownLine />
							</div>
							<div
								className={`themeBox ${IsMask && 'mask'}`}
								onClick={() => setIsMask(!IsMask)}
							>
								<div className='ball'>{IsMask ? 'ON' : 'OFF'}</div>
							</div>
						</div>
						{/* TODO:: 
						input check 토글기능
						 checkedlist 에 x 버튼 
						 스크랩 바구니 열고 닫기
						 */}
						{CheckedList.length > 0 && (
							<div className='checkedList'>
								{CheckedList.map((pic, idx) => {
									return (
										<article>
											<div className='img'>
												<img
													src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
													alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
												/>
												{/* <span>x</span> */}
											</div>
										</article>
									);
								})}
							</div>
						)}
					</article>
				</section>
			</Layout>

			{Open && (
				<Modal Open={Open}>
					{Pics[Index] && (
						<>
							<div className='img'>
								<img
									src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
									alt={'img'}
								/>
							</div>
							<button
								className='closeMenu'
								onClick={() => setOpen(!Open)}
							></button>
							<div className='info'>
								<h2>{Pics[Index].title}</h2>
								<p>{Pics[Index].owner}</p>
								<div>
									<span>{Pics[Index].secret}</span>
									<img
										src={`http://farm${Pics[Index].farm}.staticflickr.com/${Pics[Index].server}/buddyicons/${Pics[Index].owner}.jpg`}
										alt='사용자 프로필 이미지'
										onError={(e) =>
											e.target.setAttribute(
												'src',
												'https://www.flickr.com/images/buddyicon.gif'
											)
										}
									/>
								</div>
							</div>
						</>
					)}
				</Modal>
			)}
		</>
	);
}
