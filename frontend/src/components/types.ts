import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  year: z.number(),
  runtime: z.coerce.number().optional(),
  genres: z.array(z.string()),
  "release-date": z.string().optional(),
  writers: z.array(z.string()),
  actors: z.array(z.string()),
  storyline: z.string().optional(),
  description: z.string().optional(),
  directors: z.array(z.string()),
});

export type Movie = z.TypeOf<typeof MovieSchema>;

export const MovieDataSchema = z.object({
  movies: z.array(MovieSchema),
});

export type MovieData = z.TypeOf<typeof MovieDataSchema>;
