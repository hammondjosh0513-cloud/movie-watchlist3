import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { getMovieDetails } from "../services/movieApi";

import WatchlistProvider from "./context/WatchListContext"

function MovieDetails() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [movie, setMovie] =
    useState(null);

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
    <div className="p-6">
      <button
        onClick={() =>
          navigate(-1)
        }
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 cursor-pointer"
      >
        Back
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-64 rounded mb-4 block"
      />

      <h1 className="text-3xl font-bold">
        {movie.title}
      </h1>

      <p>
        Release Date:{" "}
        {movie.release_date}
      </p>

      <p>
        Runtime: {movie.runtime} mins
      </p>

      <p>
        ⭐{" "}
        {movie.vote_average?.toFixed(
          1
        )}
      </p>

      <button
        onClick={async () => {
          if (
            isInWatchlist
          ) {
            await removeFromWatchlist(
              movie.id
            );
          } else {
            await addToWatchlist(
              movie
            );
          }
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer block"
      >
        {isInWatchlist
          ? "Remove From Watchlist"
          : "Add To Watchlist"}
      </button>

      <p className="mt-4">
        Genres:{" "}
        {movie.genres
          .map(
            (genre) =>
              genre.name
          )
          .join(", ")}
      </p>

      <p className="mt-4">
        {movie.overview}
      </p>
    </div>
  );
}

export default MovieDetails;