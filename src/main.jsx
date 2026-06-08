import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import WatchlistProvider from "./context/WatchlistContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <WatchlistProvider>
    <App />
  </WatchlistProvider>
);