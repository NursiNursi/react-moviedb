import NavBar from "./Components/Navbar";
import Main from "./Components/Main";
import { createContext, useEffect, useReducer, useState } from "react";

const KEY = "f21f080b";

const initialState = {
  movies: [],
  query: "",
  watched: [],
  selectedId: null,
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        movies: action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        error: action.payload,
      };
    case "setQuery":
      return {
        ...state,
        query: action.payload,
      };
    case "addWatched":
      return {
        ...state,
        watched: [...state.watched, action.payload],
      };
    case "deleteWatched":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.imdbID !== action.payload
        ),
      };
    default:
      throw new Error("Action unknown");
  }
}

export const MovieContext = createContext();

export default function App() {
  const [{ movies, query, error, watched }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not Found");
          dispatch({ type: "dataReceived", payload: data.Search });
        } catch (err) {
          if (err.name !== "AbortError") {
            dispatch({ type: "dataFailed", payload: err.message });
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        dispatch({ type: "dataReceived", payload: [] });
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
    <MovieContext.Provider
      value={{
        movies,
        query,
        dispatch,
        watched,
        onCloseMovie: handleCloseMovie,
        onSelectMovie: handleSelectMovie,
      }}
    >
      <NavBar />
      <Main selectedId={selectedId} isLoading={isLoading} error={error} />
    </MovieContext.Provider>
  );
}
