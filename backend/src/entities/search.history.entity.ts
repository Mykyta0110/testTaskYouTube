import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity('search_history')
export class SearchHistory {
	@PrimaryGeneratedColumn()
	@ApiProperty({
		description: 'The unique identifier for the search history entry.',
		example: 1,
	})
	id: number;

	@Column()
	@ApiProperty({
		description: 'The search query that was entered.',
		example: 'NestJS tutorial',
	})
	query: string;

	@Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
	@ApiProperty({
		description: 'The timestamp of when the search was performed.',
		example: '2024-12-26T12:00:00Z',
	})
	timestamp: Date;
}
