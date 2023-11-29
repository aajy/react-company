import './Header.scss';

export default function Header() {
	return (
		<div className='Header'>
			<div className='top'>
				<h1>Abbvie</h1>
				<div className='dropBox'>
					<ul>
						<li>GLOBAL IN</li>
						<li>Africa</li>
						<li>Asia Pacific</li>
						<li>Europe</li>
						<li>Latin America</li>
					</ul>
				</div>
			</div>
			<div className='bottom'>
				<ul>
					<li>INVESTORS</li>
					<li>NEWSCENTER</li>
					<li>PATIENT ASSISTANCE</li>
				</ul>
				<ul>
					<li>Department</li>
					<li>Youtube</li>
					<li>Gallery</li>
					<li>Community</li>
					<li>Contact</li>
					<li>search</li>
				</ul>
			</div>
		</div>
	);
}
