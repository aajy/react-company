import './Modal.scss';

export default function Modal({ children, Open, setOpen }) {
	return (
		<aside className='Modal'>
			<div className='con'>{children}</div>
			{/* <span onClick={() => setOpen(false)}>close</span> */}
		</aside>
	);
}
