import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PiecesService } from 'src/pieces/pieces.service';

@Module({
    controllers: [MovieController],
    providers: [MovieService, PiecesService]
})
export class MovieModule {}
