export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			tags += `
    <span style='display: inline-block; transition-duration:${speed}s; transition-delay:${
				interval * count
			}s'>${letter}</span>
  `;
			count++;
		}
		ref.innerHTML = tags;
	};
}
