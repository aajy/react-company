import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Footer.scss';
import {
	FaFacebookF,
	FaBehance,
	FaLinkedinIn,
	FaInstagram,
	FaDribbble,
} from 'react-icons/fa';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function Footer() {
	const MenuData = useSelector(store => store.menuReducer.menuTextArr)
	const emailAddress = useRef(null);
	const handleEmail = (e) => {
		e.preventDefault();
		console.log('Newsletter 신청하는 이메일 주소', emailAddress.current.value);
	};
	return (
		<footer className='Footer'>
			<div className='left'>
				<div>
					<h3>Website map</h3>
					<ul className='menu'>
						{MenuData && MenuData.map((menu, index) => {
							return (
								<li key={menu.num + index}>
									<NavLink to={menu.link}>{menu.menu}</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
				<div>
					<h3>Newsletter our</h3>
					<div>
						<input type='text' ref={emailAddress} />
						<button onClick={(e) => handleEmail(e)}>
							<RiArrowRightUpLine />
						</button>
					</div>
				</div>
			</div>
			<div className='center'>
				<p>
					Database powerful AI expert
					<br />
					on processing marketing data
				</p>
				<h3>abbvie</h3>
				<p>Level up your cases with tons of data</p>
			</div>
			<div className='right'>
				<h3>Contacts</h3>
				<ul>
					<li>UK: +12 003 345 6789</li>
					<li>react-portfolio vercel</li>
					<li>aajy.000@gmail.com</li>
					<li>Seoul Korea</li>
				</ul>
				<ul>
					<li>
						<FaFacebookF />
					</li>
					<li>
						<FaBehance />
					</li>
					<li>
						<FaLinkedinIn />
					</li>
					<li>
						<FaInstagram />
					</li>
					<li>
						<FaDribbble />
					</li>
				</ul>
				<p>
					<span>abb</span>
					<span>
						2023 halo lab
						<br />
						&#169; All rights reserved
					</span>
				</p>
			</div>
		</footer>
	);
}
