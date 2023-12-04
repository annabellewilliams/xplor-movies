import React, { useEffect, useState } from 'react';

// components
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

type MovieFiltersProps = {
    genres: string[];
    filterByGenre: (filter: string[]) => void;
    filterByTitle: (filter: string) => void;
}
const MovieFilters = ({ genres, filterByGenre, filterByTitle }: MovieFiltersProps) => {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        filterByTitle(event.target.value.toLowerCase());
    };

    const handleGenreFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, genre: string) => {
        const checked = (event.target as HTMLInputElement).checked;

        if (checked) {
            selectedGenres.push(genre);
        } else {
            setSelectedGenres(selectedGenres.filter((selectedGenre) => {
                return selectedGenre !== genre;
            }));
        }
        filterByGenre(selectedGenres);
    }

    useEffect(() => {
        filterByGenre(selectedGenres);
    }, [selectedGenres]);

    return (
        <Row>
            <Col>
                <div className="d-flex justify-content-end gap-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="formMovieSearch">
                            <Form.Control
                                aria-label="Filter by title"
                                type="text"
                                placeholder="Enter a film title..."
                                onChange={(event) => handleSearch(event)}
                            />
                        </Form.Group>
                    </Form>
                    <Dropdown>
                        <Dropdown.Toggle id="genreFilter" variant="outline-secondary">Genre</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form id="genreForm">
                                { genres.map((genre) => (
                                    <Form.Check
                                        id={`filter-${genre}`}
                                        key={`filter-${genre}`}
                                        label={genre}
                                        aria-label={genre}
                                        type="checkbox"
                                        className="ms-3 mb-3"
                                        onChange={(event) => handleGenreFilter(event, genre)}
                                    />
                                ))}
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Col>
        </Row>
    );
};

export default MovieFilters;
