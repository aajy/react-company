import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { AiFillPlusCircle } from 'react-icons/ai';
import { TfiPlus } from 'react-icons/tfi';
import { PiPercentLight } from 'react-icons/pi';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
	useYoutubeChannelDataQuery,
	useYoutubeChannelIdQuery,
	useYoutubeQuery,
} from '../../../hooks/useYoutubeQuery';

export default function Youtube() {
	const shortenText = useCustomText('shorten');
	const path = useRef(process.env.PUBLIC_URL);
	const [ChannelTitle, setChannelTitle] = useState('');
	const [Vids, setVids] = useState({});
	const [ActiveVids, setActiveVids] = useState({});
	const [IsActive, setIsActive] = useState(true);
	const OriginVids = useRef(null);
	const refSearchKeyword = useRef(null);
	const [SearchResult, setSearchResult] = useState(true);
	const [Opt, setOpt] = useState(null);
	const vidIdForChannelId = 'uIZHsUT43l4';
	const [ChannelId, setChannelId] = useState();

	const { data: ChannelIdData, isSuccess: isChannelIdData } =
		useYoutubeChannelIdQuery(vidIdForChannelId);

	useEffect(() => {
		if (isChannelIdData) {
			setChannelId(ChannelIdData.channelId);
			setChannelTitle(ChannelIdData.channelTitle);
		}
	}, [isChannelIdData]);

	const { data: ChannelData, isSuccess: isChannelData } =
		useYoutubeChannelDataQuery(ChannelId);

	const { data: YoutubeData, isSuccess: isYoutube } = useYoutubeQuery(Opt);

	useEffect(() => {
		if (isYoutube) {
			if (Opt && Opt.length) {
				if (YoutubeData.length > 0) {
					setSearchResult(true);
					setVids((prevVids) => [...prevVids.slice(0, 3), ...YoutubeData]);
				} else {
					setSearchResult(false);
					setVids((prevVids) => [...prevVids.slice(0, 3)]);
				}
			} else {
				const originalArr = YoutubeData;
				const newArray = originalArr.map((item, index) => {
					if (index === 0) {
						return { ...item, active: true };
					}
					return item;
				});
				setVids(newArray);
				OriginVids.current = newArray;
				setActiveVids(YoutubeData[0]);
			}
		}
	}, [isYoutube]);

	const searchYoutube = (e) => {
		e.preventDefault();
		if (refSearchKeyword.current.value.trim().length) {
			setOpt(refSearchKeyword.current.value.trim());
		} else {
			alert('검색어를 입력해주세요.');
		}
	};
	const resetSearch = () => {
		setSearchResult(true);
		refSearchKeyword.current.value = '';
		setVids((prevVids) => [
			...prevVids.slice(0, 3),
			...OriginVids.current.slice(3, 7),
		]);
	};
	const formatNumberWithK = (number, k) => {
		if (number >= k) {
			// k로 나눈 몫을 구하고 소수점 첫째 자리까지만 표시
			let quotient = (number / k).toFixed(1);

			if (quotient.endsWith('.0')) {
				quotient = quotient.slice(0, -2);
			}

			return quotient + 'K';
		} else {
			return number.toString();
		}
	};
	const handleActive = (vid, index, length) => {
		setIsActive(false);
		let newArr = [...Vids];
		newArr.forEach((el, idx) => {
			if (0 <= idx && idx < length) {
				el.active = false;
			}
		});
		newArr[index].active = true;
		setVids(newArr);
		setActiveVids(newArr[index]);
		setTimeout(() => {
			setIsActive(true);
		}, 100);
	};
	return (
		<>
			<Layout title={'Youtube'} className={'Youtube'}>
				{isChannelData && ChannelData && Object.values(ChannelData).length && (
					<section className='top'>
						<article className='channel'>
							<div className='title'>
								<div>
									<p>
										<span>{ChannelTitle}</span>
										<strong>&reg;</strong>
									</p>
									<p>
										Contemporary and Enchanted.
										<br /> Discover The World of British Fragrance and Lifestyle
										House Jo Malone London.
									</p>
								</div>
								<div
									className='more'
									onClick={() =>
										window.open('https://www.youtube.com/@jomalonelondon')
									}
								>
									<AiFillPlusCircle />
									<span>more</span>
								</div>
							</div>
							<div className='profile'>
								<img src={`${path.current}/img/youtubeprofile.jpg`} alt='' />
							</div>
						</article>
						<div className='profile_data'>
							<div>
								<span>SubscriberCount</span>
								<p>
									{formatNumberWithK(ChannelData.subscriberCount, 1000)}
									<TfiPlus />
								</p>
							</div>
							<div>
								<span>VideoCount</span>
								<p>
									{formatNumberWithK(ChannelData.videoCount, 1000)}
									<TfiPlus />
								</p>
							</div>
							<div>
								<span>Happy client</span>
								<p>
									100
									<PiPercentLight />
								</p>
							</div>
							<div>
								<span>ViewCount</span>
								<p>{formatNumberWithK(ChannelData.viewCount, 1000)}</p>
							</div>
						</div>
					</section>
				)}
				<section className='middle'>
					<h3>OUR VISION</h3>
					<div className='inner'>
						<div className='left'>
							<p>
								UNLEASHING
								<br />
								YOUR BARNDS'
								<br />
								POTENTIAL
							</p>
							<span>Dignissimos ipsum dolor consectetur adipisicing elit.</span>
							<button>
								<Link to={`/youtube/detail/${ActiveVids.id}`}>
									detail view
									<RiArrowRightUpLine />
								</Link>
							</button>
						</div>
						<div className='right'>
							{/*img-thumbnail, h4 - title, p - description */}
							{ActiveVids && Object.keys(ActiveVids).length && (
								<>
									<div className={IsActive ? 'preview on' : 'preview'}>
										<div className='thumbnail'>
											<img
												src={ActiveVids?.snippet.thumbnails.standard.url}
												alt='thumnail'
											/>
										</div>
										<div className='text'>
											<h3>{ActiveVids?.snippet.title}</h3>
											<p>{shortenText(ActiveVids?.snippet.description, 150)}</p>
										</div>
									</div>
									<div className='previewList'>
										<ul>
											{Vids &&
												Vids.slice(0, 3).map((vid, idx) => {
													return (
														<li
															key={vid.snippet.title + idx}
															onClick={() => {
																handleActive(vid, idx, 3);
															}}
															className={vid.active ? 'on' : ''}
														>
															<div>
																<span>0{idx + 1}</span>
																<p>{vid.snippet.title}</p>
															</div>
															<p>{shortenText(vid.snippet.description, 60)}</p>
														</li>
													);
												})}
										</ul>
									</div>
								</>
							)}
						</div>
					</div>
				</section>
				<section className='bottom'>
					<div className='search'>
						<form onSubmit={searchYoutube}>
							{/* 주의  : 일일 할당량 10000인데, 검색기능 1회 100 cost */}
							<input
								type='text'
								ref={refSearchKeyword}
								placeholder='Find out more interesting things!'
							/>
							<button>search</button>
							<span onClick={resetSearch}>
								<GrPowerReset />
							</span>
						</form>
						{!SearchResult && (
							<div className='noResult'>
								No Result Found
								<RiArrowRightUpLine />
							</div>
						)}
					</div>
					<div className='left'>
						{Vids.length &&
							Vids.slice(3, 5).map((data, idx) => {
								const publishedAt = data.snippet?.publishedAt;
								const [date, time] = publishedAt
									? publishedAt.split('T')
									: ['', ''];

								if (idx === 0 && data.snippet) {
									return (
										<Link
											to={`/youtube/detail/${data.id}`}
											key={data.snippet.title + idx}
										>
											<article className='big'>
												<div>
													<h2>{data.snippet.title}</h2>
													<RiArrowRightUpLine />
												</div>
												<div className='txt'>
													<p>{shortenText(data.snippet.description, 500)}</p>
													<div className='infoBox'>
														<span>{date}</span>
														<em>{time.split('Z')[0]}</em>
													</div>
												</div>
												<div className='pic'>
													<img
														src={
															data.snippet.thumbnails.standard !== undefined
																? data.snippet.thumbnails.standard.url
																: data.snippet.thumbnails.default.url
														}
														alt={data.snippet.title}
													/>
												</div>
											</article>
										</Link>
									);
								}
								if (idx === 1 && data.snippet) {
									return (
										<Link
											to={`/youtube/detail/${data.id}`}
											key={data.snippet.title + idx}
										>
											<article className='small'>
												<div className='txt'>
													<h2>{data.snippet.title}</h2>
													<div>
														<p>{shortenText(data.snippet.description, 200)}</p>
														<div className='infoBox'>
															<span>{date}</span>
															<em>{time.split('Z')[0]}</em>
														</div>
														<RiArrowRightUpLine />
													</div>
												</div>

												<div className='pic'>
													<img
														src={
															data.snippet.thumbnails.standard !== undefined
																? data.snippet.thumbnails.standard.url
																: data.snippet.thumbnails.default.url
														}
														alt={data.snippet.title}
													/>
												</div>
											</article>
										</Link>
									);
								}
							})}
					</div>
					<div className='right'>
						{Vids.length &&
							Vids.slice(5, 8).map((data, idx) => {
								const publishedAt = data.snippet?.publishedAt;
								const [date, time] = publishedAt
									? publishedAt.split('T')
									: ['', ''];
								if (idx === 0 && data.snippet) {
									return (
										<Link
											to={`/youtube/detail/${data.id}`}
											key={data.snippet.title + idx}
										>
											<article className='small'>
												<div className='txt'>
													<h2>{data.snippet.title}</h2>
													<div>
														<p>{shortenText(data.snippet.description, 200)}</p>
														<div className='infoBox'>
															<span>{date}</span>
															<em>{time.split('Z')[0]}</em>
														</div>
														<RiArrowRightUpLine />
													</div>
												</div>

												<div className='pic'>
													<img
														src={
															data.snippet.thumbnails.standard !== undefined
																? data.snippet.thumbnails.standard.url
																: data.snippet.thumbnails.default.url
														}
														alt={data.snippet.title}
													/>
												</div>
											</article>
										</Link>
									);
								}
								if (idx === 1 && data.snippet) {
									return (
										<Link
											to={`/youtube/detail/${data.id}`}
											key={data.snippet.title + idx}
										>
											<article className='big'>
												<div>
													<h2>{data.snippet.title}</h2>
													<RiArrowRightUpLine />
												</div>
												<div className='txt'>
													<p>{shortenText(data.snippet.description, 400)}</p>
													<div className='infoBox'>
														<span>{date}</span>
														<em>{time.split('Z')[0]}</em>
													</div>
												</div>
												<div className='pic'>
													<img
														src={
															data.snippet.thumbnails.standard !== undefined
																? data.snippet.thumbnails.standard.url
																: data.snippet.thumbnails.default.url
														}
														alt={data.snippet.title}
													/>
												</div>
											</article>
										</Link>
									);
								}
							})}
					</div>
				</section>
			</Layout>
		</>
	);
}
