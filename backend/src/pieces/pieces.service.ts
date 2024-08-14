import { Injectable, Logger } from '@nestjs/common';
import { PiecesClient } from 'pieces-copilot-sdk';
import { MovieRequestDto } from 'src/movie/dto/movie-request.dto';
import { Duration } from 'src/movie/movie.model';


@Injectable()
export class PiecesService {
    private readonly logger = new Logger(PiecesService.name);
    
    private piecesClient: PiecesClient;

    constructor() {
        this.piecesClient = new PiecesClient({
            baseUrl: 'http://localhost:1000'
        });
    }

    async sendMovieRequest(movieRequestDto: MovieRequestDto): Promise<string> {
        const movieRequestString = this.createMovieRequestString(movieRequestDto);

        try {
            return await this.piecesClient.askQuestion({
                question: movieRequestString
            });
        } catch(error) {
            this.logger.error("Error communication with the Pieces API", error.stack);
            throw new Error("Failed to send movie request to pieces");
        }

    }

    private createMovieRequestString(movieRequestDto: MovieRequestDto): string {
        const language = movieRequestDto.language ? movieRequestDto.language : "";

        const durationString = this.getDurationString(movieRequestDto.duration);

        return `Please suggest ${language} movies of ${movieRequestDto.genre} genre and duration of ${durationString} starring ${movieRequestDto.actor} with their titles, year, duration, actors, language, genre and movie covers in JSON format`
    }

    private getDurationString(duration: string): string {
        const durationMap: Record<string, string> = {
            SHORT: Duration.SHORT,
            MEDIUM: Duration.MEDIUM,
            LONG: Duration.LONG
        }

        return durationMap[duration] || 'any length';

    }
}
