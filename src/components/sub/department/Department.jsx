import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	return (
		<Layout title={'Department-introduction'} className={'Department'}>
			<article className='department-top'>
				<ul>
					<li>img1</li>
					<li>img2</li>
					<li>
						<h3>SAGE</h3>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, quidem. Laudantium, autem?</p>
						<button>More</button>
					</li>
				</ul>
				<ul>
					<li>img1</li>
					<li>img2</li>
					<li>
						<h3>SAGE</h3>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, quidem. Laudantium, autem?</p>
						<button>More</button>
					</li>
				</ul>
				<div>
					<h3>CLIENTS</h3>
					<ul>
						<li>
							<div>
								<span>span</span>
								text
							</div>
							<span>span</span>
						</li>
						<li>
							<div>
								<span>span</span>
								text
							</div>
							<span>span</span>
						</li>
						<li>
							<div>
								<span>span</span>
								text
							</div>
							<span>span</span>
						</li>
						<li>
							<div>
								<span>span</span>
								text
							</div>
							<span>span</span>
						</li>
						<li>
							<div>
								<span>span</span>
								text
							</div>
							<span>span</span>
						</li>
						<li>
							<div>
								<span>span</span>
								text
							</div>
							<span>span</span>
						</li>
						<li>
							<div>
								<span>span</span>
								text
							</div>
							<span>span</span>
						</li>
					</ul>
				</div>
			</article>
			<article className='department-bottom'>
				<div>
					<h2>TEAM</h2>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad amet quas voluptate ea vero minima atque asperiores sapiente tempore iusto?</p>
				</div>
				<ul>
					<li>
						<p>name</p>
						<span>role</span>
						<img src="" alt="" />
					</li>
					<li>
						<p>name</p>
						<span>role</span>
						<img src="" alt="" />
					</li>
					<li>
					<p>name</p>
						<span>role</span>
						<img src="" alt="" />
					</li>
					<li>
					<p>name</p>
						<span>role</span>
						<img src="" alt="" />
					</li>
				</ul>

				<h3>Supported by</h3>
				<ul>
					<li>
						<p>name</p>
						<span>role</span>
						<img src="" alt="" />
					</li>
					<li>
						<p>name</p>
						<span>role</span>
						<img src="" alt="" />
					</li>
					<li>
					<p>name</p>
						<span>role</span>
						<img src="" alt="" />
					</li>
					<li>
					<p>name</p>
						<span>role</span>
						<img src="" alt="" />
					</li>
				</ul>
			</article>
		</Layout>
	);
}
