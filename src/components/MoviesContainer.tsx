import React, { useReducer } from 'react';

// Components
import Container from 'react-bootstrap/Container';
import MovieFilters from './MovieFilters';
import MovieRow from './MovieRow';
import Row from 'react-bootstrap/Row';

// Enums
import { MovieFilterActionType } from '../reducers/movieFiltersReducer';

// Reducers
import movieFiltersReducer from '../reducers/movieFiltersReducer';

// Types
import type { Movie } from '../types';

type MoviesComponentProps = {
    movies: Movie[];
};

const MoviesContainer = ({ movies }: MoviesComponentProps) => {

    // Reducers
    const [filteredMovies, dispatch] = useReducer(movieFiltersReducer, movies);
    const getGenres = () => {
        const genres = movies.reduce((genres: { [key: string]: boolean }, movie) => {
            movie.genres.forEach((genre) => {
                genres[genre] = true;
            })
            return genres;
        }, {});
        return Object.keys(genres).sort();
    }

    const getLanguages = () => {
        // Get unique languages
        const languages = movies.reduce((languages: { [key: string]: boolean }, movie) => {
            movie.languages.forEach((language) => {
                languages[language] = true;
            });
            return languages;
        }, {});
        return Object.keys(languages).sort();
    }

    const getDecades = () => {
        const decades = movies.reduce((decades: { [key: string]: boolean }, movie) => {
            decades[`${movie.year.substring(0, 3)}0s`] = true;
            return decades;
        }, {});
        return Object.keys(decades).sort();
    }

    const handleFilterByTitle = (filter: string) => {
        dispatch({
            type: MovieFilterActionType.Title,
            payload: movies,
            filter,
        });
    };

    const handleFilterByGenre = (filter: string[]) => {
        dispatch({
            type: MovieFilterActionType.Genre,
            payload: movies,
            filter,
        });
    };

    const handleFilterByDecade = (filter: string[]) => {
        dispatch({
            type: MovieFilterActionType.Decade,
            payload: movies,
            filter,
        });
    };

    const handleFilterByLanguage = (filter: string[]) => {
        dispatch({
            type: MovieFilterActionType.Language,
            payload: movies,
            filter,
        });
    };

    const formatMovies = () => {
        return [...(filteredMovies.length ? filteredMovies : movies)]
            .filter(({ hidden }) => !hidden)
            .map(({ title, year, runtime, genres, score, poster, languages }) => {
                return <MovieRow
                    key={title}
                    genres={genres}
                    runtime={runtime}
                    score={score}
                    title={title}
                    year={year}
                    poster={poster}
                    languages={languages}
                />
            });
    };

    return (
        <Container id="container">
            <h1 className="display-1 py-5 text-center">Xplor Movies</h1>
            <MovieFilters
                decades={getDecades()}
                genres={getGenres()}
                languages={getLanguages()}
                filterByDecade={handleFilterByDecade}
                filterByGenre={handleFilterByGenre}
                filterByLanguage={handleFilterByLanguage}
                filterByTitle={handleFilterByTitle}
            />
            <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4 mb-5">
                { formatMovies() }
            </Row>
        </Container>
    );
}

export default MoviesContainer;
