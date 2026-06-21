function Favorites({ favorites, onSelect }) {

  if (favorites.length === 0) {
    return <p>No favorite songs yet</p>;
  }

  return (
    <div className="playlist">
      <h3>❤️ Favorites</h3>

      {favorites.map((song) => (
        <div
          key={song.id || song.trackId}
          className="playlist-item"
          onClick={() => onSelect(song)}
        >
          <div className="playlist-title">
            {song.title || song.trackName}
          </div>

          <small>
            {song.artist || song.artistName}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Favorites;