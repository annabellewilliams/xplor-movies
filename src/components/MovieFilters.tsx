import React, { useEffect, useState } from 'react';

// Components
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

type MovieFiltersProps = {
    decades: string[];
    genres: string[];
    languages: string[];
    filterByDecade: (filter: string[]) => void;
    filterByGenre: (filter: string[]) => void;
    filterByLanguage: (filter: string[]) => void;
    filterByTitle: (filter: string) => void;
}
const MovieFilters = ({ decades, genres, languages, filterByDecade, filterByGenre, filterByLanguage, filterByTitle }: MovieFiltersProps) => {
    const [selectedDecades, setSelectedDecades] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        filterByTitle(event.target.value.toLowerCase());
    };

    const handleGenreFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, genre: string) => {
        if ((event.target as HTMLInputElement).checked) {
            selectedGenres.push(genre);
        } else {
            setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
        }
        filterByGenre(selectedGenres);
    }

    const handleDecadeFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, decade: string) => {
        if ((event.target as HTMLInputElement).checked) {
            selectedDecades.push(decade);
        } else {
            setSelectedDecades(selectedDecades.filter((selectedDecade) => selectedDecade !== decade));
        }
        filterByDecade(selectedDecades);
    };

    const handleLanguageFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, language: string) => {
        if ((event.target as HTMLInputElement).checked) {
            selectedLanguages.push(language);
        } else {
            setSelectedLanguages(selectedLanguages.filter((selectedLanguage) => selectedLanguage !== language));
        }
        filterByLanguage(selectedLanguages);
    };

    useEffect(() => {
        filterByGenre(selectedGenres);
    }, [selectedGenres]);

    useEffect(() => {
        filterByDecade(selectedDecades);
    }, [selectedDecades]);

    useEffect(() => {
        filterByLanguage(selectedLanguages);
    }, [selectedLanguages]);

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
                    <Dropdown>
                        <Dropdown.Toggle id="languageFilter" variant="outline-secondary">Languages</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form id="languageForm">
                                { languages.map((language) => (
                                    <Form.Check
                                        id={`filter-${language}`}
                                        key={`filter-${language}`}
                                        label={language}
                                        aria-label={language}
                                        type="checkbox"
                                        className="ms-3 mb-3"
                                        onChange={(event) => handleLanguageFilter(event, language)}
                                    />
                                ))}
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="decadesFilter" variant="outline-secondary">Decades</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form id="decadesForm">
                                { decades.map((decade) => (
                                    <Form.Check
                                        id={`filter-${decade}`}
                                        key={`filter-${decade}`}
                                        label={decade}
                                        aria-label={decade}
                                        type="checkbox"
                                        className="ms-3 mb-3"
                                        onChange={(event) => handleDecadeFilter(event, decade)}
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
