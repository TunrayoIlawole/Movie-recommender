import { Injectable } from '@nestjs/common';
import { PiecesService } from 'src/pieces/pieces.service';
import { MovieRequestDto } from './dto/movie-request.dto';
import { Movie } from './movie.model';

@Injectable()
export class MovieService {
    constructor(private readonly piecesService: PiecesService) {}

    async getMovieRecommendations(movieRequestDto: MovieRequestDto): Promise<Movie[]> {
        try {
            const response = (await this.piecesService.postMovieRequest(movieRequestDto)).replace("```json", "").replace("```", "");

            const moviesData = JSON.parse(response);

            if (Array.isArray(moviesData.movies)) {
                return moviesData.movies.map((movieData: any) => new Movie(movieData));
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            console.log(error);
            throw new Error("Failed to get movie recommendations");
        }
    }
}
