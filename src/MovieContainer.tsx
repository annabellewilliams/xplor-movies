import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import moviesPlaceholder from './movies';

// Components
import MovieFilters from "./MovieFilters";
import MovieRow from './MovieRow';
import Row from 'react-bootstrap/Row';

type MovieData = {
    title: string;
    year: string;
    runtime: string;
    genre: string[];
    ratings: Rating[];
    poster: string;
}

type Movie = {
    title: string;
    year: string;
    runtime: string;
    genres: string[];
    score: string;
    poster: string;
}

type Rating = {
    source: string;
    value: string;
}

const MovieContainer = () => {
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [movies, setMovies] = useState(moviesPlaceholder);

    const getRottenTomatoesRating = (ratings: Rating[]): string => {
        const found = ratings.filter((rating: Rating) => {
            return rating.source === 'Rotten Tomatoes';
        });
        if (found.length) {
            return found[0].value;
        }
        return 'N/A';
    }
    const formatMovies = (movieData: MovieData[]) => {
        return movieData.map(({ title, year, runtime, genre, ratings, poster }) => {
            return <MovieRow
                key={title}
                genres={genre}
                runtime={runtime}
                score={getRottenTomatoesRating(ratings)}
                title={title}
                year={year}
                poster={poster}
            />
        });
    };

    const getGenres = () => {
        const genres: { [key: string]: boolean } = {};
        movies.forEach((movie) => {
            movie.genre.forEach((genre) => {
                genres[genre] = true;
            })
        });
        return Object.keys(genres).sort();
    }

    useEffect(() => {
        console.log('from useEffect', loading);
        fetch("./src/movies.json").then((response) => {
            if (response.ok) {
                console.log('response is ok', response);
                return response.clone().json();
            }
            console.log('response is not ok', response);
            throw response;
        })
            .then((data) => {
                setMovies(data);
                console.log('data', data);
            })
            .catch((err) => {
                console.log(`Error fetching data: ${err}`);
            })
            .finally(() => {
                setLoading(false);
                setGenres((state) => [...state, ...getGenres()]); // TODO: placeholder
                console.log('my movies', loading, movies);
            });
    }, []);

    useEffect(() => {
        // do something everytime movies array
    }, movies);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container id="container">
            <h1>Xplor Movies</h1>
            <MovieFilters genres={genres}/>
            <Row sm={3} md={4} lg={7} className="g-4">
                { formatMovies(movies) }
            </Row>
        </Container>
    );
}

export default MovieContainer;
