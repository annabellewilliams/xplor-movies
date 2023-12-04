// Types
import {Movie} from './types';

export enum MovieFilterActionType {
    Title = 'title',
    Genre = 'genre',
}

type MovieFilterAction = {
    type: MovieFilterActionType;
    filter: string | string[];
}

const movieFiltersReducer = (movies: Movie[], action: MovieFilterAction): Movie[] => {
    switch (action.type) {
        case MovieFilterActionType.Title:
            return movies.map((movie) => ({
                ...movie,
                hidden: movie.title.toLowerCase().indexOf(action.filter as string) === -1
            }));
        case MovieFilterActionType.Genre:
            if (action.filter.length > 0) {
                return movies.map((movie) => {
                    // Hide a movie that doesn't contain any of the selected genres
                    return {
                        ...movie,
                        hidden: !movie.genres.some((genre) => (action.filter as string[]).includes(genre))
                    };
                });
            }
            return movies;
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
}

export default movieFiltersReducer;
