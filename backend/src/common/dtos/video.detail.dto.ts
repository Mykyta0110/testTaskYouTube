import { ApiProperty } from '@nestjs/swagger';

export class VideoDetailsResponseDto {
	@ApiProperty({
		description: 'The unique ID of the video.',
		type: String,
	})
	videoId: string;

	@ApiProperty({
		description: 'The title of the video.',
		type: String,
	})
	title: string;

	@ApiProperty({
		description: 'The description of the video.',
		type: String,
	})
	description: string;

	@ApiProperty({
		description: 'The URL of the high-quality thumbnail for the video.',
		type: String,
	})
	thumbnailUrl: string;

	@ApiProperty({
		description: 'The publication date of the video.',
		type: String,
	})
	publishedAt: string;

	@ApiProperty({
		description: 'The number of views the video has.',
		type: String,
	})
	viewCount: string;

	@ApiProperty({
		description: 'The number of likes the video has.',
		type: String,
	})
	likeCount: string;

	@ApiProperty({
		description: 'The number of comments the video has.',
		type: String,
	})
	commentCount: string;
}
