import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Menu.scss';
import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiArrowRightDownLine, RiArrowRightUpLine } from 'react-icons/ri';
// import { useDispatch, useSelector } from 'react-redux';
// import * as types from '../../../redux/action';

export default function Menu() {
	// const dispatch = useDispatch();
	// const MenuData = useSelector((store) => store.menuTextReducer.menuText);
	const MenuData = [];
	// const Toggle = useSelector((store) => store.menuReducer.menu);
	// const Dark = useSelector((store) => store.darkReducer.dark);

	// const closeMenu = useCallback(() => {
	// 	window.innerWidth >= 1100 &&
	// 		dispatch({ type: types.MENU.start, payload: false });
	// }, [dispatch]);

	// useEffect(() => {
	// 	window.addEventListener('resize', closeMenu);
	// 	return () => window.removeEventListener('resize', closeMenu);
	// }, [closeMenu]);
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
			{/* {Toggle && ( */}
			{false && (
				<div className='Menu'>
					<div
						className='modal'
						// onClick={() => dispatch({ type: types.MENU.start, payload: false })}
					></div>
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
									// onClick={() =>
									// 	dispatch({ type: types.MENU.start, payload: false })
									// }
								></button>
								<div className='topBottom'>
									<div>
										Sort by
										<RiArrowRightDownLine />
									</div>
									<div
									// className={`themeBox ${Dark && 'dark'}`}
									// onClick={() =>
									// 	dispatch({ type: types.DARK.start, payload: !Dark })
									// }
									>
										{/* <div className='ball'>{Dark ? 'DARK' : 'LIGHT'}</div> */}
									</div>
								</div>
							</div>
							<div className='bottom'>
								<ul>
									{MenuData?.map((menu, index) => {
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
