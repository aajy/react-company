import { useEffect, useRef, useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid='100%', ht='100vh', children }) {
	const { isCookie, setCookie } = useCookie();
	const cookie = useRef(null);
	const CheckEl = useRef(null);
	const [Close, setClose] = useState(isCookie('today=done'));
	const path = useRef(process.env.PUBLIC_URL);
	//쿠키초기화하기
	// setCookie('today', 'done', 0);

	const handleClose = () => {
		const isChecked = CheckEl.current.checked;
		if (isChecked) setCookie('today', 'done', 10);
		setClose(true);
	};
	useEffect(() => {
		if (cookie.current) {
			setTimeout(() => {
				cookie.current.classList.add('on');
			}, 300);
		}
	}, []);
	return (
		<>
			{!Close && (
				<aside
					className='cookieModal'
					style={{
						width: wid,
						height: ht,
					}}
				>
				<div className='cookieWrap' ref={cookie}>
						<div className="img">
							<img src={`${path.current}/img/cookie.png`} alt='' />
						</div>
						<div className='content'>{children}</div>
					
						<div className='controls'>
							<nav>
								<label>
									<input type='checkbox' ref={CheckEl} id='checkbox'/>
									오늘 하루 팝업 보지 않기
								</label>
							</nav>
					
							<span className='closeModal' onClick={() => handleClose()}></span>
						</div>
				</div>
				</aside>
			)}
		</>
	);
}
