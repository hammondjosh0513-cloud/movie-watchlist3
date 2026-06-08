import { useEffect, useState } from "react";
import { getPopularMovies } from "../Services/movieApi";
import { searchMovies } from "../Services/movieApi";
import MovieCard from "../Components/MovieCard";

function Home() {
  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const handleSearch = async (
    e
  ) => {
    const value =
      e.target.value;

    setSearch(value);

    if (!value.trim()) {
      const data =
        await getPopularMovies();

      setMovies(data);

      return;
    }

    const results =
      await searchMovies(value);

    setMovies(results);
  };

  useEffect(() => {
    const fetchMovies =
      async () => {
        try {
          const data =
            await getPopularMovies();

          setMovies(data);
        } catch {
          setError(
            "Failed to load movies"
          );
        }

        setLoading(false);
      };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-600 px-6 py-4 rounded shadow">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Popular Movies
      </h1>

      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={
          handleSearch
        }
        className="border p-2 rounded mb-6 w-full"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map(
          (movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Home;