import express from "express";
import cors from "cors";
import { z } from "zod";
import fs from "fs/promises";

const app = express();

app.use(cors());
app.use(express.json());

type Movie = {
  id?: number;
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  "release-date": string;
  writers: string[];
  actors: string[];
  storyline: string;
  directors: string[];
};

const loadDB = async (filename: string) => {
  try {
    const rawData = await fs.readFile(
      `${__dirname}/../database/${filename}.json`,
      "utf-8"
    );
    const data = JSON.parse(rawData);
    return data as Movie[];
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

  const movies = await loadDB("movies");
  if (!movies) return res.sendStatus(500);

  /*   const filterMovies = movies.filter((movie) => movie.year > queryParams.after); */

  /*   res.json(filterMovies); */
  res.json(movies);
});
