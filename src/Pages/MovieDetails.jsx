import MovieCard from "../Components/MovieCard";

import {
  getMovieDetails,
  getSimilarMovies,
} from "../Services/movieApi";

import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
} from "react-router-dom";

import { WatchlistContext } from "../context/WatchListContext";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] =
    useState(null);

  const [similarMovies, setSimilarMovies] =
    useState([]);

  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useContext(
    WatchlistContext
  );

  useEffect(() => {
    const fetchMovie = async () => {
      const data =
        await getMovieDetails(id);

      setMovie(data);

      const similar =
        await getSimilarMovies(id);

      setSimilarMovies(
        similar.slice(0, 8)
      );
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const isInWatchlist =
    watchlist.some(
      (item) =>
        Number(item.id) ===
        Number(movie.id)
    );

  return (
    <div className="bg-black min-h-screen text-white">
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="min-h-screen bg-black/60 flex items-center">
          <div className="max-w-3xl px-12">
            <h1 className="text-6xl font-bold mb-4">
              {movie.title}
            </h1>

            <div className="flex gap-6 mb-4 text-lg">
              <span>
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>

              <span>
                {movie.release_date}
              </span>

              <span>
                {movie.runtime} mins
              </span>
            </div>

            <p className="text-lg mb-6">
              {movie.overview}
            </p>

            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-3 rounded font-bold">
                ▶ Play
              </button>

           <button
  onClick={async () => {
    if (isInWatchlist) {
      await removeFromWatchlist(movie.id);
    } else {
      await addToWatchlist(movie);
    }
  }}
  className="bg-red-600 px-8 py-3 rounded font-bold"
>
                {isInWatchlist
                  ? "Remove From Watchlist"
                  : "Add To Watchlist"}
              </button>
            </div>

            <p className="mt-6">
              Genres:{" "}
              {movie.genres
                .map(
                  (genre) =>
                    genre.name
                )
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-12 py-8">
        <h2 className="text-3xl font-bold mb-6">
          More Like This
        </h2>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similarMovies.map(
            (movie) => (
            <div key={movie.id}>
                <MovieCard
                  movie={movie}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
    
  );
}

export default MovieDetails;