import { useState } from "react";
import { WatchedList, WatchedSummary } from "./Watched";
import { MovieDetails, MovieList } from "./Movie";
import Loader from "./Loader";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

export default function Main({ selectedId, isLoading, error }) {
  return (
    <main className="main">
      <Box>
        {isLoading && <Loader />}
        {!isLoading && !error && <MovieList />}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
        {selectedId ? (
          <MovieDetails selectedId={selectedId} />
        ) : (
          <>
            <WatchedSummary />
            <WatchedList />
          </>
        )}
      </Box>
    </main>
  );
}
