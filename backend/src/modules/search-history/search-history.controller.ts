import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import {SearchHistoryService} from "./search-history.service";
import {SearchHistoryInterface} from "../../common/interfaces/search.history.interface";
import {HistoryAnalyticInterface} from "../../common/interfaces/history.analytic.interface";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {SearchHistoryDto} from "../../common/dtos/search.history.dto";
import {HistoryAnalyticDto} from "../../common/dtos/history.analytic.dto";

@Controller('history')
export class SearchHistoryController {
	constructor(private readonly searchHistoryService: SearchHistoryService) {
	}

	@ApiOperation({summary: 'Get recent search queries'})
	@ApiResponse({
		status: 200,
		description: 'List of recent search queries with timestamps',
		type: [SearchHistoryDto],
	})
	@Get()
	async getRecentSearchQueries(): Promise<{ history: SearchHistoryInterface[] }> {
		try {
			const history = await this.searchHistoryService.getSearchHistory();
			return history
		} catch (e: unknown) {
			throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@ApiOperation({summary: 'Get popular search queries with count'})
	@ApiResponse({
		status: 200,
		description: 'List of popular search queries with their count',
		type: [HistoryAnalyticDto],
	})
	@Get('/analytics')
	async getPopularSearchQueries(): Promise<{ analytics: HistoryAnalyticInterface[] }> {
		try {
			const analytics = await this.searchHistoryService.getPopularSearchQueries();
			return {
				analytics,
			};
		} catch (e: unknown) {
			throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
