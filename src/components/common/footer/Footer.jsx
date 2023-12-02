import './Footer.scss';

export default function Footer() {
	return (
		<footer className='Footer'>
			<div className='left'>
				<div>
					<h3>Website map</h3>
					<ul>
						<li>Products</li>
						<li>Resources</li>
						<li>Support</li>
						<li>Company</li>
					</ul>
				</div>
				<div>
					<h3>Newsletter our</h3>
					<div>
						<input type='text' />
						<button>GO</button>
					</div>
				</div>
			</div>
			<div className='center'>
				<p>
					Database powerful AI expert
					<br />
					on processing marketing data
				</p>
				<h3>LOGO</h3>
				<p>Level up your cases with tons of data</p>
			</div>
			<div className='right'>
				<h3>Contacts</h3>
				<ul>
					<li>UK: +12 003 345 6789</li>
					<li>react-portfolio-eosin-sigma.vercel.app</li>
					<li>aajy.000@gmail.com</li>
					<li>Seoul Korea</li>
				</ul>
				<ul>
					<li>icon</li>
					<li>icon</li>
					<li>icon</li>
					<li>icon</li>
					<li>icon</li>
				</ul>
				<p>
					<span>small logo</span>2023 halo lab
					<br />
					All rights reserved
				</p>
			</div>
		</footer>
	);
}
