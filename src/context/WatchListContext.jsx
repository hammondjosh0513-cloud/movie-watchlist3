import {
  createContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

export const WatchlistContext =
  createContext();

function WatchlistProvider({
  children,
}) {
  const [watchlist, setWatchlist] =
    useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist =
    async () => {
      const { data, error } =
        await supabase
          .from("watchlist")
          .select("*");

      if (error) return;

      setWatchlist(data || []);
    };

  const addToWatchlist =
    async (movie) => {
      await supabase
        .from("watchlist")
        .insert([
          {
            id: movie.id,
            title: movie.title,
            poster_path:
              movie.poster_path,
            release_date:
              movie.release_date,
            vote_average:
              movie.vote_average,
          },
        ]);

      setWatchlist((prev) => [
        ...prev,
        movie,
      ]);
    };

  const removeFromWatchlist =
    async (id) => {
      await supabase
        .from("watchlist")
        .delete()
        .eq("id", id);

      setWatchlist((prev) =>
        prev.filter(
          (movie) =>
            Number(movie.id) !==
            Number(id)
        )
      );
    };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistProvider;