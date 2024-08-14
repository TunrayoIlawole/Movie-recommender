import { IsEnum, IsString } from "class-validator";
import { Duration } from "../movie.model";

export class MovieResponsetDto {
    @IsString()
    readonly id: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly year: string;

    @IsEnum(Duration)
    readonly duration: Duration;

    @IsString()
    readonly actors: string;

    @IsString()
    readonly language: string;
    
    @IsString()
    readonly genre: string;

    @IsString()
    readonly cover: string;

}
