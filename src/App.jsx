import NavBar from "./Components/Navbar";
import Main from "./Components/Main";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fail, receive } from "./components/slice";

const KEY = "f21f080b";

export default function App() {
  const { query, selectedId, error } = useSelector((state) => state);
  // const [selectedId, setSelectedId] = useState(null);

  // function handleSelectMovie(id) {
  //   setSelectedId(id === selectedId ? null : id);
  // }

  // function handleCloseMovie() {
  //   setSelectedId(null);
  // }
  // console.log(movies);

  const dispatch = useDispatch();

  // const { query, error, selectedId, dispatch } = useMovie();
  const [isLoading, setIsLoading] = useState(false);

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
          dispatch(receive(data.Search));
          // dispatch({ type: "dataReceived", payload: data.Search });
        } catch (err) {
          if (err.name !== "AbortError") {
            dispatch(fail(err.message));
            // dispatch({ type: "dataFailed", payload: err.message });
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        dispatch(receive([]));
        // dispatch({ type: "dataReceived", payload: [] });
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [dispatch, query]
  );

  return (
    <>
      <NavBar />
      <Main selectedId={selectedId} isLoading={isLoading} error={error} />
    </>
  );
}
