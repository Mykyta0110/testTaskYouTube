import { ApiProperty } from '@nestjs/swagger';

export class SearchHistoryDto {
	@ApiProperty({
		description: 'The search query.',
		type: String,
	})
	query: string;

	@ApiProperty({
		description: 'Timestamp of the search.',
		type: String,
	})
	timestamp: string;
}