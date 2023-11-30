import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	return (
		<Layout title={'Department-introduction'} className={'Department'}>
			<article className='department-top'></article>
			<article className='department-bottom'></article>
		</Layout>
	);
}
