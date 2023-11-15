import NavBar from "./Components/Navbar";
import Main from "./Components/Main";
import { useEffect, useState } from "react";

const KEY = "f21f080b";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
    // document.title = "usePopcorn";
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
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
        onAddWatched={handleAddWatched}
        onDeleteWatched={handleDeleteWatched}
        onCloseMovie={handleCloseMovie}
      />
    </>
  );
}
