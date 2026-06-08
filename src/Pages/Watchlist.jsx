import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const {
    watchlist,
    removeFromWatchlist,
  } = useContext(
    WatchlistContext
  );

  if (watchlist.length === 0) {
    return (
      <h2 className="p-6">
        No movies in watchlist
      </h2>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Watchlist
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {watchlist.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />

            <button
              onClick={() =>
                removeFromWatchlist(
                  movie.id
                )
              }
              className="bg-red-500 text-white px-3 py-2 rounded mt-2 w-full"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;