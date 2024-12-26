import { ApiProperty } from '@nestjs/swagger';

export class SearchVideosResponseDto {
	@ApiProperty({
		description: 'The list of video results.',
		type: [Object], // We will define an object type with more details below
	})
	results: Array<{
		videoId: string;
		title: string;
		description: string;
		thumbnailUrl: string;
		publishedAt: string;
	}>;

	@ApiProperty({
		description: 'Total number of results available.',
		type: Number,
	})
	totalResults: number;

	@ApiProperty({
		description: 'Next page token for pagination.',
		type: String,
		required: false,
	})
	nextPageToken: string | null;

	@ApiProperty({
		description: 'Previous page token for pagination.',
		type: String,
		required: false,
	})
	prevPageToken: string | null;
}
