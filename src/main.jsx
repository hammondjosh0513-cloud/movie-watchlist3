import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import WatchListContext from "./context/WatchListContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <WatchlistProvider>
    <App />
  </WatchlistProvider>
);