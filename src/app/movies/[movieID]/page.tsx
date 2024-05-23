"use client";

import LoadingComponent from "@/app/components/LoadingComponent";
import MovieComponent from "@/app/components/MovieComponent";
import { Movie } from "@/app/types/movieType";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { movieID: string } }) {
  const [movie, setmovie] = useState<Movie>();
  const [similarMovies, setsimilarMovies] = useState<string[]>([]);
  const [loading, setloading] = useState(false);
  params = useParams();
  useEffect(() => {
    axios
      .get("https://www.omdbapi.com", {
        params: {
          apikey: "69b9849a",
          i: params.movieID,
          plot: "full",
        },
      })
      .then((res) => setmovie(() => res.data));

    setloading(true);
    axios
      .post("/api/recommend", {
        prompt: movie?.Title,
      })
      .then((res) => setsimilarMovies(() => res.data))
      .then(() => setloading(false));
  }, []);

  return (
    <div className="flex flex-col justify-center  items-center lg:px-52 min-h-screen w-full p-5 md:p-0">
      <div className="absolute w-screen min-h-screen overflow-hidden flex justify-center items-center blur-md  opacity-40 -z-10">
        <img
          src={movie?.Poster}
          alt={movie?.Title}
          className="md:w-full md:h-auto h-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen">
        <div className="rounded-lg overflow-hidden flex justify-center items-center md:justify-end">
          <img src={movie?.Poster} alt={movie?.Title} />
        </div>
        <div className="text-sm flex flex-col justify-center">
          <div className="md:text-3xl text-xl font-bold">{movie?.Title}</div>
          <div className="font-light opacity-80 text-base md:text-lg flex-wrap flex justify-between">
            <div>{movie?.Genre} </div>
            <div>{movie?.Runtime}</div>
          </div>
          <div className="font-lights opacity-70 py-8">{movie?.Plot}</div>

          <div className="font-light py-2">
            {movie?.Ratings.map((rating, index) => (
              <div key={index} className=" opacity-80">
                <span className="font-bold">
                  {rating.Source === "Internet Movie Database"
                    ? "IMDB"
                    : rating.Source}
                </span>
                {": " + rating.Value}
              </div>
            ))}
          </div>
          <div>
            <span className="font-bold">Director:</span> {movie?.Director}
          </div>
          <div>
            <span className="font-bold">Actors:</span> {movie?.Actors}
          </div>
          <div className="pt-3 opacity-50">{movie?.Released}</div>
        </div>
      </div>
      <div>
        <div className="text-xl md:text-5xl text-center pt-10 pb-3 md:pb-10 font-thin">
          Explore More
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 min-h-screen">
          {loading ? (
            <LoadingComponent />
          ) : (
            similarMovies.map((id) => <MovieComponent key={id} movieID={id} />)
          )}
        </div>
      </div>
    </div>
  );
}
