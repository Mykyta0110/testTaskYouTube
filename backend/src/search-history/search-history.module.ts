import { Module } from '@nestjs/common';
import { SearchHistoryController } from './search-history.controller';
import { SearchHistoryService } from './search-history.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SearchHistory} from "../entities";

@Module({
  imports: [TypeOrmModule.forFeature([SearchHistory])],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService],
  exports: [SearchHistoryService]
})
export class SearchHistoryModule {}
