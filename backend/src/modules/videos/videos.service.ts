import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {firstValueFrom} from "rxjs";
import { HttpService } from '@nestjs/axios';
import {SearchHistoryService} from "../search-history/search-history.service";
import {SearchVideosResponse, VideoDetailsResponse} from "../../common/interfaces/videos.interfaces";

@Injectable()
export class VideosService {
	private readonly apiKey: string;
	private readonly url: string
	constructor(
		private readonly httpService: HttpService,
		private readonly searchHistoryService: SearchHistoryService
	) {
		this.apiKey = process.env.YOUTUBE_API_KEY
		this.url = 'https://www.googleapis.com/youtube/v3'
	}

	async searchVideos(query: string, pageToken: string, maxResults: number): Promise<SearchVideosResponse> {
		try {
			await this.searchHistoryService.addSearchQuery(query);
			const url = `${this.url}/search?part=snippet&q=${query}&pageToken=${pageToken}&maxResults=${maxResults}&key=${this.apiKey}`;
			const response = await firstValueFrom(this.httpService.get(url));

			return {
				results: response.data.items.map(item => ({
					videoId: item.id.videoId,
					title: item.snippet.title,
					description: item.snippet.description,
					thumbnailUrl: item.snippet.thumbnails.default.url,
					publishedAt: item.snippet.publishedAt,
				})),
				totalResults: response.data.pageInfo.totalResults,
				nextPageToken: response.data.nextPageToken || null,
				prevPageToken: response.data.prevPageToken || null,
			};
		} catch (e: unknown) {
			 throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getVideoDetails(videoId: string): Promise<VideoDetailsResponse> {
		const url = `${this.url}/videos?part=snippet,statistics&id=${videoId}&key=${this.apiKey}`;

		try {
			const response = await firstValueFrom(this.httpService.get(url));

			const videoData = response.data.items[0];
			if (!videoData) {
				throw new Error('Video not found');
			}

			return {
				videoId: videoData.id,
				title: videoData.snippet.title,
				description: videoData.snippet.description,
				thumbnailUrl: videoData.snippet.thumbnails.high.url,
				publishedAt: videoData.snippet.publishedAt,
				viewCount: videoData.statistics.viewCount,
				likeCount: videoData.statistics.likeCount,
				commentCount: videoData.statistics.commentCount,
			};
		} catch (e: unknown) {
			throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
