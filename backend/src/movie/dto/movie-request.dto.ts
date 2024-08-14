import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Duration } from '../movie.model';

export class MovieRequestDto {
    @IsString()
    readonly genre: string;

    @IsEnum(Duration)
    readonly duration: Duration;

    @IsString()
    readonly actor: string;

    @IsOptional()
    @IsString()
    readonly language?: string;
}

