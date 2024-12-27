interface VideoSnippet {
	title: string;
	description: string;
	publishedAt: string;
	thumbnails: {
		default: { url: string };
		high: { url: string };
	};
}

interface VideoStatistics {
	viewCount: string;
	likeCount: string;
	commentCount: string;
}

interface VideoItem {
	id: {
		videoId: string;
	};
	snippet: VideoSnippet;
}

export interface SearchVideosResponse {
	results: {
		videoId: string;
		title: string;
		description: string;
		thumbnailUrl: string;
		publishedAt: string;
	}[];
	totalResults: number;
	nextPageToken: string | null;
	prevPageToken: string | null;
}

export interface VideoDetailsResponse {
	videoId: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	publishedAt: string;
	viewCount: string;
	likeCount: string;
	commentCount: string;
}
