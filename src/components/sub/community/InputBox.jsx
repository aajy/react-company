import { useRef } from 'react';
import './InputBox.scss';
import { GrPowerReset } from 'react-icons/gr';

export default function InputBox() {
	const refTit = useRef(null);
	const refCon = useRef(null);
	return (
		<div className='InputBox'>
			<div className='inputBox'>
				<input type='text' placeholder='title' ref={refTit} />
				<textarea
					cols='30'
					rows='3'
					placeholder='content'
					ref={refCon}
				></textarea>

				<nav>
					{/* <button onClick={resetPost}> */}
					<button>
						<GrPowerReset />
					</button>
				</nav>
			</div>
		</div>
	);
}
