import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InputBox.scss';
import { GrPowerReset } from 'react-icons/gr';
import { TbCircleCheckFilled } from 'react-icons/tb';
import { BiCommentCheck } from 'react-icons/bi';

export default function InputBox({ Open, setPostCall }) {
	const path = useRef(process.env.PUBLIC_URL);
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refNickname = useRef(null);
	const CharacterData = [
		'character1',
		'character2',
		'character3',
		'character4',
		'character5',
	];
	const [CharacterSrc, setCharacterSrc] = useState(CharacterData[0]);

	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
		setCharacterSrc('');
		refNickname.current.value = '';
	};

	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		const createPostData = {
			title: refTit.current.value,
			content: refCon.current.value,
			nickname: refNickname.current.value || 'nickname',
			date: new Date(korTime),
			src: CharacterSrc,
		};
		setPostCall([createPostData, ...Post]);
		setPost([createPostData, ...Post]);
		resetPost();
	};
	const handleCharacter = (e, img) => {
		const srcName = img;
		setCharacterSrc(srcName);
	};

	useEffect(() => {
		//Post데이터가 변경되면 수정모드를 강제로 false처리하면서 로컬저장소에 저장하고 컴포넌트 재실행
		Post.map((el) => {
			el.replyView = false;
			el.onReply = false;
			el.enableUpdate = false;
		});
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					initial={{ x: -100, y: 50 }}
					animate={{
						x: 0,
						y: 50,
						transition: { duration: 0.2, ease: 'linear' },
					}}
					exit={{
						x: -100,
						y: 50,
						opacity: 0,
						transition: { duration: 0.2, ease: 'linear' },
					}}
				>
					<div className='InputBox'>
						<p>Ask us anything or just say hi!</p>
						<span>Required Info</span>
						<label htmlFor="refTit">Title : </label>
						<input type='text' placeholder='title' ref={refTit} id="refTit"/>
						<label htmlFor="refCon">Content : </label>
						<textarea
							cols='30'
							rows='3'
							placeholder='content'
							ref={refCon}
							id ='refCon'
						></textarea>
						<span>Selective Info</span>
						<label htmlFor="refNickname">Nickname : </label>
						<input type='text' placeholder='nickname' ref={refNickname} id="refNickname"/>
						<span>choose your charater!</span>
						<div className='character'>
							<ul>
								<li>Character :</li>
								{CharacterData.map((img, idx) => {
									return (
										<li key={img + idx}>
											<img
												src={`${path.current}/img/${img}.jpg`}
												alt=''
												onClick={(e) => handleCharacter(e, img)}
											/>
											{CharacterSrc === img && (
												<span>
													<TbCircleCheckFilled />
												</span>
											)}
										</li>
									);
								})}
							</ul>
						</div>
						<nav>
							<button onClick={resetPost}>
								<GrPowerReset />
							</button>
							<button onClick={createPost}>
								<BiCommentCheck />
							</button>
						</nav>
					</div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
