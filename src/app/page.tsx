"use client";

import axios from "axios";
import { Movie } from "@/app/types/movieType";
import { useState } from "react";
import Image from "next/image";

export default function Main() {
  const [movieData, setmovieData] = useState<Movie[]>([]);
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);

  const getMovies = async (prompt: string) => {
    setloading(() => true);
    setmovieData(() => []);
    const result = await axios.post("./api/recommend", {
      prompt: prompt,
    });

    result.data.forEach(async (movieId: string) => {
      await axios
        .get("https://www.omdbapi.com", {
          params: {
            apikey: "69b9849a",
            i: movieId,
          },
        })
        .then((res) => setmovieData((prev) => [...prev, res.data]));
    });
    setloading(() => false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full pb-12 bg-gradient-to-br from-slate-800 to-slate-950">
      {loading ? (
        "loading..."
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
          {movieData?.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex flex-col justify-center items-center"
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  className="min-w-fit"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </div>
              <div className="text-xl font-sans py-1">{movie.Title}</div>
              <div className="font-light">
                {movie.Ratings.map((rating, index) => (
                  <div key={index}>
                    <span>
                      <b>
                        {rating.Source === "Internet Movie Database"
                          ? "IMDB"
                          : rating.Source}
                      </b>
                    </span>
                    {": " + rating.Value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getMovies(prompt);
        }}
        className="flex justify-center"
      >
        <input
          className="fixed -bottom-8 backdrop-blur-sm border placeholder-slate-800 font-semibold font-mono bg-slate-50 bg-opacity-40 w-full max-w-3xl p-3 text-lg mb-8  outline-none rounded-lg shadow-xl text-slate-950"
          value={prompt}
          placeholder="Search similar movies..."
          onChange={(e) => setprompt(e.target.value)}
        />
      </form>
    </div>
  );
}
