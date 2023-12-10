import './Modal.scss';

export default function Modal({ children, Open, setOpen }) {
	return (
		<aside className='Modal'>
			<div className='con'>{children}</div>
			{/* <span onClick={() => setOpen(false)}>close</span> */}
			<button
				className='closeMenu'
				onClick={() => setOpen(!Open)}
			></button>
		</aside>
	);
}
