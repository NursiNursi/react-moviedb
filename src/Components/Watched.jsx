// import { useMovie } from "../contexts/MovieContext";

import { useDispatch, useSelector } from "react-redux";
import { deleteWatched } from "./slice";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function WatchedSummary() {
  const { watched } = useSelector((store) => store);
  // const { watched } = useMovie();

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

export function WatchedList() {
  const { watched } = useSelector((store) => store);

  // const { watched } = useMovie();
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watched key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function Watched({ movie }) {
  // const { dispatch } = useMovie();
  const dispatch = useDispatch();
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={
          () => dispatch(deleteWatched(movie.imdbID))
          // dispatch({ type: "deleteWatched", payload: movie.imdbID })
        }
      >
        X
      </button>
    </li>
  );
}
