import { useParams } from 'react-router-dom';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useEffect, useState } from 'react';
import { IoMdHeart } from 'react-icons/io';
import { LiaComment } from 'react-icons/lia';
import { useCustomText } from '../../../hooks/useText';
import { TfiPlus, TfiMinus } from 'react-icons/tfi';

export default function Detail() {
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	const [CommentData, setCommentData] = useState([]);
	const [CommenLength, setCommenLength] = useState(0);
	const [Ismore, setIsmore] = useState(false);
	const [IsCommentDisable, setIsCommentDisable] = useState(false);

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
			const commentURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${api_key}&part=snippet&videoId=${json.items[0].snippet.resourceId.videoId}`;

			try {
				const data = await fetch(commentURL);
				const json = await data.json();
				if (data.status !== 200) {
					setIsCommentDisable(true);
				} else {
					setIsCommentDisable(false);
				}
				if (json.items && json.items.length > 0) {
					setCommenLength(json.items.length)
					setCommentData(json.items);
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
			{YoutubeData && (
				<article>
					<div className='videoBox'>
						<iframe
							title={YoutubeData.title}
							src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}
							allow="fullscreen"
						></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					<div className='desc'>
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
					</div>
					<span>
						<LiaComment />
						댓글 {CommenLength} 개
					</span>
					{IsCommentDisable && <p>Comments have been disabled</p>}
						{!IsCommentDisable && CommentData.length > 0 && CommentData.map((comment, idx) => {
							return (
								<div className='comment' key={comment.id + idx}>
									<div className='profile'>
										<div>
											<img
												src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
												alt='profileUrl'
											/>
											<div>
												<p>
													<span>{comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
													<span>{comment.snippet.topLevelComment.snippet.publishedAt}</span>
												</p>
												<p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
											</div>
										</div>
										<p>
											<IoMdHeart />
											{comment.snippet.topLevelComment.snippet.likeCount}
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
