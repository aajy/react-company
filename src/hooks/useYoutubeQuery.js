import { useQuery } from '@tanstack/react-query';

//channelId
const fetchYoutubeChannelId = async ({ queryKey: [_,vidId] }) => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const baseURL = `https://www.googleapis.com/youtube/v3/videos?key=${api_key}&part=snippet&id=${vidId}`;
	try {
		const response = await fetch(baseURL);
		const data = await response.json();
		return data.items[0].snippet;
	} catch (err) {
		throw err;
	}
};

export const useYoutubeChannelIdQuery = vidId => {
	return useQuery(['fetchYoutubeChannelId', vidId], fetchYoutubeChannelId, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
//channelId
const fetchYoutubeChannelData = async ({ queryKey: [_,channelId] }) => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
  const baseURL = `https://www.googleapis.com/youtube/v3/channels?key=${api_key}&part=statistics&id=${channelId}&fields=items/statistics`;
	try {
		const response = await fetch(baseURL);
		const data = await response.json();
		return data.items[0].statistics;
	} catch (err) {
		throw err;
	}
};

export const useYoutubeChannelDataQuery = channelId => {
	return useQuery(['fetchYoutubeChannelData', channelId], fetchYoutubeChannelData, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};

//playlist
const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pid = process.env.REACT_APP_YOUTUBE_LIST;
	const num = 10;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	try {
		const response = await fetch(baseURL);
		const data = await response.json();
		return data.items;
	} catch (err) {
		throw err;
	}
};

export const useYoutubeQuery = () => {
	return useQuery(['fetchYoutube'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};

//detail
const fetchYoutubeById = async ({ queryKey }) => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${queryKey[1]}`;

	const data = await fetch(baseURL);
	const json = await data.json();
	return json.items[0].snippet;
};

export const useYoutubeQueryById = id => {
	return useQuery(['fetchYoutubeById', id], fetchYoutubeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
