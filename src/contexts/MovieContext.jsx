import { createContext, useContext, useReducer, useState } from "react";

const MovieContext = createContext();

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

function MovieProvider({ children }) {
  const [{ query, movies, watched }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <MovieContext.Provider
      value={{
        movies,
        query,
        dispatch,
        watched,
        selectedId,
        onCloseMovie: handleCloseMovie,
        onSelectMovie: handleSelectMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

function useMovie() {
  const context = useContext(MovieContext);
  return context;
}

export { MovieProvider, useMovie };
