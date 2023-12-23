import { useCallback, useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { useSplitText } from '../../../hooks/useText';
import { useThrottle } from '../../../hooks/useThrottle';
import { RiArrowRightUpLine } from 'react-icons/ri';

export default function Contact() {
	const form = useRef();
	const splitText = useSplitText();
	const splitTxt = useRef(null);
	const [ActiveList, setActiveList] = useState(null);

	useEffect(() => {
		splitText(splitTxt.current, 'CONFIDENCE', 0, 0);
	}, []);
	const resetForm = () => {
		const elArr = form.current.children;

		Array.from(elArr).forEach((el) => {
			if (
				el.name === 'user_name' ||
				el.name === 'user_email' ||
				el.name === 'message'
			)
				el.value = '';
		});
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if (!user.value || !email.value || !txtArea.value)
			return alert('이름, 답장받을 이메일주소 문의내용을 모두 입력하세요.');

		emailjs
			.sendForm(
				'service_l5guurg',
				'template_ay7vtre',
				form.current,
				'LQD0o9TZqyvfdGflj'
			)
			.then(
				(result) => {
					alert('문의 내용이 성공적으로 전송되었습니다.');
					resetForm();
				},
				(error) => {
					alert(
						'일시적인 장애로 문의 전송에 실패했습니다. 다음의 메일주소로 보내주세요.'
					);
					resetForm();
				}
			);
	};

	const kakao = useRef(window.kakao);

	//화면에 출력될 지도정보 배열의 순번이 담길 state
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	//참조객체
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const marker = useRef(null);
	const mapInstance = useRef(null);

	//지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: 'Leeum Museum',
			latlng: new kakao.current.maps.LatLng(
				37.538336570005896,
				126.99911462086432
			),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(64, 64),
			imgPos: { offset: new kakao.current.maps.Point(64, 64) },
		},
		{
			title: 'AMOREPACIFIC Museum',
			latlng: new kakao.current.maps.LatLng(
				37.5290340313225,
				126.96845839723807
			),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(64, 64),
			imgPos: { offset: new kakao.current.maps.Point(64, 64) },
		},
		{
			title: 'Hangaram Museum',
			latlng: new kakao.current.maps.LatLng(
				37.480265966869645,
				127.01420032016485
			),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(64, 64),
			imgPos: { offset: new kakao.current.maps.Point(64, 64) },
		},
	]);

	//마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(
			mapInfo.current[Index].imgSrc,
			mapInfo.current[Index].imgSize,
			mapInfo.current[Index].imgOpt
		),
	});

	
	//로드뷰 출력함수
	const roadview = useCallback(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	}, [Index]);

	//지도위치 가운데 보정 함수
	const setCenter = useCallback(() => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		//roadview.current();
	}, [Index]);
	//useThrottle로 cetCenter함수를 인수러 넣어서 thottling적용된 새로운 함수로 반환 (hof)
	const throttledSetCenter = useThrottle(setCenter);

	//Index값 변경시마다 지도정보 갱신해서 화면 재랜더링 useEffect
	useEffect(() => {
		//Index값이 변경되는 것은 출력할 맵정보가 변경된다는 의미이므로 기존 프레임 안쪽의 정보를 지워서 초기화
		mapFrame.current.innerHTML = '';
		viewFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false);
	}, [Index]);
	useEffect(() => {
		//resize이벤트에 throttle적용된 함수를 등록 (이벤트자체는 1초에 60번 발생하지만 핸들러함수는 1초에 2번만 실행됨)
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(
					kakao.current.maps.MapTypeId.TRAFFIC
			  )
			: mapInstance.current.removeOverlayMapTypeId(
					kakao.current.maps.MapTypeId.TRAFFIC
			  );
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
						<p>How to contact </p>
						{mapInfo.current.map((el, idx) =>
							//prettier-ignore
							<span key={`${el.title}`}> 
								<button onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>{el.title}</button><span>/</span>
							</span>
						)}
					</nav>
				</div>
				<section className='tab'>
					<div className='info'>
						<button
							className={Traffic ? 'on' : ''}
							onClick={() => {
								setTraffic(!Traffic);
							}}
						>
							<em>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</em>
						</button>
						<button
							className='on'
							onClick={() => {
								setView(!View);
							}}
						>
							<em>{View ? 'map' : 'road view'}</em>
						</button>
						<button onClick={setCenter}>
							<em>위치 초기화</em>
						</button>
					</div>
					<article
						className={`mapBox ${View ? '' : 'on'}`}
						ref={mapFrame}
					></article>
					<article
						className={`viewBox ${View ? 'on' : ''}`}
						ref={viewFrame}
					></article>
				</section>
			</div>
			<div id="qnaSection">
				<h2>COMMON<br />QUESTIONS</h2>
				<div className="list">
					<ul className={ActiveList}>
						<li onClick={() => ActiveList!== 'first' ? setActiveList('first'): setActiveList('')}>
							<h3><span>WHAT SERVICES DO YOU OFFER?</span> <RiArrowRightUpLine /></h3>
							<p>We offer a range of service including branding, e-commerce, campagins, social media, web development, and digital marketing.</p>
						</li>
						<li onClick={() => ActiveList!== 'second' ? setActiveList('second'): setActiveList('')}>
							<h3><span>HOW DO YOU DETERMINE PROJECT PRICING?</span> <RiArrowRightUpLine /></h3>
							<p>Our project pricing is determined by the scope of the project, the level of expertise required, and the timeline for completion.</p>
						</li>
						<li onClick={() => ActiveList!== 'third' ? setActiveList('third'): setActiveList('')}>
							<h3><span>HOW LONG DOES A TYPICAL PROJECT TAKE?</span> <RiArrowRightUpLine /></h3>
							<p>The length of a project depends on the scope and complexity of the work required. We work closely with our clients to establish a realistic timeline that meets their needs.</p>
						</li>
						<li onClick={() => ActiveList!== 'fourth' ? setActiveList('fourth'): setActiveList('')}>
							<h3><span>WHAT SETS YOUR AGENCY APART FROM OTHERS?</span> <RiArrowRightUpLine /></h3>
							<p>Our agency is committed to delivering personalized, tailored solutions that meet our clients' unique needs. We focus on building strong relationships with our clients to ensure their success.</p>
						</li>
						<li onClick={() => ActiveList!== 'fifth' ? setActiveList('fifth'): setActiveList('')}>
							<h3><span>HOW DO I GET STARTED WITH YOUR AGENCY?</span> <RiArrowRightUpLine /></h3>
							<p>The first step is to contact us to schedule a consultation. During the consultation, we will discuss your needs and goals, and determine the best way to move forward with your project.</p>
						</li>
					</ul>
				</div>
			</div>
			<div id='mailSection'>
				<aside>
					<span>LET'S</span>
					<span>GET IN</span>
					<span>TOUCH</span>
				</aside>
				<div>
					<form ref={form} onSubmit={sendEmail}>
						<label>FULL Name</label>
						<input type='text' name='user_name' />
						<label>Email</label>
						<input type='email' name='user_email' />
						<label>Message</label>
						<textarea name='message' cols='30' rows='5' />
						<button type='submit'>
							<RiArrowRightUpLine />
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
}
