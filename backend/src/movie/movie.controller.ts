import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieRequestDto } from './dto/movie-request.dto';
import { Movie } from './movie.model';
import { Response } from 'express';

@Controller('movies')
export class MovieController {

    private readonly logger = new Logger(MovieController.name);

    constructor(private readonly movieService: MovieService) {}


    @Post("recommendations")
    async getMovieRecommendations(@Body() movieRequestDto: MovieRequestDto, @Res() res: Response) {
        try {
            const movies: Movie[] = await this.movieService.getMovieRecommendations(movieRequestDto);
            res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: "Movies returned successfully",
                data: movies
            });
        } catch (error) {
            this.logger.error("Failed to get movie recommendations", error.stack);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Failed to get movie recommendations"
            })
        }
        
    }
}
