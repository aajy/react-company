import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { AiFillPlusCircle } from 'react-icons/ai';
import { TfiPlus } from 'react-icons/tfi';
import { PiPercentLight } from 'react-icons/pi';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { useCustomText } from '../../../hooks/useText';

export default function Youtube() {
	const shortenText = useCustomText('shorten');
	const path = useRef(process.env.PUBLIC_URL);
	const [Vids, setVids] = useState([]);
	const [ChannelData, setChannelData] = useState({});
	const [ChannelTitle, setChannelTitle] = useState('');
	const [ActiveVids, setActiveVids] = useState({});

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 9;
		let channelId = '';

		const vidIdForChannelId = 'uIZHsUT43l4';
		const channelIdURL = `https://www.googleapis.com/youtube/v3/videos?key=${api_key}&part=snippet&id=${vidIdForChannelId}`;

		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		//channelId
		try {
			const data = await fetch(channelIdURL);
			const json = await data.json();
			channelId = json.items[0].snippet.channelId;
			setChannelTitle(json.items[0].snippet.channelTitle);

			//channel Data
			const channelDataURL = `https://www.googleapis.com/youtube/v3/channels?key=${api_key}&part=statistics&id=${channelId}&fields=items/statistics`;

			try {
				const data = await fetch(channelDataURL);
				const json = await data.json();
				setChannelData(json.items[0].statistics);
			} catch (err) {
				console.log(err);
			}
		} catch (err) {
			console.log(err);
		}

		//playlist
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			const originalArr = json.items;
			const newArray = originalArr.map((item, index) => {
				if (index === 0) {
					return { ...item, active: true };
				}
				return item;
			});
			setVids(newArray);
			setActiveVids(json.items[0]);
		} catch (err) {
			console.log(err);
		}
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
		console.log('vid, idx: ', vid, index);
		let newArr = [...Vids];
		newArr.forEach((el, idx) => {
			if (0 <= idx && idx < length) {
				el.active = false;
			}
		});
		newArr[index].active = true;
		console.log('newArr[index]: ', newArr[index]);
		setVids(newArr);
		setActiveVids(newArr[index]);
		//TODO:: setActiveVids(); 반영
	};
	const handleModalOpen = (data) => {
		console.log('Modal data', data);
	};
	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<Layout title={'Youtube'} className={'Youtube'}>
			{ChannelData && Object.values(ChannelData).length && (
				<section className='top'>
					<article className='channel'>
						<div className='title'>
							<div>
								<p>
									{ChannelTitle} <strong>&reg;</strong>
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
						{/* TODO::클릭 시 상세 모달 추가 */}
						<button>
							detail view
							<RiArrowRightUpLine />
						</button>
					</div>
					<div className='right'>
						{/*img-thubnail, h4 - title, p - description */}
						{ActiveVids && Object.keys(ActiveVids).length && (
							<>
								<div className='preview'>
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
										{Vids.slice(0, 3).map((vid, idx) => {
											return (
												<li
													key={vid.title + idx}
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
				<div className='left'>
					{Vids.slice(3, 5).map((data, idx) => {
						const [date, time] = data.snippet.publishedAt.split('T');

						if (idx === 0) {
							return (
								<article
									key={data.snippet.title + idx}
									className='big'
									onClick={() => handleModalOpen(data)}
								>
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
											src={data.snippet.thumbnails.standard.url}
											alt={data.snippet.title}
										/>
									</div>
								</article>
							);
						}
						if (idx === 1) {
							return (
								<article
									key={data.snippet.title + idx}
									className='small'
									onClick={() => handleModalOpen(data)}
								>
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
											src={data.snippet.thumbnails.standard.url}
											alt={data.snippet.title}
										/>
									</div>
								</article>
							);
						}
					})}
				</div>
				<div className='right'>
					{Vids.slice(5, 8).map((data, idx) => {
						const [date, time] = data.snippet.publishedAt.split('T');
						if (idx === 0) {
							return (
								<article
									key={data.snippet.title + idx}
									className='small'
									onClick={() => handleModalOpen(data)}
								>
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
											src={data.snippet.thumbnails.standard.url}
											alt={data.snippet.title}
										/>
									</div>
								</article>
							);
						}
						if (idx === 1) {
							return (
								<article
									key={data.snippet.title + idx}
									className='big'
									onClick={() => handleModalOpen(data)}
								>
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
											src={data.snippet.thumbnails.standard.url}
											alt={data.snippet.title}
										/>
									</div>
								</article>
							);
						}
					})}
				</div>
			</section>
		</Layout>
	);
}
