import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InputBox.scss';
import { GrPowerReset } from 'react-icons/gr';

export default function InputBox({ Open }) {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());

	const refTit = useRef(null);
	const refCon = useRef(null);
	const inputRef = useRef(null);
	const refNickname = useRef(null);

	const onUploadImage = useCallback((e) => {
		if (!e.target.files) {
			return;
		}
		console.log(e.target.files[0].name);
	}, []);
	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
		inputRef.current.value = '';
		refNickname.current.value = '';
		console.log(refNickname.current);
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
			},
			...Post,
		]);
		resetPost();
	};

	useEffect(() => {
		//Post데이터가 변경되면 수정모드를 강제로 false처리하면서 로컬저장소에 저장하고 컴포넌트 재실행
		Post.map((el) => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
		console.log('Post', Post);
	}, [Post]);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside>
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
						<input
							type='file'
							accept='image/jpg,image/jpeg,image/png,image/svg,image/gif'
							ref={inputRef}
							onChange={onUploadImage}
						></input>
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
