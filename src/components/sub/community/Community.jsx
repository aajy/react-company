import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import InputBox from './InputBox';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const [Open, setOpen] = useState(true);
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());
	const [CurNum, setCurNum] = useState(0);
	const len = useRef(0); //전체 Post갯수를 담을 참조 객체
	const pageNum = useRef(0); //전체 페이지 갯수를 추후에 연산해서 담을 참조객체
	const perNum = useRef(3); //한 페이지당 보일 포스트 갯수
	

	useEffect(() => {
		len.current = Post.length;

		pageNum.current =
			len.current % perNum.current === 0
				? len.current / perNum.current
				: parseInt(len.current / perNum.current) + 1;
		console.log(pageNum.current);
	}, [Post]);

	return (
		<Layout className={'Community'}>
			<InputBox Open={Open} setOpen={setOpen} />
			<div className='showBox'>
				{Post.map((el, idx) => {
					const date = JSON.stringify(el.date);
					const strDate = changeText(date.split('T')[0].slice(1), '.');

					if (
						idx >= perNum.current * CurNum &&
						idx < perNum.current * (CurNum + 1)
					) {
						return (
							<article key={el + idx}>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
									<span>{strDate}</span>
								</div>
								<nav>
									{/* <button onClick={() => enableUpdate(idx)}>Edit</button>
									<button onClick={() => deletePost(idx)}>Delete</button> */}
								</nav>
							</article>
						);
					} else {
						return null;
					}
				})}
			</div>
		</Layout>
	);
}
