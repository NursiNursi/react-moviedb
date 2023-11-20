import { useDispatch, useSelector } from "react-redux";
import { search } from "./slice";

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search() {
  const { query } = useSelector((store) => store);
  // const { query, dispatch } = useMovie();
  const dispatch = useDispatch();

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => dispatch(search(e.target.value))}
      // onChange={(e) => dispatch({ type: "setQuery", payload: e.target.value })}
    />
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResult />
    </nav>
  );
}
