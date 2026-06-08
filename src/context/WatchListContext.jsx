import {
  createContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../Services/supabase";

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
      const {
        data,
        error,
      } = await supabase
        .from("watchlist")
        .select("*");

      if (error) {
        console.log(
          "Fetch Error:",
          error
        );

        return;
      }

      setWatchlist(
        data || []
      );
    };

  const addToWatchlist =
    async (movie) => {
      const {
        error,
      } = await supabase
        .from("watchlist")
        .insert([
          {
            id: movie.id,
            title:
              movie.title,
            poster_path:
              movie.poster_path,
            release_date:
              movie.release_date,
            vote_average:
              movie.vote_average,
          },
        ]);

      if (error) {
        console.log(
          "Insert Error:",
          error
        );

        return;
      }

      setWatchlist(
        (prev) => [
          ...prev,
          movie,
        ]
      );
    };

  const removeFromWatchlist =
    async (id) => {
      const {
        error,
      } = await supabase
        .from("watchlist")
        .delete()
        .eq("id", id);

      if (error) {
        console.log(
          "Delete Error:",
          error
        );

        return;
      }

      setWatchlist(
        (prev) =>
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