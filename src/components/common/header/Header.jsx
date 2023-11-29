import { useState } from 'react';
import './Header.scss';

export default function Header() {
	const [Global, setGlobal] = useState('GLOBAL IN');
	const [IsGlobalDropBoxOpen, setIsGlobalDropBoxOpen] = useState(false);
	const globalList = [
		'GLOBAL IN',
		'Africa',
		'Asia Pacific',
		'Europe',
		'Latin America',
	];
	const handleBlurGlobalContainer = () => {
		setTimeout(() => {
			setIsGlobalDropBoxOpen(!IsGlobalDropBoxOpen);
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
		<div className='Header'>
			<div className='top'>
				<h1>Abbvie</h1>
				<div className='dropBox'>
					<div
						className='container'
						onBlur={(e) => handleBlurGlobalContainer(e)}
					>
						<label onClick={() => handleGlobalOpen()}>
							<button className='dropdown-button'>{Global}</button>
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
				<ul>
					<li>INVESTORS</li>
					<li>NEWSCENTER</li>
					<li>PATIENT ASSISTANCE</li>
				</ul>
				<ul>
					<li>Department</li>
					<li>Youtube</li>
					<li>Gallery</li>
					<li>Community</li>
					<li>Contact</li>
					<li>search</li>
				</ul>
			</div>
		</div>
	);
}
