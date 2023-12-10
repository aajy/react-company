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
					{IsComment && CommentData.map((comment,idx)=>{
						return(
							<div key={comment.id + idx}>
								<img src={comment.snippet.authorProfileImageUrl} alt="profileUrl" />
								<p>{comment.snippet.authorDisplayName}</p>
								<p>{comment.snippet.textDisplay}</p>
								<p>{comment.snippet.publishedAt}</p>
								<p><IoMdHeart />{comment.snippet.likeCount}</p>
							</div>
						)
					})}
				</article>
			)}
			{/* <article>
				<div className='videoBox'>
					<img src={`${path.current}/img/youtubeprofile.jpg`} alt='' />
				</div>
				<h3>임시 데이터 : Youtube playlist title | Lorem ipsum dolor sit.</h3>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis odio fugit ducimus exercitationem eveniet in dicta ut, sequi repellat libero?</p>
			</article> */}
		</Layout>
	);
}
