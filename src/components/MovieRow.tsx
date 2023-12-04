import React from 'react';

// components
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {Movie} from '../types';

type MovieRowProps = Movie;

const MovieRow = ({ title, runtime, genres, score, year, poster }: MovieRowProps) => {
    return (
        <Col key={`${title}-${year}`} className="movieCol">
            <Card className="h-100 shadow-sm">
                <Card.Img
                    variant="right"
                    src={poster}
                    alt={title}
                    style={{ maxHeight: '60%', minHeight: '60%' }}
                    className="bg-light text-center text-secondary fs-4"
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="title">
                        {title}
                        <small className="text-secondary">{` (${year})`}</small>
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                        <div className="mb-3">
                            <small className="text-secondary">{ runtime }</small>
                        </div>
                        {genres.map((genre) => (
                            <Badge pill key={genre} className="m-1 ms-0">{genre}</Badge>
                        ))}
                    </Card.Text>
                    <Card.Footer className="bg-white text-center text-secondary fs-4">
                        <div>{ score }</div>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default MovieRow;
