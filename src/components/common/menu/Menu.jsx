import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Menu.scss';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RiArrowRightDownLine, RiArrowRightUpLine } from 'react-icons/ri';

export default function Menu({ setDark, isDark, setToggleMenu }) {
	const path = useRef(process.env.PUBLIC_URL);
	const [MenuData, setMenuData] = useState([]);
	const closeMenu = () => {
		window.innerWidth >= 1000 && setToggleMenu(false);
	};
	const fetchMenu = async () => {
		try {
			const data = await fetch(`${path.current}/DB/menuText.json`);
			const json = await data.json();
			setMenuData(json.menuTextArr);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchMenu();
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.3 } }}
			exit={{
				opacity: 0,
				transition: { delay: 0.2, duration: 0.1 },
				transitionProperty: 'opacity',
			}}
		>
			<div className='Menu'>
				<div className='modal' onClick={() => setToggleMenu(false)}></div>
				<motion.div
					initial={{ x: -100 }}
					animate={{ x: 0, transition: { duration: 0.2, ease: 'linear' } }}
					exit={{
						opacity: 0,
						transition: { delay: 0.3, duration: 0.1 },
						transitionProperty: 'opacity x',
					}}
				>
					<div className='menuBox'>
						<div className='top'>
							<h2>abbive</h2>
							<button
								className='closeMenu'
								onClick={() => setToggleMenu(false)}
							></button>
							<div className='topBottom'>
								<div>
									Sort by
									<RiArrowRightDownLine />
								</div>
								<div
									className={`themeBox ${isDark && 'dark'}`}
									onClick={() => setDark(!isDark)}
								>
									<div className='ball'>{isDark ? 'DARK' : 'LIGHT'}</div>
								</div>
							</div>
						</div>
						<div className='bottom'>
							<ul>
								{MenuData.map((menu, index) => {
									return (
										<li key={menu.num + index}>
											<NavLink to={menu.link} activeClassName={'on'}>
												<span>{menu.num}</span>
												<div>
													<span>{menu.menu}</span>
													<p>{menu.description}</p>
												</div>
												<span>
													<RiArrowRightUpLine />
												</span>
											</NavLink>
										</li>
									);
								})}
							</ul>
							{/* TODO :: menu footer
              <div className='bottomBottom'>
                <p>
                  <span>small logo</span>2023 halo lab
                  <br />
                  All rights reserved
                </p>
              </div> */}
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}
