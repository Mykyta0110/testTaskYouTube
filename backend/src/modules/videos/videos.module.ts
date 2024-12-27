import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import {HttpModule} from "@nestjs/axios";
import {SearchHistoryModule} from "../search-history/search-history.module";

@Module({
  imports: [HttpModule, SearchHistoryModule],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}
