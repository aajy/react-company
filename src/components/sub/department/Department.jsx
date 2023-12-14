import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { RiArrowRightUpLine, RiArrowLeftUpLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);
	const MemberData = useSelector(store => store.memberReducer.members)

	return (
		<Layout title={'Department-introduction'} className={'Department'}>
			<article className='department-top'>
				<ul>
					{MemberData && MemberData.departmentTop.map((data, idx) => {
						if (idx < 3) {
							if (idx === 2) {
								return (
									<li key={data.name + data.idx}>
										<div>
											<h3>{data.name}</h3>
											<p>{data.text}</p>
										</div>
										<span>
											<RiArrowLeftUpLine />
											here
										</span>
									</li>
								);
							} else {
								return (
									<li key={data.name + data.idx}>
										<img
											src={`${path.current}/img/${data.pic}`}
											alt={data.name}
										/>
									</li>
								);
							}
						}
					})}
				</ul>
				<ul style={{ flexDirection: 'row-reverse' }}>
					{MemberData && MemberData.departmentTop.map((data, idx) => {
						if (idx > 2) {
							if (idx === 5) {
								return (
									<li key={data.name + idx}>
										<div>
											<h3>{data.name}</h3>
											<p>{data.text}</p>
										</div>
										<span>
											here
											<RiArrowRightUpLine />
										</span>
									</li>
								);
							} else {
								return (
									<li key={data.name + idx}>
										<img
											src={`${path.current}/img/${data.pic}`}
											alt={data.name}
										/>
									</li>
								);
							}
						}
					})}
				</ul>
				<div>
					<h3>CLIENTS</h3>
					<ul>
						{MemberData && MemberData.departmentClients.map((data, idx) => {
							return (
								<li key={data + idx}>
									<div>
										<span>where</span>
										{data}
									</div>
									<span>official</span>
								</li>
							);
						})}
					</ul>
				</div>
			</article>
			<article className='department-bottom'>
				<h2>TEAM</h2>
				<ul>
					{MemberData && MemberData.departmentMember.map((data, idx) => {
						return (
							<li key={data.name + idx}>
								<div>
									<p>{data.name}</p>
									<span>{data.position}</span>
								</div>
								<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
							</li>
						);
					})}
				</ul>
				<h3>Supported by</h3>
				<ul>
					{MemberData && MemberData.departmentSupport.map((data, idx) => {
						return (
							<li key={data.name + idx}>
								<div>
									<p>{data.name}</p>
									<span>{data.position}</span>
								</div>
								<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
							</li>
						);
					})}
				</ul>
				<div className='text'>
					<p>
						We work closely with
						<br />
						brands to shape future
						<br />
						business through design.
					</p>
				</div>
			</article>
		</Layout>
	);
}
