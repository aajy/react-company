import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import InputBox from './InputBox';
import postData from './dummyPosts.json';
import { useCustomText } from '../../../hooks/useText';
import { BsArrowReturnRight } from 'react-icons/bs';
import { TfiPlus } from 'react-icons/tfi';
import { LiaEdit } from "react-icons/lia";
import {
	AiOutlineDelete,
	AiOutlineDown,
	AiOutlineUp,
} from 'react-icons/ai';
import { IoMdHeart } from 'react-icons/io';
import { RiArrowRightDownLine } from 'react-icons/ri';

export default function Community() {
	const [Open, setOpen] = useState(false);
	const [ThemeOnIdx, setThemeOnIdx] = useState(null);
	const changeText = useCustomText('combined');
	const changeDate = useCustomText('dateTime');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data && data.length > 0) return JSON.parse(data);
		else return postData.dummyPosts;
	};
	const editMode = useRef(false);
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const [Post, setPost] = useState(getLocalData());
	const [CurNum, setCurNum] = useState(0);
	const len = useRef(0); //전체 Post갯수를 담을 참조 객체
	const pageNum = useRef(1); //전체 페이지 갯수를 추후에 연산해서 담을 참조객체
	const perNum = useRef(8); //한 페이지당 보일 포스트 갯수
	
	const handleLikeCount = (likeIdx) => {
		const newPost = 	Post.map((el, idx) => {
			if (likeIdx === idx) el.likeCount += 1;
			return el;
		})
		setPost(newPost);
		localStorage.setItem('post', JSON.stringify(newPost));
	}
	const handleReplyView = (replyViewIndex = 'none') => {
		const newPost = 	Post.map((el, idx) => {
			if (replyViewIndex === idx) el.replyView = !el.replyView;
			return el;
		})
		setPost(newPost);
	};
	const handleReplyDelete = (commentIdx, replyIdx) => {
		const newPost = Post.map((el, idx) => {
			if (commentIdx === idx) return {
				...el,
				reply: [
					...el.reply.slice(0, replyIdx),
					...el.reply.slice(replyIdx + 1)
				]
			}
			return el;
		})
		setPost(newPost);
		localStorage.setItem('post', JSON.stringify(newPost));
	}

	const handleInputChange = (e, replyAddIndex) => {
		const parentElement = e.target.parentElement;

		const siblingElement = Array.from(parentElement.children).find(
			(child) => child !== e.target
		);
		if (siblingElement.value) {
			const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
			const newPost = Post.map((el, idx) => {
				if (replyAddIndex === idx && el) {
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
			setPost(newPost);
			siblingElement.value = '';
			localStorage.setItem('post', JSON.stringify(newPost));
		}
	};

	//수정모드 변경함수
	const enableUpdate = (editIndex) => {
		if (!editMode.current) {
			setPost(
				Post.map((el, idx) => {
					if (editIndex === idx) el.enableUpdate = true;
					return el;
				})
			);
			editMode.current = true;
		}else {
			updateEditPost(editIndex);
		}
	};
	//수정모드 input 초기화 함수
	const resetEdit = (e,type) => {
		const parentElement = e.target.parentElement;

		const defaultValue = Array.from(parentElement.children).find((child) => child !== e.target).defaultValue;
		type === 'title' ? refEditTit.current.value = defaultValue : refEditCon.current.value = defaultValue;
	};

	//글 수정 함수
	const updateEditPost = (updateIndex) => {
		editMode.current = true;
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 글의 제목과  본문을 모두 입력하세요.');
		} else {
			editMode.current = false;
			setPost(
				Post.map((el, idx) => {
					if (updateIndex === idx) {
						el.title = refEditTit.current.value;
						el.content = refEditCon.current.value;
						el.enableUpdate = false;
					}
					return el;
				})
			);
			localStorage.setItem('post', JSON.stringify(Post));
		}
	};
	//글 삭제 함수
	const deletePost = (delIndex) => {
		if (!window.confirm('해당 게시글을 삭제하겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};
	const handleThemeOnIdx = (idx = 'none') => {
		//이중이벤트 방지
		if (idx !== 'none'){
			Post[idx].enableUpdate ? editMode.current = true : editMode.current = false;
		} else {
			editMode.current = false;
		}
		const newIdx = idx;
		if (ThemeOnIdx === idx) return;
		setThemeOnIdx(newIdx);
		setPost(
			Post.map((el, idx) => {
				if (newIdx !== idx) {
					el.replyView = false;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	const updatePost = (obj) => {
		setPost([obj, ...Post]);
	};

	useEffect(() => {
		Post.map((el) => {
			el.replyView = false;
			el.enableUpdate = false;
		});
		localStorage.setItem('post', JSON.stringify(Post));
		if (Post && Post.length > 0) {
			len.current = Post.length;
			pageNum.current =
				len.current % perNum.current === 0
					? len.current / perNum.current
					: parseInt(len.current / perNum.current) + 1;
		}
	}, [Post.length]);
	useEffect(() => {
		// localStorage.clear();
		editMode.current = false;
		Post.map((el) => {
			el.enableUpdate = false;
		});
		if (Post && Post.length > 0) {
			len.current = Post.length;
			pageNum.current =
				len.current % perNum.current === 0
					? len.current / perNum.current
					: parseInt(len.current / perNum.current) + 1;
		}
	}, []);

	return (
		<Layout title={'Community'} className={'Community'}>
			<div className={Open ? 'InputBoxWrap open': 'InputBoxWrap'}>
				<InputBox Open={Open} setNewPost={updatePost} />
			</div>
			<div className='communityWrap'>
				<div className='top'>
					<h1>
						IT ALL STARTS
						<br />
						WITH A FEW <br />
						<span>without boundaries</span>
						<em></em> SQUARE MATERS
					</h1>
					<button
						className={Open ? 'openToggleButton on' : 'openToggleButton'}
						onClick={() => {
							handleThemeOnIdx();
							setThemeOnIdx('');
							handleReplyView();
							setOpen(!Open);
							editMode.current = false;
						}}
					>
						<TfiPlus />
					</button>
				</div>
				<nav className='pagination'>
					{Post.length > 0 &&
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
				<div className='showBox'>
					<div className='postList'>
						{Post.length > 0 &&
							Post.map((el, idx) => {
								const date = JSON.stringify(el.date);
								const strDate = changeText(date?.split('T')[0].slice(1), '.');

								if (
									idx >= perNum.current * CurNum &&
									idx < perNum.current * (CurNum + 1)
								) {
									return (
										<article
											key={el + idx}
											className={
												ThemeOnIdx === idx
													? `commentBox ${el.theme}`
													: 'commentBox'
											}
											onClick={() => handleThemeOnIdx(idx)}
										>
											<div className='bg'></div>
											<div className='txt'>
												<div className='top'>
													{!el.enableUpdate ? <h2>{el.title}</h2> : 
													<div className='editMode'>
														<input
															type='text'
															id='titleInput'
															placeholder='title'
															defaultValue={el.title}
															ref={refEditTit}
														/>
														<button onClick={(e)=>resetEdit(e,'title')}>&#8634;</button>
														</div>
													}
													{!el.enableUpdate && <div className='likeCount'>
														<p>{el.likeCount}</p>
														<button onClick={() => {
															handleLikeCount(idx);
														}}><IoMdHeart /></button>
													</div>}
												</div>
												{!el.enableUpdate ? <p className='content'>{el.content}</p> : 
													<div className='editMode'>
														<textarea
															cols='30'
															rows='3'
															id='contentInput'
															placeholder='content'
															defaultValue={el.content}
															ref={refEditCon}
														/>
														<button onClick={(e)=>resetEdit(e,'content')}>&#8634;</button>
														</div>
													}
												<span>{strDate}</span>
												<span
													className={
														el.replyView ? 'replyViewBtn on' : 'replyViewBtn'
													}
													onClick={() => {
														handleReplyView(idx);
													}}
												>
													<span>View Reply</span>
													{el.replyView ? <AiOutlineUp /> : <AiOutlineDown />}
												</span>
												{el.reply && el.reply.length > 0 && (
													<div className={
														el.replyView ? 'replyView on' : 'replyView'
													}>
														<ul>
																{el.reply.map((reply, index) => {
																	if (Object.keys(reply).length > 0) {
																		const date = JSON.stringify(reply.date);
																		const replyStrDate = changeDate(
																			date.slice(1,-1)
																		);
																		return (
																			<li key={reply.date + idx}>
																				<span>
																					<BsArrowReturnRight />
																					{reply.value}
																				</span>
																				<span>
																					<span>{replyStrDate[0]}</span>
																					<span>{replyStrDate[1]}</span>
																					<span onClick={()=>handleReplyDelete(idx, index)}><AiOutlineDelete /></span>
																				</span>
																			</li>
																		);
																	}
																})}
																<label htmlFor='replyInput' className='replyInput'>
																	<input
																		type='text'
																		id='replyInput'
																		placeholder='Leave your reply!'
																	/>
																	<button
																		type='button'
																		onClick={(e) => handleInputChange(e, idx)}
																	>
																		+
																	</button>
																</label>
														</ul>
													</div>
												)}
												<div className='bottom'>
													<span className={`themeImg ${el.theme}`}>
														<RiArrowRightDownLine onClick={()=>{
															handleThemeOnIdx();
															setThemeOnIdx('');
															handleReplyView();
															editMode.current = false;
														}}/>
													</span>
													<p>&#64;{el.nickname}</p>
													<nav>
														<button
															onClick={() => enableUpdate(idx)}
															className={el.enableUpdate ? 'on' : ''}
														>
															<LiaEdit />
														</button>
														<button onClick={() => deletePost(idx)}>
															<AiOutlineDelete />
														</button>
													</nav>
												</div>
											</div>
										</article>
									);
								} else {
									return null;
								}
							})}
					</div>
				</div>
				<div className='gradationBox'></div>
				<h2 className='bottomText'>LeT'S TaLK.</h2>
			</div>
		</Layout>
	);
}
