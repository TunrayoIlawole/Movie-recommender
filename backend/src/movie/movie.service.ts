import { Injectable, Logger } from '@nestjs/common';
import { PiecesService } from 'src/pieces/pieces.service';
import { MovieRequestDto } from './dto/movie-request.dto';
import { Movie } from './movie.model';

interface MovieData {
    movies: Movie[];
}

@Injectable()
export class MovieService {

    private readonly logger = new Logger(MovieService.name);
    
    constructor(private readonly piecesService: PiecesService) {}

    async getMovieRecommendations(movieRequestDto: MovieRequestDto): Promise<Movie[]> {
        try {
            const response = await this.piecesService.sendMovieRequest(movieRequestDto);

            this.logger.log("Request to PiecesService succeeded");

            const moviesData: MovieData = JSON.parse(this.cleanMoviesResponse(response));

            if (Array.isArray(moviesData.movies)) {
                return moviesData.movies.map((movieData) => new Movie(movieData));
            } else {
                throw new Error("Error: Unexpected movie response format");
            }
        } catch (error) {
            this.logger.error("Error fetching movie recommendations", error.stack);
            throw new Error("Failed to get movie recommendations");
        }
    }

    private cleanMoviesResponse(response: string): string {
        return response.replace(/```json|```/g, "").trim();
    }
}
