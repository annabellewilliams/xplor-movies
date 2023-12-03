import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import moviesPlaceholder from './movies';

import MovieRow from './MovieRow';

type MovieData = {
    title: string;
    year: string;
    runtime: string;
    genre: string[];
    ratings: Rating[];
}

type Movie = {
    title: string;
    year: string;
    runtime: string;
    genres: string[];
    score: string;
}

type Rating = {
    source: string;
    value: string;
}

const MovieContainer = () => {
    const [loading, setLoading] = useState(true);
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
        return movieData.map(({ title, year, runtime, genre, ratings }) => {
            return <MovieRow
                genres={genre}
                runtime={runtime}
                score={getRottenTomatoesRating(ratings)}
                title={title}
            />
        });
    };

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
                console.log('my movies', loading, movies);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log('my movies', movies);
    return (
        <Container>
            <h1>Xplor Movies</h1>
            { formatMovies(movies) }
        </Container>
    );
}

export default MovieContainer;
