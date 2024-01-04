import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import { useRef, useState } from 'react';

export default function Visual() {
	const num = useRef(7);
	const swipeRef = useRef(null);
	const { isSuccess, data } = useYoutubeQuery();
	console.log('data: ', data);

	const [PrevIndex, setPrevIndex] = useState(0);
	const [Index, setIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);

	function splitTitle(title) {
    const Arr = title.split(' ');
		return Arr.slice(0, 6).join(' ');
}
	const swiperOpt = useRef({
		modules: [Autoplay],
		// direction: "vertical",
		loop: true,
		speed: 800,
		slidesPerView: 1,
		spaceBetween: 100,
		centeredSlides: true,
		loopedSlides: num.current, //loop모드일때 실제동작될 슬라이드 갯수 지정하면 초기순번 어그러지는 문제 해결 가능
		onSwiper: swiper => {
			swipeRef.current = swiper;
		},
		onSlideChange: (swiper) => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0
				? setPrevIndex(num.current - 1)
				: setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1
				? setNextIndex(0)
				: setNextIndex(swiper.realIndex + 1);
		},
		autoplay: { delay: 8000, disableOnInteraction: true },
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 },
		},
	});

	return (
		<figure className='Visual'>
			<div className='txtBox'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= 7) return null;

							return (
								<li key={el.id}
								className={idx === Index ? 'on' : ''}
								onClick={()=>swipeRef.current.slideTo(idx)}
								>
									<h3>{splitTitle(el.snippet.title)}</h3>
								</li>
							);
						})}
				</ul>
				<div className='counter'>
				<strong>0{Index + 1}</strong>/<span>0{num.current}</span>
			</div>
				<nav className='preview'>
				{isSuccess && (
					<>
						<p
							className='prevBox'
							onClick={() => swipeRef.current.slidePrev(400)}
						>
							<img
								src={data[PrevIndex].snippet.thumbnails.default.url}
								alt={data[PrevIndex].snippet.title}
							/>
						</p>
						<p
							className='nextBox'
							onClick={() => swipeRef.current.slideNext(400)}
						>
							<img
								src={data[NextIndex].snippet.thumbnails.default.url}
								alt={data[NextIndex].snippet.title}
							/>
						</p>
					</>
				)}
			</nav>
			</div>

			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img
											src={el.snippet.thumbnails.standard.url}
											alt={el.snippet.title}
										/>
									</p>
									<p>
										<img
											src={el.snippet.thumbnails.standard.url}
											alt={el.snippet.title}
										/>
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>

			{/* <nav className='preview'>
				{isSuccess && (
					<>
						<p
							className='prevBox'
							onClick={() => swipeRef.current.slidePrev(400)}
						>
							<img
								src={data[PrevIndex].snippet.thumbnails.default.url}
								alt={data[PrevIndex].snippet.title}
							/>
						</p>
						<p
							className='nextBox'
							onClick={() => swipeRef.current.slideNext(400)}
						>
							<img
								src={data[NextIndex].snippet.thumbnails.default.url}
								alt={data[NextIndex].snippet.title}
							/>
						</p>
					</>
				)}
			</nav> */}
		</figure>
	);
}
