import React from 'react';

// Components
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import movieRow from "./MovieRow";

// TODO: get list of available genres

type MovieFiltersProps = {
    genres: string[];
    filterByTitle?: () => void; // dispatch an action to filter movie titles
}
const MovieFilters = ({ genres }: MovieFiltersProps) => {
    const movieRows = document.getElementsByClassName('movieCol');
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        const filter = event.target.value.toLowerCase();

        for (let i = 0; i < movieRows.length; i++) {
            const titleElement = movieRows[i].getElementsByClassName('title')[0];
            const title = (titleElement.textContent || titleElement.innerHTML).toLowerCase();
            if (title.indexOf(filter) === -1) {
                movieRows[i].classList.add('d-none');
            } else {
                movieRows[i].classList.remove('d-none');
            }
        }
    };

    const handleGenreFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, genre: string) => {
        // event.preventDefault();
        const checked = (event.target as HTMLInputElement).checked;
        console.log('event', event);

        for (let i = 0; i < movieRows.length; i++) {
            const genreList = movieRows[i].getElementsByClassName('movieGenre');
            for (let j = 0; j < genreList.length; j++) {
                const label = genreList[j].getElementsByClassName('list-group-item')[0];
                console.log('label', label);
                if (genre.toLowerCase() === label.innerHTML.toLowerCase()) {
                    movieRows[i].classList.add('d-none');
                } else {
                    movieRows[i].classList.remove('d-none');
                }
            }
        }
    }

    const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
        // const form = new FormData(event.target as HTMLFormElement);
        console.log('current target', event.target);
    };

    return (
        <Row>
            <Col>
                <Dropdown>
                    <Dropdown.Toggle id="genreFilter">Genre</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Form onChange={(event) => handleFormChange(event)}>
                            { genres.map((genre) => (
                                <Form.Check
                                    type="checkbox"
                                    className="ms-3 mb-3"
                                    id={`filter-${genre}`} label={genre}
                                    onChange={(event) => handleGenreFilter(event, genre)}
                                />
                            ))}
                        </Form>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="formMovieSearch">
                        <Form.Label>Filter by title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a film title..."
                            onChange={(event) => handleSearch(event)}
                        />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
};

export default MovieFilters;
