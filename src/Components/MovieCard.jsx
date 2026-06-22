import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-white shadow-lg rounded p-3 hover:scale-105 transition duration-300 h-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[350px] object-cover rounded"
        />

       <h2 className="font-bold text-lg mt-2">
  {movie.title}
</h2>

<p className="text-gray-600 text-sm">
  Release: {movie.release_date}
</p>

<p className="text-yellow-500 font-semibold">
  ⭐ {movie.vote_average?.toFixed(1)} / 10
</p>

<p className="text-gray-700 text-sm mt-2">
  {movie.overview
    ? movie.overview.slice(0, 100) + "..."
    : "No description available"}
</p>
      </div>
    </Link>
  );
}

export default MovieCard;