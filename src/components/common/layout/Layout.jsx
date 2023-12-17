import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';
import { useHistory } from 'react-router-dom';

export default function Layout({ title, className, children }) {
	const history = useHistory();
	const splitText = useSplitText();
	const splitTxt = useRef(null);
	const refFrame = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
		splitText(splitTxt.current, title ? title.toUpperCase() : className.toUpperCase(),0.2, 0);
	}, []);
	return (
		<main className={`Layout ${className}`} ref={refFrame}>
			<div className='layout_top' style={{ display : className === 'Contact' ?'none' : 'block' }}>
				<span
				style={{ display: className === 'Detail' ? 'block' : 'none' }}
				onClick={()=>history.goBack()}
				><span>previous<br/>page</span></span>
				<h1 ref={splitTxt}>{title  || className}</h1>
			</div>
			<div className='layoutWrap'>{children}</div>
		</main>
	);
}
