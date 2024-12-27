import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('search_analytics')
export class SearchAnalytics {
	@PrimaryGeneratedColumn()
	@ApiProperty({
		description: 'The unique identifier for the search analytics entry.',
		example: 1,
	})
	id: number;

	@Column()
	@ApiProperty({
		description: 'The search query being tracked.',
		example: 'NestJS tutorial',
	})
	query: string;

	@Column()
	@ApiProperty({
		description: 'The number of times the query was searched.',
		example: 25,
	})
	count: number;
}
