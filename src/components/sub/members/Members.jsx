import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDebounce } from '../../../hooks/useDebounce';
import { RiArrowRightLine,RiArrowDownLine,RiArrowUpLine } from "react-icons/ri";
import { BiSolidCheckCircle } from "react-icons/bi";

export default function Members() {
	const history = useHistory();
	const [Toggle, setToggle] = useState(false);
	const initVal = useRef({
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		comments: '',
		edu: '',
		gender: '',
		interest: [],
	});
	const [Val, setVal] = useState(initVal.current);
	//useDebouce 훅의 인수로 특정 state를 전달해서 debouncing이 적용된 새로운 state값 반환받음
	const DebouncedVal = useDebounce(Val);
	const [Errs, setErrs] = useState({});
	const [ActiveTr, setActiveTr] = useState(null);

	const handleReset = () => {
		setVal(initVal.current);
	};

	const handleChange = (e) => {
		setActiveTr(e.target.name);
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = (e) => {
		setActiveTr(e.target.name);
		const { name } = e.target;
		const inputs = e.target.parentElement.parentElement.querySelectorAll('input');
		const checkArr = [];
		inputs.forEach((input) => input.checked && checkArr.push(input.value));
		console.log('checkArr: ', checkArr);
		setVal({ ...Val, [name]: checkArr });
	};

	const check = (value) => {
		console.log('check');
		const errs = {};
		const num = /[0-9]/;
		const txt = /[a-zA-Z]/;
		const spc = /[!@#$%^&*()[\]_.+]/;
		const [m1, m2] = value.email.split('@');
		const m3 = m2 && m2.split('.');

		if (value.userid.length < 5)
			errs.userid = '아이디는 최소 5글자 이상 입력하세요';
		if (value.comments.length < 10)
			errs.comments = '남기는 말은 최소 10글자 이상 입력하세요';
		if (!value.gender) errs.gender = '성별을 선택하세요';
		if (value.interest.length === 0)
			errs.interest = '관심사를 하나이상 선택하세요.';
		if (!value.edu) errs.edu = '최종학력을 선택하세요.';
		if (value.pwd1 !== value.pwd2 || !value.pwd2)
			errs.pwd2 = '두개의 비밀번호를 같게 입력하세요.';
		if (!m1 || !m2 || !m3[0] || !m3[1])
			errs.email = '올바른 이메일 형식으로 입력하세요';
		if (
			!num.test(value.pwd1) ||
			!txt.test(value.pwd1) ||
			!spc.test(value.pwd1) ||
			value.pwd1.length < 5
		)
			errs.pwd1 =
				'비밀번호는 특수문자, 문자, 숫자를 모두포함해서 5글자 이상 입력하세요.';

		return errs;
	};

	const handleSubmit = (e) => {
		console.log(Object.keys(check(Val)));
		e.preventDefault();

		if (Object.keys(check(Val)).length === 0) {
			alert('회원가입을 축하합니다.');
			history.push('/welcome/1');
		}
	};

	//debounding이 적용된 state를 의존성배열에 등록해서
	//해당 값으로 check함수 호출
	useEffect(() => {
		setErrs(check(DebouncedVal));
	}, [DebouncedVal]);

	const unmounted = useRef(false); 
	useEffect(() => {
		const timeoutId = setTimeout(() => {
      if (!unmounted.current) {
        setToggle(true);
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
      unmounted.current = true;
    };
	},[])
	return (
		<Layout title={'Members'} className={'Members'}>
			<div className='membersWrap'>
				<div className={`top ${Toggle && 'on'}`}>
					{/* <ul>
						<li>Create.</li>
						<li>Finance.</li>
						<li onClick={()=> setToggle(!Toggle)}><RiArrowRightLine /></li>
					</ul>
					<ul>
						<li>Develop.</li>
						<li>Together.</li>
					</ul> */}
					<div className='topText'>
						<span>&#9679;</span>
						<p>Crowdfunding platform for influencers and entrepreneurs</p>
						<RiArrowRightLine/>
					</div>
					<div className='topText'>
						<RiArrowDownLine />
						<p>Support / Funding interview</p>
					</div>
					<div className='topText'>
						<span>&#38;</span>
						<p>Global impact</p>
						<RiArrowUpLine />
					</div>
				</div>
				{/* <div >
					<h2>Join Us Now</h2>
				</div> */}

				<div className='formBox'>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
										{/* userid, email */}
									<tr className={(ActiveTr === 'userid' ||ActiveTr === 'email') ? 'on' : ''}>
										<h3>USER ID
											<span className={(Val.userid && !Errs.userid && Val.email && !Errs.email) ? 'on' : ''}><BiSolidCheckCircle /></span>
										</h3>
										<td>
											<input
												type='text'
												name='userid'
												placeholder='User ID'
												value={Val.userid}
												onFocus={()=>setActiveTr('userid')}
												onBlur={()=>setActiveTr('')}
												onChange={handleChange}
											/>
											{Errs.userid && <p>{Errs.userid}</p>}
										</td>
										<td>
											<input
												type='text'
												name='email'
												placeholder='Email'
												value={Val.email}
												onFocus={()=>setActiveTr('email')}
												onBlur={()=>setActiveTr('')}
												onChange={handleChange}
											/>
											{Errs.email && <p>{Errs.email}</p>}
										</td>
									</tr>
									
									{/* pwd1, pwd2 */}
									<tr className={(ActiveTr === 'pwd1' ||ActiveTr === 'pwd2') ? 'on' : ''}>
										<h3>PASSWORD
											<span className={(Val.pwd1 && !Errs.pwd1 && Val.pwd2 && !Errs.pwd2) ? 'on' : ''}><BiSolidCheckCircle /></span>
										</h3>
										<td>
											<input
												type='password'
												name='pwd1'
												placeholder='Password'
												onFocus={()=>setActiveTr('pwd1')}
												onBlur={()=>setActiveTr('')}
												value={Val.pwd1}
												onChange={handleChange}
											/>
											{Errs.pwd1 && <p>{Errs.pwd1}</p>}
										</td>
										<td>
											<input
												type='password'
												name='pwd2'
												placeholder='Re-Password'
												onFocus={()=>setActiveTr('pwd1')}
												onBlur={()=>setActiveTr('')}
												value={Val.pwd2}
												onChange={handleChange}
											/>
											{Errs.pwd2 && <p>{Errs.pwd2}</p>}
										</td>
									</tr>

									{/* edu */}
									<tr className={ActiveTr === 'edu' ? 'on' : ''}>
										<h3>Education
											<span className={(Val.edu && !Errs.edu) ? 'on' : ''}><BiSolidCheckCircle /></span>
										</h3>
										<td colSpan='2'>
											<select name='edu' onChange={handleChange} onFocus={()=>setActiveTr('edu')} onBlur={()=>setActiveTr('')}>
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
											{Errs.edu && <p>{Errs.edu}</p>}
										</td>
									</tr>

									{/* gender */}
									<tr  className={ActiveTr === 'gender' ? 'on gender' : "gender"}>
										<h3>Gender
											<span className={(Val.gender && !Errs.gender) ? 'on' : ''}><BiSolidCheckCircle /></span>
										</h3>
										<td colSpan='2' >
											<label htmlFor='female' className={Val.gender === 'female'? 'on': ''}>
												<input
													type='radio'
													defaultValue='female'
													id='female'
													name='gender'
													onFocus={()=>setActiveTr('gender')}
													onBlur={()=>setActiveTr('')}
													onChange={handleChange}
												/> Female
											</label>
											<label htmlFor='male' className={Val.gender === 'male'? 'on': ''}>
												<input
													type='radio'
													defaultValue='male'
													id='male'
													name='gender'
													onFocus={()=>setActiveTr('gender')}
													onBlur={()=>setActiveTr('')}
													onChange={handleChange}
												/> Male
											</label>
											{Errs.gender && <p>{Errs.gender}</p>}
										</td>
									</tr>

									{/* interests */}
									<tr className={ActiveTr === 'interest' ? 'on interest' : 'interest'}>
										<h3>Interest
											<span className={(Val.interest && !Errs.interest) ? 'on' : ''}><BiSolidCheckCircle /></span>
										</h3>
										<td colSpan='2'>
											<label htmlFor='sports' className={Val.interest.includes('sports')? 'on': ''}>
												<input
													type='checkbox'
													name='interest'
													id='sports'
													defaultValue='sports'
													onFocus={()=>setActiveTr('interest')}
													onBlur={()=>setActiveTr('')}
													onChange={handleCheck}
												/> Sports
											</label>
											<label htmlFor='reading' className={Val.interest.includes('reading')? 'on': ''}>
												<input
												type='checkbox'
												name='interest'
												id='reading'
												defaultValue='reading'
												onFocus={()=>setActiveTr('interest')}
												onBlur={()=>setActiveTr('')}
												onChange={handleCheck}
												/>Reading
											</label>
											<label htmlFor='music' className={Val.interest.includes('music')? 'on': ''}>
												<input
													type='checkbox'
													name='interest'
													id='music'
													defaultValue='music'
													onFocus={()=>setActiveTr('interest')}
													onBlur={()=>setActiveTr('')}
													onChange={handleCheck}
												/>	Music
											</label>
											<label htmlFor='game' className={Val.interest.includes('game')? 'on': ''}>
												<input
													type='checkbox'
													name='interest'
													id='game'
													defaultValue='game'
													onFocus={()=>setActiveTr('interest')}
													onBlur={()=>setActiveTr('')}
													onChange={handleCheck}
												/>Game
											</label>
											{Errs.interest && <p>{Errs.interest}</p>}
										</td>
									</tr>

									{/* comments  */}
									<tr className={ActiveTr === 'comments' ? 'on' : ''}>
										<h3>Comments
											<span className={(Val.comments && !Errs.comments) ? 'on' : ''}><BiSolidCheckCircle /></span>
										</h3>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'
												onFocus={()=>setActiveTr('comments')}
												onBlur={()=>setActiveTr('')}
												value={Val.comments}
												onChange={handleChange}
											></textarea>
											{Errs.comments && <p>{Errs.comments}</p>}
										</td>
									</tr>

									{/* button set */}
									<tr>
										<td colSpan='2'>
											<input
												type='reset'
												value='CANCEL'
												onFocus={()=>setActiveTr('')}
												onClick={handleReset}
											/>
											<input type='submit' value='SUBMIT' />
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}

/*
	throttle vs debounce
	throttle : 물리적으로 핸들러함수 호출자체를 일정횟수로 줄임
	debounce : 특정 이벤트가 단시간에 반복으로 계속 발생하고 있으면 핸들러함수 호출 자체를 계속 뒤로 밀면서 호출 막음

	리액트에서의 폼 인증 구현 로직 순서
	1. 폼요소에 입력하는 값을 이벤트 핸들러 함수를 통해 실시간으로 state에 저장
	2. state값이 변경될때마다 check 함수를 통해 항목별로 인증 실패시 에러 객체로 묶어서 반환
	3. 폼에 submitHandler 함수를 연결
	4. 전송이벤트가 발생시 submitHandler함수 안쪽에서 check함수를 호출해서 err객체가 있으면 인증 실패
	5. check함수가 내보내는 err객체가 없으면 인증 성공처리
*/
