import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';

export default function Layout({ title, className, children }) {
	const splitText = useSplitText();
	const splitTxt = useRef(null);
	const refFrame = useRef(null);

	useEffect(() => {
		splitText(splitTxt.current, title.toUpperCase());
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);
	return (
		<main className={`Layout ${className}`} ref={refFrame}>
			<h1 ref={splitTxt}>{title}</h1>
			<div className='wrap'>{children}</div>
		</main>
	);
}
