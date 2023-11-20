const initialState = {
  movies: [],
  query: "",
  watched: [],
  selectedId: null,
  isLoading: false,
  error: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "movie/received":
      return {
        ...state,
        movies: action.payload,
      };
    case "movie/failed":
      return {
        ...state,
        error: action.payload,
      };
    case "movie/search":
      return {
        ...state,
        query: action.payload,
      };
    case "movie/select":
      return {
        ...state,
        selectedId: action.payload === state.selectedId ? null : action.payload,
      };
    case "movie/close":
      return {
        ...state,
        selectedId: null,
      };
    case "watched/add":
      return {
        ...state,
        watched: [...state.watched, action.payload],
      };
    case "watched/delete":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.imdbID !== action.payload
        ),
      };
    default:
      return state;
  }
}

export function receive(movies) {
  return { type: "movie/received", payload: movies };
}
export function fail(error) {
  return { type: "movie/failed", payload: error };
}
export function search(query) {
  return { type: "movie/search", payload: query };
}
export function select(movie) {
  return { type: "movie/select", payload: movie };
}
export function close() {
  return { type: "movie/close" };
}
export function addWatched(movie) {
  return { type: "watched/add", payload: movie };
}
export function deleteWatched(movie) {
  return { type: "watched/delete", payload: movie };
}
