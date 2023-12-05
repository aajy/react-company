import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { RiArrowRightUpLine, RiArrowLeftUpLine } from 'react-icons/ri';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);
	const [TopData, setTopData] = useState([]);
	const [ClientData, setClientData] = useState([]);
	const [MemberData, setMemberData] = useState([]);
	const [SupportData, setSupportData] = useState([]);

	const fetchData = async () => {
		try {
			const data = await fetch(`${path.current}/DB/department.json`);
			const json = await data.json();

			setTopData(json.departmentTop);
			setClientData(json.departmentClients);
			setMemberData(json.departmentMember);
			setSupportData(json.departmentSupport);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<Layout title={'Department-introduction'} className={'Department'}>
			<article className='department-top'>
				<ul>
					{TopData.map((data, idx) => {
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
					{TopData.map((data, idx) => {
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
						{ClientData.map((data, idx) => {
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
					{MemberData.map((data, idx) => {
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
					{SupportData.map((data, idx) => {
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
				<div>
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
