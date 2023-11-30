import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	return (
		<Layout title='Department'>
			<div className='wrap'>
				<article className='department-top'></article>
				<article className='department-bottom'></article>
			</div>
		</Layout>
	);
}
