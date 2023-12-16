import './Modal.scss';

export default function Modal({ children, Open, setOpen }) {
	return (
		<aside className='Modal'>
			<div className="bg" onClick={() => setOpen(false)}></div>
			<div className='con'>{children}</div>
			{/* <span onClick={() => setOpen(false)}>close</span> */}
		</aside>
	);
}
