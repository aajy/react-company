import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InputBox.scss';
import { GrPowerReset } from 'react-icons/gr';
import { TbCircleCheckFilled } from "react-icons/tb";

export default function InputBox({ Open }) {
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
	const refSelectedCharacter = useRef(0);
	const [CharacterSrc, setCharacterSrc] = useState('');
	const CharacterData = [
		"character1","character2","character3","character4","character5"
	]

	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
		refSelectedCharacter.current = 0;
		setCharacterSrc('');
		refNickname.current.value = '';
	};

	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([
			{
				title: refTit.current.value,
				content: refCon.current.value,
				nickname: refNickname.current.value,
				date: new Date(korTime),
				src:CharacterSrc
			},
			...Post,
		]);
		resetPost();
	};
	const handleCharacter = (e, idx) => {
		const src = e.currentTarget.src;
		setCharacterSrc(src);
		refSelectedCharacter.current=idx;
  };

	useEffect(() => {
		//Post데이터가 변경되면 수정모드를 강제로 false처리하면서 로컬저장소에 저장하고 컴포넌트 재실행
		Post.map((el) => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					initial={{ x: -100 }}
					animate={{ x: 0, transition: { duration: 0.2, ease: 'linear' } }}
					exit={{
						x: -100,
						opacity:0,
						transition: { duration: 0.2, ease: 'linear'  },
					}}>
					<div className='InputBox'>
						<h2>Let's Talk</h2>
						<p>Ask us anything or just say hi!</p>
						<span>Required Info</span>

						<input type='text' placeholder='title' ref={refTit} />
						<textarea
							cols='30'
							rows='3'
							placeholder='content'
							ref={refCon}
						></textarea>
						<span>Selective Info</span>
						<input type='text' placeholder='nickname' ref={refNickname} />
						<div className="character">
							<ul>
								{CharacterData.map((img,idx)=>{
									return (
										<li key={img+idx}
										className={refSelectedCharacter.current === idx ? 'on' : ''}>
											<img src={`${path.current}/img/${img}.jpg`} alt="" onClick={(e)=>handleCharacter(e, idx)}/>
											{refSelectedCharacter.current === idx && <span><TbCircleCheckFilled /></span>}
										</li>
									)
								})}
							</ul>
						</div>
						<nav>
							<button onClick={resetPost}>
								<GrPowerReset />
							</button>
							<button onClick={createPost}>+</button>
						</nav>
					</div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
