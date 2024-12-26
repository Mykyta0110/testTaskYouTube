import { Injectable } from '@nestjs/common';
import {SearchHistory} from "../entities";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {HistoryAnalysticInterface} from "../common/interfaces/history.analystic.interface";

@Injectable()
export class SearchHistoryService {
	constructor(
		@InjectRepository(SearchHistory)
		private readonly searchHistoryRepository: Repository<SearchHistory>,
	) {}

	async addSearchQuery(query: string): Promise<SearchHistory> {
		const newSearch = this.searchHistoryRepository.create({
			query,
		});
		return await this.searchHistoryRepository.save(newSearch);
	}

	async getSearchHistory(): Promise<SearchHistory[]> {
		return await this.searchHistoryRepository.find({
			order: { timestamp: 'DESC' }
		});
	}

	async getPopularSearchQueries(): Promise<HistoryAnalysticInterface[]> {
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
	}
}
