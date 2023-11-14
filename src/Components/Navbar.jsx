function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search() {
  return (
    <input className="search" type="text" placeholder="Search movies..." />
  );
}

function NumResult() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
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
