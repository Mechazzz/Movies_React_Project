import { getMovies } from "./Safefetch/Safefetch";
import { useState, useEffect } from "react";
import { MovieData } from "./components/types";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<MovieData>({ movies: [] });

  const getAllMovies = async () => {
    const response = await getMovies();
    if (!response.success) return;
    setMovies(response.data);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <>
      <div>{JSON.stringify(movies)}</div>
    </>
  );
}

export default App;
