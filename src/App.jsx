import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Watchlist from "./Pages/Watchlist";
import MovieDetails from "./Pages/MovieDetails";
import WatchlistProvider from "./context/WatchListContext";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;