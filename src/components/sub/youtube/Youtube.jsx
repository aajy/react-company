import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	const [ChannelData, setChannelData] = useState({});
	const channelTitle = useRef(null);

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
			channelTitle.current = json.items[0].snippet.channelTitle;
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
			setVids(json.items);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<Layout className={'Youtube'}>
			<div className='top'>
				<p ref={channelTitle}>{channelTitle.current}</p>
				<p>{ChannelData.subscriberCount}</p>
				<p>{ChannelData.videoCount}</p>
				<p>{ChannelData.viewCount}</p>
			</div>
			<div className='bottom'>
				{Vids.map((data, idx) => {
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
			</div>
		</Layout>
	);
}
