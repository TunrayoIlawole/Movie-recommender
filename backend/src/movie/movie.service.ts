import { Injectable } from '@nestjs/common';
import { PiecesService } from 'src/pieces/pieces.service';
import { MovieRequestDto } from './dto/movie-request.dto';
import { Movie } from './movie.model';

interface MovieData {
    movies: Movie[];
}

@Injectable()
export class MovieService {
    constructor(private readonly piecesService: PiecesService) {}

    async getMovieRecommendations(movieRequestDto: MovieRequestDto): Promise<Movie[]> {
        try {
            const response = await this.piecesService.sendMovieRequest(movieRequestDto);

            const moviesData: MovieData = JSON.parse(response);

            if (Array.isArray(moviesData.movies)) {
                return moviesData.movies.map((movieData) => new Movie(movieData));
            } else {
                throw new Error("Error: Unexpected movie response format");
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error fetching movie recommendations: ${error}`)
            throw new Error(`Error: ${errorCode} - ${errorMessage}`);
        }
    }

    private cleanMoviesResponse(response: string): string {
        return response.replace(/```json|```/g, "").trim();
    }
}
