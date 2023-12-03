import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Menu.scss';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RiArrowRightDownLine } from "react-icons/ri";

export default function Menu({setDark, isDark,setToggleMenu}) {
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
			exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.1 },transitionProperty:"opacity" }}
		>
      <div className='Menu'>
        <div className='modal' onClick={()=>setToggleMenu(false)}></div>
        <motion.div
          initial={{ x: -100  }}
          animate={{ x: 0, transition:{ duration: 0.2, ease: "linear"}}}
          exit={{ opacity:0,transition: { delay: 0.3, duration: 0.1 },transitionProperty:"opacity x"}}
        >
          <div className='menuBox'>
            <div className='top'>
              <h2>abbive</h2>
              <button
              className='closeMenu'
              onClick={()=>setToggleMenu(false)}
              >
              </button>
              <div className='topBottom'>
                <div>Sort by<RiArrowRightDownLine /></div>
                <div
                  className={`themeBox ${isDark && 'dark'}`}
                  onClick={() => setDark(!isDark)}
                >
                  <div className='ball'>{isDark ? 'DARK' : 'LIGHT'}</div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <ul>
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
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>)
}
