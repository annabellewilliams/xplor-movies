import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

type MovieRowProps = {
  genres: string[];
  poster: string;
  runtime: string;
  score: string;
  title: string;
  year: string;
};

const MovieRow = ({ title, runtime, genres, score, year, poster }: MovieRowProps) => {
    return (
        <Col key={`${title}-${year}`} className="movieCol">
            <Card className="h-100">
                <Card.Img variant="right" src={poster} alt={title} />
                <Card.Body style={{ flexGrow: 0 }}>
                    <Card.Title className="title">{ `${title} (${year})` }</Card.Title>
                    <Card.Text>
                        <div>{ runtime }</div>
                        <ul className="list-group list-group-flush">
                            {genres.map((genre) => (
                                <li key={genre} className="movieGenre list-group-item">{genre}</li>
                            ))}
                        </ul>
                        <div>{ score }</div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
//   return (
//     <Row className="movieRow">
//       <Col className="title">{title}</Col>
//       <Col>{runtime}</Col>
//       <Col>
//           <ul>
//               {genres.map((genre) => (
//                   <li key={genre}>{genre}</li>
//               ))}
//           </ul>
//       </Col>
//       <Col>{score}</Col>
//     </Row>
//   );
};

export default MovieRow;
