import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';

export default function Youtube() {
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyD3MqYIo5BO0cLJy20Rw1aBXtC1qRjHSlM';
		const pid = 'PL83BY7FoUdNnvcAqkXwoozropo4gKHl-n';
		const num = 20;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
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
	<Layout className={'Youtube'}>
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
	</Layout>
	);
}
