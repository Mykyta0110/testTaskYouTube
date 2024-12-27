import {Controller, Get, HttpException, HttpStatus, Param, Query} from '@nestjs/common';
import {VideosService} from "./videos.service";
import {SearchVideosResponse, VideoDetailsResponse} from "../common/interfaces/videos.interfaces";
import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {SearchVideosResponseDto} from "../common/dtos/search.video.dto";
import {VideoDetailsResponseDto} from "../common/dtos/video.detail.dto";

@Controller('videos')
export class VideosController {
	constructor(private readonly searchService: VideosService) {}

	@ApiOperation({ summary: 'Search videos on YouTube' })
	@ApiQuery({
		name: 'query',
		type: String,
		description: 'Search query term (e.g., "NestJS tutorial")',
	})
	@ApiQuery({
		name: 'pageToken',
		type: String,
		description: 'Page token for pagination',
	})
	@ApiQuery({
		name: 'maxResults',
		type: Number,
		description: 'Maximum number of results to fetch',
		required: false,
		example: 10,
	})
	@ApiResponse({
		status: 200,
		description: 'Search results',
		type: SearchVideosResponseDto,
	})
	@Get('search')
	async searchVideos(
		@Query('q') query: string,
		@Query('pageToken') pageToken: string = '',
		@Query('maxResults') maxResults: number = 10,
	):Promise<SearchVideosResponse> {
		try {
			return this.searchService.searchVideos(query, pageToken, maxResults);
		} catch (e: unknown) {
			throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@ApiOperation({ summary: 'Get details of a specific YouTube video by videoId' })
	@ApiResponse({
		status: 200,
		description: 'Detailed video information',
		type: VideoDetailsResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: 'Video not found',
	})
	@Get(':id')
	async getVideoDetails(@Param('id') videoId: string):Promise<VideoDetailsResponse> {
		try {
			return this.searchService.getVideoDetails(videoId);
		} catch (e: unknown) {
			throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
