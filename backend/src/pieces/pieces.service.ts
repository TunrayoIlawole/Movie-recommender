import { Injectable } from '@nestjs/common';
import { PiecesClient } from 'pieces-copilot-sdk';
import { Observable } from 'rxjs';
import { MovieRequestDto } from 'src/movie/dto/movie-request.dto';


@Injectable()
export class PiecesService {
    private piecesClient: PiecesClient;
    private movieRequestString: string;

    constructor() {
        this.piecesClient = new PiecesClient({
            baseUrl: 'http://localhost:1000'
        });
    }

    async postMovieRequest(movieRequestDto: MovieRequestDto): Promise<string> {
        this.movieRequestString = `Please suggest ${movieRequestDto.language} movies of ${movieRequestDto.genre} and duration ${movieRequestDto.duration} starring ${movieRequestDto.actor} with their titles, year, duration, actors, language, genre and movie covers in JSON format`;
        return this.piecesClient.askQuestion({
            question: this.movieRequestString
        });

    }
}
