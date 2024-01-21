import './Pics.scss';
import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { TbMap2 } from "react-icons/tb";

export default function Pics() {
	const pathEl = useRef(null);
	const pathEl2 = useRef(null);
	const pathEl3 = useRef(null);

	const handleCustomScroll = scroll => {
		const pathLen = 1680;
		const pathLen2 = 1945;
		const pathLen3 = 1610;
    
		pathEl.current.style.strokeDashoffset = pathLen;
		pathEl2.current.style.strokeDashoffset = pathLen;
		pathEl3.current.style.strokeDashoffset = pathLen;

		//섹션기준점에 도달하기 전까지는 기존 값 고수
		if (scroll < 0) {
			pathEl.current.style.strokeDashoffset = pathLen;
			pathEl2.current.style.strokeDashoffset = pathLen;
			pathEl3.current.style.strokeDashoffset = pathLen;
		}
		//섹션에 도달하는 순간부터 스크롤값 연동
		if (scroll >= 0) {
			let resultScroll = 0;
			pathLen - scroll * 4 < 0 ? (resultScroll = 0) : (resultScroll = pathLen - scroll * 4);
			pathLen2 - scroll * 4 < 0 ? (resultScroll = 0) : (resultScroll = pathLen2 - scroll * 4);
			pathLen3 - scroll * 4 < 0 ? (resultScroll = 0) : (resultScroll = pathLen3 - scroll * 4);
			pathEl.current.style.strokeDashoffset = resultScroll;
			pathEl2.current.style.strokeDashoffset = resultScroll;
			pathEl3.current.style.strokeDashoffset = resultScroll;

		}
		//섹션을 벗어나는 순간부터는 0값을 고수
		if (scroll >= scroll + refEl.current.offsetHeight) {
			pathEl.current.style.strokeDashoffset = 0;
			pathEl2.current.style.strokeDashoffset = 0;
			pathEl3.current.style.strokeDashoffset = 0;
		}
	};
	const { refEl } = useScroll(handleCustomScroll);

	return (
		<div className='Pics myScroll' ref={refEl}>
      <div className="top">
        <h2>What Next Tech<br/>Can Do for You<span><TbMap2/></span></h2>
        <div className='text'>
          <p>From healthcare to education,<br/>eCommerce to travel, out innovative<br/>solutions are redefining the way<br/>businesses and individuals operate.</p>
          <Link to="/contact">Detail More</Link>
        </div>
      </div>
			<div className='svgBox'>
				{/* vieBox(가로위치값, 세로위치값, 가로폭의 비율, 세로폭의 비율) 0 0 512 512*/}
        <div className='svg'>
          <svg viewBox="-1 -1 450 514">
            <path
            ref={pathEl}
            d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
          </svg>
          <h3>Accuracy and Consistency</h3>
          <p>The value assistant maintaining a high level oif accuracy and consistency in executing tasks.</p>
        </div>
        <div className='svg'>
          <svg viewBox="-1 0 578 512">
            <path 
            ref={pathEl2}
            d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z"/>
          </svg>
          <h3>Cost Savings</h3>
          <p>Business can reduce operational costs bt automating tasks and improving efficiency with the valual assistant.</p>
        </div>
        <div className='svg'>
          <svg viewBox="-1 -2 514 518">
            <path
            ref={pathEl3}
            d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
          </svg>
          <h3>Personalization</h3>
          <p>The virtual assistant offers personalized recommendations and services. railcred to your specific needs and preferences.</p>
        </div>
			</div>
      <div className="contact">
      <p>LET'S GET IN TOUCH</p>
      <span><RiArrowRightUpLine/></span>
      </div>
		</div>
	);
}
