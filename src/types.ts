export type Movie = {
    title: string;
    year: string;
    runtime: string;
    genres: string[];
    score: string;
    poster: string;
    languages: string[];
    hidden?: boolean;
}

export type MovieData = {
    title: string;
    year: string;
    runtime: string;
    genre: string[];
    ratings: Rating[];
    poster: string;
    language: string;
}

export type Rating = {
    source: string;
    value: string;
}
