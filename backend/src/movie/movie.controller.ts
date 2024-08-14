import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieRequestDto } from './dto/movie-request.dto';
import { Movie } from './movie.model';
import { Response } from 'express';

@Controller('movies')
export class MovieController {

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
            // res.status(HttpStatus.OK).json(movies);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.code,
                message: "Failed to get movie recommendations"
            })
        }
        
    }
}
