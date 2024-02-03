import { Link } from 'react-router-dom';
import './Info.scss';
import { useRef } from 'react';
import { PiChartDonut, PiUserFocus } from "react-icons/pi";
import { IoTodayOutline } from "react-icons/io5";
import { TbChartDots } from "react-icons/tb";
import { useSelector } from 'react-redux';


export default function Info(){
  const path = useRef(process.env.PUBLIC_URL);
  const MemberData = useSelector((store) => {
		return store.memberReducer.members;
	});
  return(
    <div className='Info'>
      <h2>Next Tech: Your<br />Virtual Assistant of Choice
      </h2>
      <ul>
        <li><span>$2.7M</span><em>Activities Worth</em></li>
        <li><span>54%</span><em>Productivity Increase</em></li>
        <li><span>69%</span><em>Of improved Accuracy</em></li>
        <li><span>25%</span><em>Cost Savings</em></li>
        <li><span>78%</span><em>Reduced Response Time</em></li>
        <li><span>23/7</span><em>Availavilty</em></li>
      </ul>
      <div className="img">
        <img src={`${path.current}/img/info.jpg`} alt="" />
        <div className="icons">
          <span><PiChartDonut  /></span>
          <span><IoTodayOutline/></span>
          <span><TbChartDots/></span>
        </div>
        {MemberData.departmentMember && MemberData.departmentSupport && <div className="members">
          <div className='client'>
            <div>
              <h3>34k<p>Client <br/> Since 2018 </p></h3>
            </div>
            <ul>
              <li><img src={`${path.current}/img/${MemberData.departmentMember[0].pic}`} alt=""/></li>
              <li><img src={`${path.current}/img/${MemberData.departmentMember[1].pic}`} alt=""/></li>
              <li><img src={`${path.current}/img/${MemberData.departmentMember[2].pic}`} alt=""/></li>
            </ul>
          </div>
          <div className='member'>
            <h3>{MemberData.departmentSupport[0].name}</h3>
            <p>{MemberData.departmentSupport[0].position}</p>
            <div className="profile">
              <img src={`${path.current}/img/${MemberData.departmentSupport[0].pic}`} alt="" />
            </div>
            <div className='nav'>
              <Link to='/department'>Detail more</Link>
              <span className="mode"><PiUserFocus /></span>
            </div>
            {/* 클릭 시 사람 랜덤으로 바뀜 */}
          </div>
        </div>}
      </div>
    </div>
  );
}