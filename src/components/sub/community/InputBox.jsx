import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InputBox.scss';
import { GrPowerReset } from 'react-icons/gr';
import { TbCircleCheckFilled } from 'react-icons/tb';
import { BiCommentCheck } from 'react-icons/bi';

export default function InputBox({ Open, setNewPost }) {
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refNickname = useRef(null);
	const ThemeData = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5'];
	const [ThemeName, setThemeName] = useState(ThemeData[0]);

	const resetInput = () => {
		refTit.current.value = '';
		refCon.current.value = '';
		setThemeName(ThemeData[0]);
		refNickname.current.value = '';
	};

	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetInput();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		const createPostData = {
			title: refTit.current.value,
			content: refCon.current.value,
			nickname: refNickname.current.value || 'nickname',
			date: new Date(korTime),
			theme: ThemeName,
			likeCount: 0
		};
		setNewPost(createPostData);
		resetInput();
	};
	const handleTheme = (e, img) => {
		const themeName = img;
		setThemeName(themeName);
	};
	useEffect(()=>{
		Open && resetInput();
	},[Open])

	return (
		<AnimatePresence>
			{Open && (
				<>
					<motion.div
						initial={{ opacity:0 }}
						animate={{ opacity:1 }}
						exit={{ opacity:0 }}
						className='modal'
					>
						<motion.aside
							initial={{ y: 0 }}
							animate={{
								y: 100,
								transition: { duration: 0.2, ease: 'easeIn' },
							}}
							exit={{
								y: 0,
								transition: { duration: 0.2, ease: 'linear' },
							}}
						>
							<div className='InputBox'>
								<h2>Ask us anything or just say hi!</h2>
								<span>Required Info</span>
								<label htmlFor='refTit'>Title : </label>
								<input type='text' placeholder='title' ref={refTit} id='refTit' />
								<label htmlFor='refCon'>Content : </label>
								<textarea
									cols='30'
									rows='3'
									placeholder='content'
									ref={refCon}
									id='refCon'
								></textarea>
								<span>Selective Info</span>
								<label htmlFor='refNickname'>Nickname : </label>
								<input
									type='text'
									placeholder='nickname'
									ref={refNickname}
									id='refNickname'
								/>
								<span>choose your charater!</span>
								<div className='theme'>
									<ul>
										<li>Theme :</li>
										{ThemeData.map((img, idx) => {
											return (
												<li key={img + idx}>
													{/* <img
														src={`${path.current}/img/${img}.jpg`}
														alt=''
														onClick={(e) => handleTheme(e, img)}
													/> */}
													<span
														className={img}
														onClick={(e) => handleTheme(e, img)}
													></span>
													{ThemeName === img && (
														<em>
															<TbCircleCheckFilled />
														</em>
													)}
												</li>
											);
										})}
									</ul>
								</div>
								<nav>
									<button onClick={resetInput}>
										<GrPowerReset />
									</button>
									<button onClick={createPost}>
										<BiCommentCheck />
									</button>
								</nav>
							</div>
						</motion.aside>
					</motion.div>
					
				</>
			)}
		</AnimatePresence>
	);
}
