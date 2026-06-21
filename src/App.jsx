import { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import Favorites from "./components/Favorites";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const audioRef = useRef(null);

  /* SEARCH ONLINE SONGS */

  const searchSongs = async (query) => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          query
        )}&media=music&limit=20`
      );

      const data = await response.json();

      if (data.results) {
        setSongs(data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* PLAY SONG */

  const playSong = (song) => {
    const index = songs.findIndex(
      (item) =>
        (item.id || item.trackId) ===
        (song.id || song.trackId)
    );

    if (index !== -1) {
      setCurrentIndex(index);
    }

    setCurrentSong(song);
  };

  /* NEXT SONG */

  const nextSong = () => {
    if (!songs.length) return;

    if(shuffle) {
      const randomIndex = Math.floor(
        Math.random() * songs.length);

      setCurrentIndex(randomIndex);
      setCurrentSong(songs[randomIndex]);
    } else {
      const next = 
      (currentIndex + 1) % songs.length;

    setCurrentIndex(next);
    setCurrentSong(songs[next]);
    }
  };

  /* PREVIOUS SONG */
  const previousSong = () => {
    if (!songs.length) return;

    const prev =
      (currentIndex - 1 + songs.length) %
      songs.length;

    setCurrentIndex(prev);
    setCurrentSong(songs[prev]);
  };

  /* ADD TO PLAYLIST */

  const addToPlaylist = (song) => {
    const exists = playlist.find(
      (item) =>
        (item.id || item.trackId) ===
        (song.id || song.trackId)
    );

    if (!exists) {
      setPlaylist((prev) => [...prev, song]);
    }
  };

  /* ADD TO FAVORITES */
  /* TOGGLE FAVORITES */
const addFavorite = (song) => {
  if (!song) return;

  const songId = song.id || song.trackId;

  setFavorites((prevFavorites) => {
    const exists = prevFavorites.some(
      (item) =>
        (item.id || item.trackId) === songId
    );

    if (exists) {
      return prevFavorites.filter(
        (item) =>
          (item.id || item.trackId) !== songId
      );
    }

    return [...prevFavorites, song];
  });
};

  return (
    <div className={`app ${theme}`}>

      {/* SIDEBAR */}

      <aside className="sidebar">

        <button
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
        >
          {theme === "dark"
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        <h2>🎵Music-Player</h2>

        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          🏠 Home
        </button>

        <button
          className={page === "favorites" ? "active" : ""}
          onClick={() => setPage("favorites")}
        >
          ❤️ Favorites
        </button>

        <button
          className={page === "library" ? "active" : ""}
          onClick={() => setPage("library")}
        >
          📁 Library
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        <SearchBar onSearch={searchSongs} />

        {/* LOCAL SONG PICKER */}
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);

            const localFiles = files.map(
              (file, index) => ({
                id: index,
                title: file.name,
                artist: "Local File",
                audio: URL.createObjectURL(file),
                image: "/images/album-cover.jpg",
              })
            );

            setSongs(localFiles);
          }}
        />

        <Player
          currentSong={currentSong}
          audioRef={audioRef}
          onNext={nextSong}
          onPrevious={previousSong}
          onFavorite={() => addFavorite(currentSong)}
          shuffle={shuffle}
          repeat={repeat}
          setShuffle={setShuffle}
          setRepeat={setRepeat}
        />

        {page === "home" && (
          <SongList
            songs={songs}
            onSelect={(song) => {
              playSong(song);
              addToPlaylist(song);
            }}
            onFavorite={addFavorite}
          />
        )}

        {page === "favorites" && (
          <Favorites
            favorites={favorites}
            onSelect={playSong}
          />
        )}

        {page === "library" && (
          <Playlist
            playlist={playlist}
            onSelect={playSong}
          />
        )}
      </main>

      {/* RIGHT PANEL */}
      {page === "home" && (
        <aside className="playlist-panel">
          <Playlist
            playlist={playlist}
            onSelect={playSong}
          />

          <Favorites
            favorites={favorites}
            onSelect={playSong}
          />
        </aside>
      )}
    </div>
  );
}

export default App;