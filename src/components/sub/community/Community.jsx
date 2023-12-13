import { useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import InputBox from './InputBox';

export default function Community() {
	const [Open, setOpen] = useState(true);

	return (
		<Layout className={'Community'}>
			<InputBox Open={Open} setOpen={setOpen} />
		</Layout>
	);
}
