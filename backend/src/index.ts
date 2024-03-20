import express from "express";
import cors from "cors";
import { z } from "zod";
import fs from "fs/promises";

const app = express();

app.use(cors());
app.use(express.json());

const MovieSchema = z.object({
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

type Movie = z.TypeOf<typeof MovieSchema>;

const MovieDataSchema = z.object({
  movies: z.array(MovieSchema),
});

type MovieData = z.TypeOf<typeof MovieDataSchema>;

const loadDB = async (filename: string) => {
  try {
    const rawData = await fs.readFile(
      `${__dirname}/../database/${filename}.json`,
      "utf-8"
    );
    const data = JSON.parse(rawData);
    return data as MovieData;
  } catch (error) {
    return null;
  }
};

const saveDB = async (filename: string, data: any) => {
  try {
    const fileContent = JSON.stringify(data);
    await fs.writeFile(
      `${__dirname}/../database/${filename}.json`,
      fileContent
    );
    return true;
  } catch (error) {
    return false;
  }
};

app.get("/api/movies", async (req, res) => {
  /*   const result = QueryParams.safeParse(req.query);
  if (!result.success) return res.status(400).json(result.error.issues);
  const queryParams = result.data; */

  const movies = await loadDB("data");
  if (!movies) return res.sendStatus(500);

  /*   const filterMovies = movies.filter((movie) => movie.year > queryParams.after); */

  /*   res.json(filterMovies); */
  res.json(movies);
});

app.listen(7000);
