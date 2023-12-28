import { useRef, useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid='100%', ht='100vh', children }) {
	const { isCookie, setCookie } = useCookie();
	const CheckEl = useRef(null);
	const [Close, setClose] = useState(isCookie('today=done'));
	//쿠키초기화하기
	// setCookie('today', 'done', 0);

	const handleClose = () => {
		const isChecked = CheckEl.current.checked;
		if (isChecked) setCookie('today', 'done', 10);
		setClose(true);
	};
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
				</aside>
			)}
		</>
	);
}
