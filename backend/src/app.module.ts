import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {SearchHistory} from "./entities";
import { VideosModule } from './modules/videos/videos.module';
import { SearchHistoryModule } from './modules/search-history/search-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [SearchHistory],
      synchronize: true,
    }),
    VideosModule,
    SearchHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
