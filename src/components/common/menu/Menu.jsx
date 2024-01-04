import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Menu.scss';
import { motion } from 'framer-motion';
import { RiArrowRightDownLine, RiArrowRightUpLine } from 'react-icons/ri';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { useCallback, useEffect } from 'react';
import { useMenuQuery } from '../../../hooks/useMenuQuery';

export default function Menu() {
	const { Mode, setMode } = useGlobalData();
	const { MenuOpen, setMenuOpen } = useGlobalData();
	const { data: MenuData, isSuccess } = useMenuQuery();

	const closeMenu = useCallback(() => {
		window.innerWidth >= 1100 && setMenuOpen(false);
	}, [setMenuOpen]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);
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
			{MenuOpen && (
				<div className='Menu'>
					<div className='modal' onClick={() => setMenuOpen(false)}></div>
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
									onClick={() => setMenuOpen(false)}
								></button>
								<div className='topBottom'>
									<div>
										Sort by
										<RiArrowRightDownLine />
									</div>
									<div
										className={`themeBox ${
											Mode === 'LIGHT' ? 'LIGHT' : 'DARK'
										}`}
										onClick={() => setMode(Mode === 'LIGHT' ? 'DARK' : 'LIGHT')}
									>
										<div className='ball'>
											{Mode === 'LIGHT' ? 'LIGHT' : 'DARK'}
										</div>
									</div>
								</div>
							</div>
							<div className='bottom'>
								<ul>
									{isSuccess &&
										MenuData?.map((menu, index) => {
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
			)}
		</motion.div>
	);
}
