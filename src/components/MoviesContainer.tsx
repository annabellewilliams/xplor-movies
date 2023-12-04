import React, { useReducer } from 'react';

// Components
import Container from 'react-bootstrap/Container';
import MovieFilters from './MovieFilters';
import MovieRow from './MovieRow';
import Row from 'react-bootstrap/Row';

// Enums
import { MovieFilterActionType } from '../reducers/movieFiltersReducer';

// reducers
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
        // Get unique genres
        const genres: { [key: string]: boolean } = {};
        movies.forEach((movie) => {
            movie.genres.forEach((genre) => {
                genres[genre] = true;
            })
        });
        return Object.keys(genres).sort();
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

    const formatMovies = () => {
        return [...(filteredMovies.length ? filteredMovies : movies)]
            .filter(({ hidden }) => !hidden)
            .map(({ title, year, runtime, genres, score, poster }) => {
                return <MovieRow
                    key={title}
                    genres={genres}
                    runtime={runtime}
                    score={score}
                    title={title}
                    year={year}
                    poster={poster}
                />
            });
    };

    return (
        <Container id="container">
            <h1 className="display-1 py-5 text-center">Xplor Movies</h1>
            <MovieFilters genres={getGenres()} filterByTitle={handleFilterByTitle} filterByGenre={handleFilterByGenre}/>
            <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4 mb-5">
                { formatMovies() }
            </Row>
        </Container>
    );
}

export default MoviesContainer;
