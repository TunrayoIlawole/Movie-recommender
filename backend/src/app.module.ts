import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieService } from './movie/movie.service';
import { MovieController } from './movie/movie.controller';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MovieModule]
})
export class AppModule {}
