import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-white shadow rounded p-3 hover:scale-105 transition">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full rounded"
        />

        <h2 className="font-bold mt-2">
          {movie.title}
        </h2>

        <p>
          {movie.release_date?.split("-")[0]}
        </p>

        <p>
          ⭐ {movie.vote_average?.toFixed(1)}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;