import './Illust.scss';
import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';

export default function Illust() {
	// const pathEl = useRef(null);
	const figureEl = useRef(null);

	const handleCustomScroll = (scroll) => {
		// const pathLen = 1510;
		// pathEl.current.style.strokeDashoffset = pathLen;

		//섹션기준점에 도달하기 전까지는 기존 값 고수
		if (scroll < 0) {
			// pathEl.current.style.strokeDashoffset = pathLen;
		}
		//섹션에 도달하는 순간부터 스크롤값 연동
		if (scroll >= 0) {
			let resultScroll = 0;
			// pathLen - scroll * 4 < 0
			// 	? (resultScroll = 0)
			// 	: (resultScroll = pathLen - scroll * 4);
			// pathEl.current.style.strokeDashoffset = resultScroll;
		}
		if (scroll >= 100) {
			console.log(figureEl.current.getAttribute('d'));
			figureEl.current.setAttribute(
				'd',
				'M1 1H116.597C158.987 26.0169 251.289 76.0506 281.378 76.0506C318.99 76.0506 457.733 67.3757 524.145 76.0506C577.275 82.9905 586.7 159.82 584.771 197.367L480.747 425.542L203.393 440L1 197.367V1Z'
			);
		}
		//섹션을 벗어나는 순간부터는 0값을 고수
		if (scroll >= scroll + refEl.current.offsetHeight) {
			// pathEl.current.style.strokeDashoffset = 0;
			figureEl.current.setAttribute(
				'd',
				'M 10 300 Q 100 250 200 300 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 150 0'
			);
		}
	};
	const { refEl } = useScroll(handleCustomScroll);

	return (
		<div className='Illust myScroll' ref={refEl}>
			<div className='svgBox'>
				{/* vieBox(가로위치값, 세로위치값, 가로폭의 비율, 세로폭의 비율)*/}
				<svg className='svg'>
					<defs>
						<path
							ref={figureEl}
							id='text-curve'
							className='path'
							d='M 10 300 Q 100 250 200 300 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 150 0'
						></path>
					</defs>
					<text x='10' y='100'>
						<textPath href='#text-curve'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
							suscipit rem similique quis et ad rerum iste in illum natus!
						</textPath>
					</text>
				</svg>
			</div>
		</div>
	);
}
