import { Injectable } from '@nestjs/common';
import { PiecesClient } from 'pieces-copilot-sdk';
import { Observable } from 'rxjs';
import { MovieRequestDto } from 'src/movie/dto/movie-request.dto';
import { Duration } from 'src/movie/movie.model';


@Injectable()
export class PiecesService {
    private piecesClient: PiecesClient;
    private movieRequestString: string;

    constructor() {
        this.piecesClient = new PiecesClient({
            baseUrl: 'http://localhost:1000'
        });
    }

    async sendMovieRequest(movieRequestDto: MovieRequestDto): Promise<string> {
        this.movieRequestString = `Please suggest ${movieRequestDto.language === null ? "": movieRequestDto.language} movies of ${movieRequestDto.genre} genre and duration of ${this.getDurationString(movieRequestDto.duration)} starring ${movieRequestDto.actor} with their titles, year, duration, actors, language, genre and movie covers in JSON format`;
        console.log(this.movieRequestString);
        return this.piecesClient.askQuestion({
            question: this.movieRequestString
        });

    }

    getDurationString(duration: string): string {
        let durationValue = "";
        if (duration === "SHORT") {
            durationValue = Duration.SHORT;
        } else if (duration === "Medium") {
            durationValue = Duration.MEDIUM;
        } else {
            durationValue = Duration.LONG;
        }

        return durationValue;
    }
}
