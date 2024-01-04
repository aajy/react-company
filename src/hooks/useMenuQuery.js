import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;
const fetchMenu = async () => {
	const response = await fetch(`${path}/DB/menuText.json`);
	const data = await response.json();
	return data.menuText;
};

export const useMenuQuery = () => {
	return useQuery(['fetchMenu'], fetchMenu, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3, //데이터 요청 실패 시 재시도 횟수. default:3
	});
};
