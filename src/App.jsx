import NavBar from "./Components/Navbar";
import Main from "./Components/Main";
import { useEffect, useState } from "react";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "f21f080b";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const watched = tempWatchedData;

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          console.log(data);
          if (data.Response === "False") throw new Error("Movie not Found");

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
        }
      }

      if (query.length < 3) {
        setMovies([]);
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <Main
        movies={movies}
        onSelectMovie={handleSelectMovie}
        selectedId={selectedId}
        watched={watched}
      />
    </>
  );
}
