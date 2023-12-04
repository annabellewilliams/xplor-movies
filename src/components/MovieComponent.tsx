import React, {useEffect, useState} from 'react';

// Components
import MoviesContainer from './MoviesContainer';

// Types
import type {Movie, MovieData, Rating} from '../types';

const MovieComponent = () => {
    // State
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<MovieData[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);


    const getRottenTomatoesRating = (ratings: Rating[]): string => {
        let rottenTomatoScore = '';
        ratings.some((rating: Rating) => {
            if (rating.source === 'Rotten Tomatoes') {
                rottenTomatoScore = rating.value;
                return true;
            }
            return false;
        });
        return rottenTomatoScore || 'N/A';
    }

    const setMovieData = () => {
        // Extract the necessary data from the JSON response
        const movieData = data
            .map(({title, year, runtime, genre, ratings, poster, language }) => ({
                title,
                year,
                runtime,
                poster,
                languages: language.split(', '),
                genres: genre,
                score: getRottenTomatoesRating(ratings),
            }));
        setMovies(movieData);
    };

    const fetchMovies = async () => {
        const response = await fetch('./movies.json');
        return await response.json();
    };

    useEffect(() => {
        fetchMovies()
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                console.log('Error fetching data:', err);
            })
        ;
    }, []);

    useEffect(() => {
        setMovieData();
    }, [data]);

    useEffect(() => {
        setLoading(false);
    }, [movies]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <MoviesContainer movies={movies} />;
}

export default MovieComponent;
