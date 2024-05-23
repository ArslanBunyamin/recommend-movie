import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

export async function POST(request: NextRequest) {
    const { prompt } = await request.json();

    const result = await generateObject({
        model: openai('gpt-3.5-turbo'),
        system: "You are a movie/series recommender.",
        prompt: prompt + " benzeri film önerir misin? aynı filmi önerme lütfen.",
        schema: z.object({
            movies: z.array(z.string().describe("The Imdb ID of the recommended movies or series")).describe("the array of the recommended movies")
        }),
    });


    return NextResponse.json(result.object.movies, { status: 200 })
}