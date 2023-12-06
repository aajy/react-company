import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { AiFillPlusCircle, AiOutlinePlus } from 'react-icons/ai';
import { PiPercentThin } from 'react-icons/pi';

export default function Youtube() {
	const path = useRef(process.env.PUBLIC_URL);
	const [Vids, setVids] = useState([]);
	const [ChannelData, setChannelData] = useState({});
	const [ChannelTitle, setChannelTitle] = useState('');

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 20;
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
			console.log(
				'json.items[0].snippet.channelTitle: ',
				json.items[0].snippet.channelTitle
			);

			//channel Data
			const channelDataURL = `https://www.googleapis.com/youtube/v3/channels?key=${api_key}&part=statistics&id=${channelId}&fields=items/statistics`;

			try {
				const data = await fetch(channelDataURL);
				const json = await data.json();
				setChannelData(json.items[0].statistics);
				console.log(
					'json.items[0].statistics: ',
					JSON.stringify(json.items[0].statistics)
				);
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
			setVids(json.items);
			console.log('json.items: ', json.items);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<Layout title={'Youtube'} className={'Youtube'}>
			{Object.values(ChannelData).length && (
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
							<div className='more'>
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
								{ChannelData.subscriberCount}
								<AiOutlinePlus />
							</p>
						</div>
						<div>
							<span>VideoCount</span>
							<p>
								{ChannelData.videoCount}
								<AiOutlinePlus />
							</p>
						</div>
						<div>
							<span>Happy client</span>
							<p>
								100
								<PiPercentThin />
							</p>
						</div>
						<div>
							<span>ViewCount</span>
							<p>{ChannelData.viewCount}</p>
						</div>
					</div>
				</section>
			)}
			<section className='bottom'>
				{Vids &&
					Vids.map((data, idx) => {
						const [date, time] = data.snippet.publishedAt.split('T');

						return (
							<article key={data.id}>
								<h2>{data.snippet.title}</h2>

								<div className='txt'>
									<p>{data.snippet.description}</p>
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
					})}
			</section>
		</Layout>
	);
}
