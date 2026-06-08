import { useContext } from "react";
import { Link } from "react-router-dom";
import { WatchListContext } from "../context/WatchListContext";

function WatchListContext() {
  const {
    watchlist,
    removeFromWatchlist,
  } = useContext(
    WatchlistContext
  );

  if (watchlist.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">
          No movies in watchlist
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Watchlist
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {watchlist.map(
          (movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded p-4"
            >
              <Link
                to={`/movie/${movie.id}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded mb-3"
                />
              </Link>

              <h2 className="font-bold">
                {movie.title}
              </h2>

              <p>
                {movie.release_date}
              </p>

              <button
                onClick={() =>
                  removeFromWatchlist(
                    movie.id
                  )
                }
                className="bg-red-500 text-white px-3 py-2 rounded mt-3 w-full cursor-pointer"
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default WatchListContext;