import { useParams } from 'react-router-dom';
import './Welcome.scss';
import { useRef } from 'react';

export default function Welcome() {
	const { id } = useParams();
	const videoRef = useRef();
	const setPlayBackRate = () => {
		videoRef.current.playbackRate = 1; //속도조절
	};
	return (
		<div className='Welcome'>
			<video
				muted
				autoPlay
				loop
				ref={videoRef}
				onCanPlay={() => setPlayBackRate()}
			>
				<source
					src={`${process.env.PUBLIC_URL}/img/welcome.mp4`}
					type='video/mp4'
				/>
			</video>
			<h1>{id}, Welcome!</h1>
		</div>
	);
}
