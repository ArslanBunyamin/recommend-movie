"use client";

import axios from "axios";
import { useRef, useState } from "react";
import MovieComponent from "./components/MovieComponent";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import Image from "next/image";
import backGround from "../assets/homeBg.jpg";

export default function Main() {
  const [movieIDs, setMovieIDs] = useState<string[]>([]);
  const [prompt, setprompt] = useState("");
  const [loading, setloading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () =>
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });

  const getMovies = async (prompt: string) => {
    scrollBottom();
    setloading(() => true);
    setMovieIDs(() => []);
    const result = await axios.post("./api/recommend", {
      prompt: prompt,
    });
    setMovieIDs(() => result.data);
    setloading(() => false);
  };

  return (
    <div className="flex flex-col items-center lg:px-52 min-h-screen w-full pb-12">
      <div className="absolute w-screen min-h-screen h-full overflow-hidden md:flex md:justify-center md:items-center -z-10">
        <Image
          src={backGround}
          alt="HomeBg"
          className="md:h-auto md:w-full h-full object-cover"
        />
      </div>

      <div className="w-full h-screen pt-12 flex flex-col items-center px-5 gap-12">
        <div className="text-3xl  sm:text-5xl md:text-6xl flex flex-col items-center gap-4">
          <span className="font-thin text-slate-50 text-opacity-50">
            Explore
          </span>
          <div>
            <span>Movies</span>
            <span className="font-thin"> / </span>
            <span>Series</span>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getMovies(prompt);
          }}
          className="w-full text-center"
        >
          <input
            className="border border-slate-50 border-opacity-30 placeholder:font-light placeholder:opacity-30 focus:border-red-950 rounded-lg font-semibold font-mono bg-slate-50 bg-opacity-0 w-full max-w-3xl p-3 mb-8  outline-none text-slate-50 "
            value={prompt}
            placeholder="Shrek"
            onChange={(e) => setprompt(e.target.value)}
            spellCheck="false"
          />
        </form>
      </div>

      <div className="pt-12" ref={resultsRef}>
        {loading ? (
          <PiSpinnerBallDuotone className="text-6xl animate-spin my-56" />
        ) : (
        <>
          <div className="font-thin text-center text-6xl py-5 text-white text-opacity-70 ">
            Explore
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5 md:gap-5">
            {movieIDs?.map((id) => (
              <MovieComponent movieID={id} key={id} />
            ))}
          </div>
        </>
        )}
      </div>
    </div>
  );
}
