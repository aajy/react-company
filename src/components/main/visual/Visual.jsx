import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import React,{ useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCustomText } from '../../../hooks/useText';

export default function Visual() {
	const num = useRef(8);
  const Vids = useSelector((store) => {
		return store.youtubeReducer.youtube;
	});
	const swipeRef = useRef(null);
	const [PrevIndex, setPrevIndex] = useState(0);
	const [Index, setIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);

  const shortenText = useCustomText('shorten');
	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 50,
		centeredSlides: true,
		loopedSlides: num.current,
		autoplay: { delay: 2000, disableOnInteraction: true },
		breakpoints: { 1000: { slidesPerView: 2 }, 1400: { slidesPerView: 3 } },
		onSwiper: swiper => (swipeRef.current = swiper),
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(swiper.realIndex + 1);
		}
	});

	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
				{Vids.length &&
						Vids.map((el, idx) => {
						if (idx >= num.current) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
			
			<div className='txtBox'>
				<ul>
					{Vids.length &&
						Vids.map((el, idx) => {
							if (idx >= num.current) return null;

							return (
								<React.Fragment key={el.id}>
                  <li
                    className={idx === Index ? 'on' : ''}
                    onClick={() => swipeRef.current.slideToLoop(idx)}
                  >
                    <h3>{shortenText(el.snippet.title,20,'')}</h3>
                  </li>
                  <Link 
                    to={`/youtube/detail/${el.id}`}
                    className={idx === Index ? 'on' : ''}
                  >View Detail</Link>
                </React.Fragment>
							);
						})}
				</ul>
			</div>			

			<nav className='preview'>
				{Vids.length && (
					<>
						<p className='prevBox' onClick={() => swipeRef.current.slidePrev(400)}>
							<img src={Vids[PrevIndex].snippet.thumbnails.default.url} alt={Vids[PrevIndex].snippet.title} />
						</p>
						<p className='nextBox' onClick={() => swipeRef.current.slideNext(400)}>
							<img src={Vids[NextIndex].snippet.thumbnails.default.url} alt={Vids[NextIndex].snippet.title} />
						</p>
					</>
				)}
			</nav>

			<ul className='pagination'>
				{Array(num.current)
					.fill()
					.map((_, idx) => {
						return <li key={idx} className={idx === Index ? 'on' : ''} onClick={() => swipeRef.current.slideToLoop(idx, 400)}></li>;
					})}
			</ul>

			<div className='barFrame'>
				<p className='bar' style={{ width: (100 / num.current) * (Index + 1) + '%' }}></p>
			</div>
		</figure>
	);
}
