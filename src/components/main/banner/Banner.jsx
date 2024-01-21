import { useEffect, useRef, useState } from 'react';
import './Banner.scss';
import { LuMonitorPlay } from "react-icons/lu";
import { RiArrowRightUpLine } from 'react-icons/ri';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCustomText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';
import { useSelector } from 'react-redux';

export default function Banner(){
  const refBox = useRef(null);
  const shortenText = useCustomText('shorten');
  const titEl = useRef(null);
	const titEl2 = useRef(null);

	const handleCustomScroll = scroll => {
		if (scroll < 0) {
			titEl.current.style.transform = `scale(3) translateX(${scroll}px)`;
			titEl.current.style.opacity = 0;
			titEl2.current.style.transform = `translateX(${scroll * 0.5}px)`;
		} else {
			titEl.current.style.transform = `scale(1) translateX(0px)`;
			titEl.current.style.opacity = 1;
			titEl2.current.style.transform = `translateX(0px)`;
			titEl2.current.style.opacity = 1;
		}
	};

	const { refEl } = useScroll(handleCustomScroll);
  const Vids = useSelector((store) => {
		return store.youtubeReducer.youtube.slice(0,5);
	});
  const handleActive = e => {
    const boxs = refBox.current.querySelectorAll('.vidBox');
		boxs.forEach((box) => box.classList.remove('active'));
		e && e.target.classList.add('active');
    e.target.classList.add('active')
  }
  return(
    <div className='Banner' ref={refEl}>
      <section className="top">
        <div className='center'>
          <h2 ref={titEl}>Featured Cases</h2>
          <h3 ref={titEl2}>2018 - 2023</h3>
          <p><span><LuMonitorPlay/></span>From healthcare to education,<br/>eCommerce to travel, out innovative<br/>solutions are redefining the way<br/>businesses and individuals operate.</p>
        </div>
        <div className="right">
          <Link to="/youtube">Detail More</Link>
        </div>
      </section>

      <article ref={refBox}>
        {Vids.length && Vids.map((data, idx) => {
          return (
            <div key={data.snippet.title} className={`vidBox ${idx ===0?'active':''}`} onMouseEnter={handleActive}>
              <span>{data.snippet.publishedAt.slice(0,4)}</span>
              <h3>{shortenText(data.snippet.title,13,'').replace(/[^-a-z,A-Z]/g,'')}</h3>
              <div>
                <div className="img"><img src={data.snippet.thumbnails.standard.url} alt="" /></div>
                <div className='nav'>
                  <span><RiArrowRightUpLine /></span>
                  <Link to={`/youtube/detail/${data.id}`}>Detail More</Link>
                </div>
                <p>{shortenText(data.snippet.description, 300)}</p>
                <h3>{shortenText(data.snippet.title,13,'').replace(/[^-a-z,A-Z]/g,'')}</h3>
                <h3>{shortenText(data.snippet.title,13,'').replace(/[^-a-z,A-Z]/g,'')}</h3>
              </div>
            </div>
          )
        })}
      </article>
    </div>
  );
}