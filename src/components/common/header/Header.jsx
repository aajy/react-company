import { useState } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { LuSearch } from 'react-icons/lu';

export default function Header() {
	const [Global, setGlobal] = useState('');
	const [IsGlobalDropBoxOpen, setIsGlobalDropBoxOpen] = useState(false);
	const [ToggleMenu, setToggleMenu] = useState(false);

	const globalList = ['Africa', 'Asia Pacific', 'Europe', 'Latin America'];
	const handleBlurGlobalContainer = () => {
		setTimeout(() => {
			setIsGlobalDropBoxOpen(false);
		}, 200);
	};
	const handleGlobalOpen = () => {
		setIsGlobalDropBoxOpen(!IsGlobalDropBoxOpen);
	};
	const handleGlobal = (e, el) => {
		const newGlobal = el;
		setGlobal(newGlobal);
	};
	return (
		<header>
			<div className='top'>
				<h1>
					<Link to='/'>Abbvie</Link>
				</h1>
				<div className='dropBox'>
					<div
						className='container'
						onBlur={(e) => handleBlurGlobalContainer(e)}
					>
						<label onClick={() => handleGlobalOpen()}>
							<button className='dropdown-button'>
								{Global ? Global : 'GLOBAL IN'}
							</button>
						</label>
						{IsGlobalDropBoxOpen && (
							<div
								className={
									IsGlobalDropBoxOpen
										? 'dropdown-container open'
										: 'dropdown-container'
								}
							>
								<ul className='dropdown-content'>
									{globalList.map((el, idx) => (
										<li key={idx} onClick={(e) => handleGlobal(e, el)}>
											{el}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='bottom'>
				<ul className='scrollMenu'>
					<li>INVESTORS</li>
					<li>NEWSCENTER</li>
					<li>PATIENT ASSISTANCE</li>
				</ul>
				<ul className='menu'>
					<li>
						<NavLink to='/department' activeClassName={'on'}>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeClassName={'on'}>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeClassName={'on'}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/community' activeClassName={'on'}>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName={'on'}>
							Contact
						</NavLink>
					</li>
					<button>
						<LuSearch />
					</button>
				</ul>
				<button
					className='menuToggle'
					onClick={() => setToggleMenu(!ToggleMenu)}
				>
					menu
				</button>
			</div>
		</header>
	);
}
