import { useEffect, useRef, useState } from 'react';
import './Banner.scss';
import { LuMonitorPlay } from "react-icons/lu";
import { RiArrowRightUpLine } from 'react-icons/ri';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCustomText } from '../../../hooks/useText';

export default function Banner(){
  const refBox = useRef(null);
  const [Vids, setVids] = useState([]);
  const shortenText = useCustomText('shorten');
  const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 5;

		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		//playlist
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			const items = json.items;
			const newArray = items.map(item => {
        return { ...item, active: false };
			});
			setVids(newArray);
		} catch (err) {
			console.log(err);
		}
	};
  const handleActive = e => {
    const boxs = refBox.current.querySelectorAll('.vidBox');
		boxs.forEach((box) => box.classList.remove('active'));
		e && e.target.classList.add('active');
    e.target.classList.add('active')
  }
  useEffect(() => {
		fetchYoutube();
	}, []);
  return(
    <div className='Banner'>
      <section className="top">
        <div className='center'>
          <h2>Featured Cases</h2>
          <h3>2018 - 2023</h3>
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
                  <Link to="/youtube">Detail More</Link>
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