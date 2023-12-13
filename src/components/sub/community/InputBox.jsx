import { useCallback, useRef } from 'react';
import './InputBox.scss';
import { GrPowerReset } from 'react-icons/gr';

export default function InputBox() {
	const refTit = useRef(null);
	const refCon = useRef(null);
	const inputRef = useRef(null);
	const refNickname = useRef(null);

	const onUploadImage = useCallback((e) => {
		if (!e.target.files) {
			return;
		}
		console.log(e.target.files[0].name);
	}, []);
	const resetPost = (e) => {
		e.preventDefault();
	};
	return (
		<div className='InputBox'>
			<input type='text' placeholder='title' ref={refTit} />
			<textarea
				cols='30'
				rows='3'
				placeholder='content'
				ref={refCon}
			></textarea>
			<input type='text' placeholder='nickname' ref={refNickname} />
			<input
				type='file'
				accept='image/jpg,image/jpeg,image/png,image/svg,image/gif'
				ref={inputRef}
				onChange={onUploadImage}
			></input>
			<nav>
				<button onClick={resetPost}>
					<GrPowerReset />
				</button>
			</nav>
		</div>
	);
}
