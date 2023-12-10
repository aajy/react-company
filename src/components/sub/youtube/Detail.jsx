import { useParams } from 'react-router-dom';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useEffect, useRef, useState } from 'react';
import { IoMdHeart } from "react-icons/io";

export default function Detail() {
	const path = useRef(process.env.PUBLIC_URL);
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	const [CommentData, setCommentData] = useState([]);
	const [IsComment, setIsComment] = useState(false);

	const fetchSingledata = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;
    

    try {
      const data = await fetch(baseURL);
      const json = await data.json();
			console.log('json.items[0]: ', json.items[0]);
      setYoutubeData(json.items[0].snippet);
			//댓글가져오는 요청 
      const commentURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${api_key}&part=replies&videoId=${json.items[0].snippet.resourceId.videoId}`
      
      try {
        const data = await fetch(commentURL);
        const json = await data.json();
        console.log('comment------',json.items[0].replies.comments);
				if (json.items[0].replies.comments.length > 0){
					setIsComment(true);
					setCommentData(json.items[0].replies.comments);
				} else {
					setIsComment(false);
				}
      }  catch(err) {
        console.log(err);
      }
    } catch(err) {
      console.log(err);
    }
	};
	useEffect(() => {
		fetchSingledata();
	}, []);
	return (
		<Layout title={'Detail'} className={'Detail'}>
		{(YoutubeData&& CommentData) && (
			<article>
				<div className='videoBox'>
					<iframe
						title={YoutubeData.title}
						src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}
						frameborder='0'
						allowfullscreen="allowfullscreen"
					></iframe>
				</div>
				<h3>{YoutubeData.title}</h3>
				<p>{YoutubeData.description}</p>
				<span>댓글 {CommentData.length} 개</span>
				{IsComment && CommentData.map((comment,idx)=>{
					return(
						<div className='comment' key={comment.id + idx}>
							<div className='profile'>
								<div>
									<img src={comment.snippet.authorProfileImageUrl} alt="profileUrl" />
									<div>
										<p>
											<span>{comment.snippet.authorDisplayName}</span>
											<span>{comment.snippet.publishedAt}</span>
										</p>
										<p>{comment.snippet.textDisplay}</p>
									</div>
								</div>
								<p><IoMdHeart />{comment.snippet.likeCount}</p>
							</div>
						</div>
					)
				})}
			</article>
		)}
	</Layout>
	);
}
