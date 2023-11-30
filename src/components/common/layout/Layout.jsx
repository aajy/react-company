import { useEffect, useRef } from 'react';
import './Layout.scss';

export default function Layout({ title, children }) {
	const refFrame = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);
	return (
		<main className={`Layout ${title}`} ref={refFrame}>
			<h1>{title}</h1>
			{children}
		</main>
	);
}
