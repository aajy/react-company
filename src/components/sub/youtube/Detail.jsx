import { useParams } from 'react-router-dom';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useEffect, useRef, useState } from 'react';
import { IoMdHeart } from 'react-icons/io';
import { LiaComment } from 'react-icons/lia';
import { useCustomText } from '../../../hooks/useText';
import { TfiPlus, TfiMinus } from 'react-icons/tfi';

export default function Detail() {
	const path = useRef(process.env.PUBLIC_URL);
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	const [CommentData, setCommentData] = useState([]);
	const [Ismore, setIsmore] = useState(false);

	const shortenText = useCustomText('shorten');
	const dummyData = [
		{
			snippet: {
				authorProfileImageUrl : "https://yt3.ggpht.com/WggXR-cqxBtQN9zX9BpUX6gNTkn_zNjMAIzDe_n4SQP90MLrrqywFqWNSnljNuDWx9dQ_urf=s68-c-k-c0x00ffffff-no-rj",
				authorDisplayName : "@maccosmetics",
				publishedAt : "2023-12-06T19:45:13Z",
				textDisplay : "Ex harum temporibus laboriosam esse accusamus ea voluptates cumamet, omnis, eius aliquid nihil, consectetur quia. Dolor perferendis quidem illum nesciunt",
				likeCount : 10
			}
		}
	]
	const fetchSingledata = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setYoutubeData(json.items[0].snippet);
			//댓글가져오는 요청
			const commentURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${api_key}&part=replies&videoId=${json.items[0].snippet.resourceId.videoId}`;

			try {
				const data = await fetch(commentURL);
				const json = await data.json();
				if (json.items[0] && json.items[0]?.replies.comments.length > 0) {
					setCommentData(json.items[0].replies.comments);
				} else {
					setCommentData(dummyData);
				}
			} catch (err) {
				console.log(err);
			}
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchSingledata();
	}, []);
	return (
		<Layout title={'Detail'} className={'Detail'}>
			{YoutubeData && CommentData && (
				<article>
					<div className='videoBox'>
						<iframe
							title={YoutubeData.title}
							src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}
							frameborder='0'
							allowfullscreen='allowfullscreen'
						></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					<p>
						{YoutubeData.description.length > 300 ? (
							<p>
								{Ismore ? (
									<span>
										{YoutubeData.description}
										<strong onClick={() => setIsmore(!Ismore)}>
											briefly
											<TfiMinus />
										</strong>
									</span>
								) : (
									<span>
										{shortenText(YoutubeData.description, 300)}
										<strong onClick={() => setIsmore(!Ismore)}>
											see more
											<TfiPlus />
										</strong>
									</span>
								)}
							</p>
						) : (
							<span>
								{YoutubeData.description ||
									`Amet consectetur adipisicing elit.
								Ex harum temporibus laboriosam esse accusamus ea voluptates cum
								amet, omnis, eius aliquid nihil, consectetur quia. Dolor
								perferendis quidem illum nesciunt architecto.`}
							</span>
						)}
					</p>
					<span>
						<LiaComment />
						댓글 {CommentData.length} 개
					</span>
						{CommentData.map((comment, idx) => {
							return (
								<div className='comment' key={comment.id + idx}>
									<div className='profile'>
										<div>
											<img
												src={comment.snippet.authorProfileImageUrl}
												alt='profileUrl'
											/>
											<div>
												<p>
													<span>{comment.snippet.authorDisplayName}</span>
													<span>{comment.snippet.publishedAt}</span>
												</p>
												<p>{comment.snippet.textDisplay}</p>
											</div>
										</div>
										<p>
											<IoMdHeart />
											{comment.snippet.likeCount}
										</p>
									</div>
								</div>
							);
						})
					}
				</article>
			)}
		</Layout>
	);
}
