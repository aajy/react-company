import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { RiArrowRightDownLine } from 'react-icons/ri';
import { useSplitText } from '../../../hooks/useText';

export default function Contact() {
	const form = useRef();
	const splitText = useSplitText();
	const splitTxt = useRef(null);
	const InfoActive = useRef(null);

	//그룹형식의 DOM을 탐색할때 반환되는 두가지형태의 유사배열
	//parentDOM.children : HTMLCollection (유사배열: forEach, map 모두 반복불가, Live DOM:상태변경이 실시간)
	//parentDOM.querySelectorAll : NodeList (유사배열: forEach로는 반복 가능. Static DOM:탐색된 시점의 정적 DOM)
	useEffect(() => {
		splitText(splitTxt.current, "CONFIDENCE",0, 0);
	}, []);
	const resetForm = () =>{
		const elArr = form.current.children;

		Array.from(elArr).forEach((el)=> {
			console.log(el)
			if( el.name==='user_name' || el.name==='user_email'||el.name==='message' ) el.value='';
		})
	}

	const sendEmail = e => {
		e.preventDefault();	

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if(!user.value || !email.value || !txtArea.value) return alert('이름, 답장받을 이메일주소 문의내용을 모두 입력하세요.');

		emailjs.sendForm('service_l5guurg', 'template_ay7vtre', form.current, 'LQD0o9TZqyvfdGflj').then(
			result => {
				alert('문의 내용이 성공적으로 전송되었습니다.');
				resetForm();
			},
			error => {
				alert('일시적인 장애로 문의 전송에 실패했습니다. 다음의 메일주소로 보내주세요.')
				resetForm();
			}
		);
	};

	const kakao = useRef(window.kakao);

	//화면에 출력될 지도정보 배열의 순번이 담길 state
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const mapFrame = useRef(null);
	const viewFrame = useRef(null);

	const marker = useRef(null);
	const mapInstance = useRef(null);

	//지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: 'Leeum Museum',
			latlng: new kakao.current.maps.LatLng(37.538336570005896, 126.99911462086432),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(64, 64),
			imgPos: { offset: new kakao.current.maps.Point(64, 64) }
		},
		{
			title: ' AMOREPACIFIC Museum',
			latlng: new kakao.current.maps.LatLng(37.5290340313225, 126.96845839723807),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(64, 64),
			imgPos: { offset: new kakao.current.maps.Point(64, 64) }
		},
		{
			title: 'Hangaram Museum',
			latlng: new kakao.current.maps.LatLng(37.480265966869645, 127.01420032016485),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(64, 64),
			imgPos: { offset: new kakao.current.maps.Point(64, 64) }
		}
	]);

	//마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	const roadview = () => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	};

	const setCenter = () => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		roadview();
	};

	//컴포넌트 마운트시 참조객체에 담아놓은 돔 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		roadview();
		//지도 타입 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);

		//지도 줌 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);

		//휠에 맵 줌 기능 비활성화
		mapInstance.current.setZoomable(false);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout title={'Contact'} className={'Contact'}>
			<div className='top'>
				<h1 ref={splitTxt}>CONFIDENCE</h1>
				<ul>
					<li>SENCE</li>
					<li>ADORABLE</li>
					<li> FAITH (IN)</li>
					<li>[ASSERTIVE]</li>
					<li>APLOMB</li>
				</ul>
			</div>
			<div id='mapSection'>
				<div className='controlBox'>
					<nav className='branch'>
						<h2>our Location [branch_ ]</h2>
						<span>How to contact </span>
						{mapInfo.current.map((el, idx) =>
							//prettier-ignore
							<>
								<button key={el.title + idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>{el.title}</button><span>/</span>
							</>
						)}
					</nav>

				</div>
				<section className='tab'>
					<div className='info'>
						<button
							className={InfoActive.current ==='traffic'?'on':''}
							onClick={() => {
								InfoActive.current === 'traffic' ? InfoActive.current = null : InfoActive.current = 'traffic'; setTraffic(!Traffic);}
							}
						>
							<em>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</em>
						</button>
						<button
							className={InfoActive.current ==='road'?'on':''}
							onClick={() => {
								InfoActive.current === 'road' ? InfoActive.current = null : InfoActive.current = 'road'; setView(!View);}
							}
						>
							<em>{View ? 'map' : 'road view'}</em>
						</button>
						<button onClick={setCenter}>
							<em>위치 초기화</em>
						</button>
					</div>
					<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
					<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
				</section>
			</div>
			<div id='mailSection'>
				<div>
					<h2>
						LET'S<br />
						GET IN<br />
						TOUCH
					</h2>
				</div>
				<div>
					<form ref={form} onSubmit={sendEmail}>
						<label>Name</label>
						<input type='text' name='user_name' />
						<label>Email</label>
						<input type='email' name='user_email' />
						<label>Message</label>
						<textarea name='message' />
						<button type='submit'><RiArrowRightDownLine /></button>
					</form>
				</div>
			</div>
		</Layout>
	);
}