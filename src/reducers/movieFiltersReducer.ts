// Types
import type { Movie } from '../types';

export enum MovieFilterActionType {
    Title = 'title',
    Decade = 'decade',
    Genre = 'genre',
    Language = 'language',
}

type MovieFilterAction = {
    type: MovieFilterActionType;
    filter: string | string[];
    payload: Movie[];
}

const movieFiltersReducer = (movies: Movie[], action: MovieFilterAction): Movie[] => {
    switch (action.type) {
        case MovieFilterActionType.Title:
            return action.payload.map((movie) => ({
                ...movie,
                hidden: movie.title.toLowerCase().indexOf(action.filter as string) === -1
            }));
        case MovieFilterActionType.Genre:
            if (action.filter.length > 0) {
                return action.payload.map((movie) => {
                    // Hide a movie that doesn't contain any of the selected genres
                    return {
                        ...movie,
                        hidden: !movie.genres.some((genre) => (action.filter as string[]).includes(genre))
                    };
                });
            }
            return action.payload;
        case MovieFilterActionType.Decade:
            if (action.filter.length > 0) {
                return action.payload.map((movie) => {
                    // Hide a movie that doesn't container any of the selected decades
                    return {
                        ...movie,
                        hidden: !action.filter.includes(`${movie.year.substr(0, 3)}0s`)
                    }
                });
            }
            return action.payload;
        case MovieFilterActionType.Language:
            if (action.filter.length > 0) {
                return action.payload.map((movie) => {
                    // Hide a movie that doesn't contain any of the selected languages
                    return {
                        ...movie,
                        hidden: !movie.languages.some((language) => action.filter.includes(language))
                    };
                });
            }
            return action.payload;
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
}

export default movieFiltersReducer;
