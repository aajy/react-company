import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Menu.scss';
import { useEffect} from 'react';
import { motion } from 'framer-motion';
import { RiArrowRightDownLine, RiArrowRightUpLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';

export default function Menu({ setDark, isDark, setToggleMenu }) {
	const MenuData = useSelector(store => store.menuReducer.menuTextArr)
	const closeMenu = () => {
		window.innerWidth >= 1000 && setToggleMenu(false);
	};
	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.3 } }}
			exit={{
				opacity: 0,
				transition: { delay: 0.2, duration: 0.3 },
				transitionProperty: 'opacity',
			}}
		>
			<div className='Menu'>
				<div className='modal' onClick={() => setToggleMenu(false)}></div>
				<motion.div
					initial={{ x: -100 }}
					animate={{ x: 0, transition: { duration: 0.2, ease: 'linear' } }}
					exit={{
						x: -10,
						opacity: 0,
						transition: { delay: 0.2, duration: 0.2 },
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
								{MenuData && MenuData.map((menu, index) => {
									return (
										<li key={menu.num + index}>
											<span>{menu.num}</span>
											<NavLink to={menu.link} activeClassName={'on'}>
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
