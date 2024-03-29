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

export function useCustomText(type) {
	const toUpperText = (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};
	if (type === 'title') {
		return (txt) => {
			return txt.charAt(0).toUpperCase() + txt.slice(1);
		};
	}
	if (type === 'shorten') {
		return (txt, len, string ='...') => {
			if (txt.length > len) {
				return txt.slice(0, len) + string;
			} else {
				return txt;
			}
		};
	}
	if (type === 'combined') {
		return (txt, spc = ' ') => {
			if (!txt || !txt.length) return;
			let resultText = txt
				.split(/-|_|\+/)
				.map((data) => toUpperText(data))
				.join(spc);
			return resultText;
		};
	}
	if (type === 'dateTime') {
		return (txt, spc = ' ') => {
			let [date, time] = txt.split('T');
			time = time.slice(0,8);
			
			return [date, time];
		};
	}
}
