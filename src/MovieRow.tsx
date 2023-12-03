import React from "react";

type MovieRowProps = {
  genres: string[];
  runtime: string;
  score: string;
  title: string;
};

const MovieRow = ({ title, runtime, genres, score }: MovieRowProps) => {
  return (
    <div style={{ display: "flex" }}>
      <div>{title}</div>
      <div>{runtime}</div>
      {/* <ul>
        {genres.map((genre) => (
          <li>{genre}</li>
        ))}
      </ul> */}
      <div>{score}</div>
    </div>
  );
};

export default MovieRow;
