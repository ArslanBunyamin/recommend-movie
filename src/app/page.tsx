"use client";

import axios from "axios";
import { useState } from "react";
import MovieComponent from "./components/MovieComponent";
import LoadingComponent from "./components/LoadingComponent";

export default function Main() {
  const [movieIDs, setMovieIDs] = useState<string[]>([]);
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);

  const getMovies = async (prompt: string) => {
    setloading(() => true);
    setMovieIDs(() => []);
    const result = await axios.post("./api/recommend", {
      prompt: prompt,
    });
    setMovieIDs(() => result.data);
    setloading(() => false);
  };

  return (
    <div className="flex flex-col justify-center items-center lg:px-52 min-h-screen w-full pb-12 bg-gradient-to-br from-slate-800 to-slate-950">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5 md:gap-5">
        {loading ? (
          <LoadingComponent />
        ) : (
          movieIDs?.map((id) => <MovieComponent movieID={id} key={id} />)
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getMovies(prompt);
        }}
        className="flex justify-center"
      >
        <input
          className="fixed -bottom-8 backdrop-blur-sm border placeholder-slate-800 font-semibold font-mono bg-slate-50 bg-opacity-40 w-full max-w-3xl p-2 mb-8  outline-none rounded-lg shadow-xl text-slate-950"
          value={prompt}
          placeholder="Search similar movies..."
          onChange={(e) => setprompt(e.target.value)}
        />
      </form>
    </div>
  );
}
