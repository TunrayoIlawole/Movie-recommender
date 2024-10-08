export class Movie {
     title: string;
     year: string;
     duration: Duration;
     actors: string;
     language: string;
     genre: string;
     cover: string;

     constructor(data: any) {
        this.title = data.title;
        this.year = data.year;
        this.duration = data.duration;
        this.actors = data.actors;
        this.language = data.language;
        this.genre = data.genre;
        this.cover = data.cover 
     }

    static fromJson(json: string): Movie {
        const data = JSON.parse(json);
        return new Movie(data);
    }
}

export enum Duration {
    SHORT = 'about one hour thirty minutes',
    MEDIUM = 'less than two hours',
    LONG = 'more than two hours'
}