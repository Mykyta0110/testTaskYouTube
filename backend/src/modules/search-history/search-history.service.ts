import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {SearchHistory} from "../../entities";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {HistoryAnalyticInterface} from "../../common/interfaces/history.analytic.interface";
import {SearchHistoryInterface} from "../../common/interfaces/search.history.interface";

@Injectable()
export class SearchHistoryService {
	constructor(
		@InjectRepository(SearchHistory)
		private readonly searchHistoryRepository: Repository<SearchHistory>,
	) {}

	async addSearchQuery(query: string): Promise<SearchHistory> {
		try {
			const newSearch = this.searchHistoryRepository.create({
				query,
			});
			return await this.searchHistoryRepository.save(newSearch);
		} catch (e: unknown) {
			throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getSearchHistory(): Promise<{ history: SearchHistoryInterface[] }> {
		try {
			const history = await this.searchHistoryRepository.find({
				order: {timestamp: 'DESC'}
			});
			return {
				history: history.map(item => ({
					query: item.query,
					timestamp: item.timestamp.toISOString(),
				})),
			};
		} catch (e: unknown) {
			throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getPopularSearchQueries(): Promise<HistoryAnalyticInterface[]> {
		try {
			const result = await this.searchHistoryRepository
				.createQueryBuilder('search')
				.select('search.query')
				.addSelect('COUNT(search.query)', 'count')
				.groupBy('search.query')
				.orderBy('count', 'DESC')
				.getRawMany();

			return result.map(item => ({
				query: item.search_query,
				count: item.count,
			}));
		} catch (e: unknown) {
			throw new HttpException(`Server error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
