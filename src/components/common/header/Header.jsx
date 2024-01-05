import { useEffect, useState } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { LuSearch, LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { useGlobalData } from '../../../hooks/useGlobalData';

export default function Header() {
	const { Mode, setMode } = useGlobalData();
	const { setMenuOpen } = useGlobalData();

	const [Global, setGlobal] = useState('');
	const [IsGlobalDropBoxOpen, setIsGlobalDropBoxOpen] = useState(false);

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
		e.preventDefault();
		const newGlobal = el;
		setGlobal(newGlobal);
		setIsGlobalDropBoxOpen(false);
	};
	return (
		<header className='Header'>
			<div className='top'>
				<h1>
					<Link to='/'>abbvie</Link>
				</h1>
				<h2>
					<Link to='/'>abbvie</Link>
				</h2>
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
						<NavLink to='/members' activeClassName={'on'}>
							Members
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName={'on'}>
							Contact
						</NavLink>
					</li>
				</ul>
				<div
					className={`themeBox ${Mode === 'LIGHT' ? 'LIGHT' : 'DARK'}`}
					onClick={() => setMode(Mode === 'LIGHT' ? 'DARK' : 'LIGHT')}
				>
					<div className='ball'>{Mode === 'LIGHT' ? 'LIGHT' : 'DARK'}</div>
				</div>
				<button
					className='menuToggle'
					onClick={() => {
						setMenuOpen(true);
					}}
				>
					menu
				</button>
			</div>
			<div className='bottom'>
				<ul className='scrollMenu'>
					<li>How to</li>
					<li>Careers</li>
					<li>Blog</li>
				</ul>
				<div className='buttons'>
					<span>
						<input type='text' placeholder='Try searching for...' />
						<button>
							<LuSearch />
						</button>
					</span>
					<div
					// className={`themeBox ${Dark && 'dark'}`}
					// onClick={() => dispatch({ type: types.DARK.start, payload: !Dark })}
					>
						<div className='ball'></div>
					</div>
					<button>Sign in</button>
					<button>Sign up</button>
				</div>
				<div className='dropBox'>
					<div
						className='container'
						onBlur={(e) => handleBlurGlobalContainer(e)}
					>
						<label className='dropdown-button'>
							<button onClick={() => handleGlobalOpen()}>
								{Global ? Global : `GLOBAL IN`}
								{IsGlobalDropBoxOpen ? <LuChevronUp /> : <LuChevronDown />}
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
		</header>
	);
}
