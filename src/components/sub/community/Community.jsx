import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import InputBox from './InputBox';
import postData from './dummyPosts.json';
import { useCustomText } from '../../../hooks/useText';
import { LiaEdit } from 'react-icons/lia';
import {
	AiOutlineDelete,
	AiFillPlusCircle,
	AiOutlineDown,
	AiOutlineUp,
} from 'react-icons/ai';

export default function Community() {
	const path = useRef(process.env.PUBLIC_URL);
	const [Open, setOpen] = useState(false);
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data && data.length > 0) return JSON.parse(data);
		else return postData.dummyPosts;
	};
	const [Post, setPost] = useState(getLocalData());
	console.log('Post', Post);
	const [CurNum, setCurNum] = useState(0);
	const len = useRef(0); //전체 Post갯수를 담을 참조 객체
	const pageNum = useRef(0); //전체 페이지 갯수를 추후에 연산해서 담을 참조객체
	const perNum = useRef(6); //한 페이지당 보일 포스트 갯수
	const refReply = useRef('');

	const addReply = (replyIndex) => {
		setPost(
			Post.map((el, idx) => {
				if (replyIndex === idx) el.onReply = !el.onReply;
				return el;
			})
		);
	};
	const handleReplyView = (e, replyIndex) => {
		setPost(
			Post.map((el, idx) => {
				if (replyIndex === idx) el.replyView = !el.replyView;
				return el;
			})
		);
	};

	const handleInputChange = (e, replyIndex) => {
		const parentElement = e.target.parentElement;

		// 부모 요소의 자식들 중에서 형제 요소 찾기
		const siblingElement = Array.from(parentElement.children).find(
			(child) => child !== e.target
		);
		if (siblingElement.value) {
			const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
			setPost(
				Post.map((el, idx) => {
					if (replyIndex === idx && el) {
						if (el.reply) {
							return {
								...el,
								reply: [
									...el.reply,
									{ value: siblingElement.value, date: new Date(korTime) },
								],
							};
						} else {
							return {
								...el,
								reply: [
									{ value: siblingElement.value, date: new Date(korTime) },
								],
							};
						}
					} else {
						return el;
					}
				})
			);
			console.log(Post);
			siblingElement.value = '';
		}
	};

	//수정모드 변경함수
	const enableUpdate = (editIndex) => {
		console.log('editIndex: ', editIndex);
	};
	//글 삭제 함수
	const deletePost = (delIndex) => {
		//console.log(delIndex);
		//기존 map과 마찬가지로 기존 배열값을 deep copy해서 새로운배열 반환
		//이때 안쪽에 조건문을 처리해서 특정 조건에 부합되는 값만 filtering해서 리턴
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	useEffect(() => {
		Post.map((el) => {
			el.enableUpdate = false;
		});
		localStorage.setItem('post', JSON.stringify(Post));
		// localStorage.clear();
		if (Post) {
			len.current = Post.length;

			pageNum.current =
				len.current % perNum.current === 0
					? len.current / perNum.current
					: parseInt(len.current / perNum.current) + 1;
			console.log(pageNum.current);
		}
	}, [Post]);

	return (
		<Layout title={'Community'} className={'Community'}>
			<button className='openToggleButton' onClick={() => setOpen(!Open)}>
				+
			</button>

			<div className='communityWrap'>
				<InputBox Open={Open} setOpen={setOpen} />
				<div className='showBox'>
					<nav className='pagination'>
						{Array(pageNum.current).length > 0 &&
							Array(pageNum.current)
								.fill()
								.map((_, idx) => {
									return (
										<button key={idx} onClick={() => setCurNum(idx)}>
											{idx + 1}
										</button>
									);
								})}
					</nav>
					<div className='postList'>
						{Post &&
							Post.map((el, idx) => {
								const date = JSON.stringify(el.date);
								const strDate = changeText(date.split('T')[0].slice(1), '.');

								if (
									idx >= perNum.current * CurNum &&
									idx < perNum.current * (CurNum + 1)
								) {
									return (
										<article key={el + idx} className={`commentBox ${el.src}`}>
											<div className='txt'>
												<div className='top'>
													<div className='img'>
														<img
															src={`${path.current}/img/${el.src}.jpg`}
															alt=''
														/>
													</div>
													<p>{el.nickname}</p>
												</div>
												<h2>{el.title}</h2>
												<p>{el.content}</p>

												<span>{strDate}</span>
												<span onClick={(e) => handleReplyView(e, idx)}>
													replay view
													{el.replyView ? <AiOutlineUp /> : <AiOutlineDown />}
												</span>
												{el.replyView && el.reply && el.reply.length > 0 && (
													<div className='replyView'>
														<ul>
															{el.reply.map((reply, idx) => {
																if (Object.keys(reply).length > 0) {
																	const date = JSON.stringify(reply.date);
																	const replyStrDate = changeText(
																		date.split('T')[0].slice(1),
																		'.'
																	);
																	console.log('reply', reply);
																	return (
																		<li key={reply.value + idx}>
																			<span>{reply.value}</span>
																			<span>{replyStrDate}</span>
																		</li>
																	);
																} else {
																	<li>댓글없음</li>;
																}
															})}
														</ul>
													</div>
												)}
											</div>
											{el.onReply && (
												<label htmlFor='replyInput' className='replyInput'>
													<input
														type='text'
														id='replyInput'
														placeholder='reply'
														ref={refReply}
													/>
													<button
														type='button'
														onClick={(e) => handleInputChange(e, idx)}
													>
														add reply
													</button>
												</label>
											)}
											<nav>
												<button
													className={el.onReply ? 'onReply on' : 'replyOn'}
													onClick={() => addReply(idx)}
												>
													<AiFillPlusCircle />
												</button>
												<button onClick={() => enableUpdate(idx)}>
													<LiaEdit />
												</button>
												<button onClick={() => deletePost(idx)}>
													<AiOutlineDelete />
												</button>
											</nav>
										</article>
									);
								} else {
									return null;
								}
							})}
					</div>
				</div>
			</div>
		</Layout>
	);
}
