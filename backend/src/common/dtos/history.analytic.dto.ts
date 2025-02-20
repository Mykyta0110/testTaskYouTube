import { ApiProperty } from '@nestjs/swagger';

export class HistoryAnalyticDto {
	@ApiProperty({
		description: 'The search query.',
		type: String,
	})
	query: string;

	@ApiProperty({
		description: 'The number of times the query has been searched.',
		type: Number,
	})
	count: number;
}