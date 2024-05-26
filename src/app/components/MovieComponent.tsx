import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Movie } from "../types/movieType";

type Props = { movieID: string };

const MovieComponent = (props: Props) => {
  const [movie, setmovie] = useState<Movie>();
  const movieID = props.movieID;

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com", {
        params: {
          apikey: "69b9849a",
          i: movieID,
        },
      })
      .then((res) => setmovie(() => res.data));
  }, []);

  return movie?.Poster == "N/A" ? null : (
    <Link
      href={`/movies/${movie?.imdbID}`}
      key={movie?.imdbID}
      className="flex flex-col items-center"
    >
      <div className="rounded-xl overflow-hidden select-none">
        <img className="w-full" src={movie?.Poster} alt={movie?.Title} />
      </div>
      <div className="font-sans py-1">{movie?.Title}</div>
    </Link>
  );
};

export default MovieComponent;
