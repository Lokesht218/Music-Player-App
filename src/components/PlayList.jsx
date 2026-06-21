function Playlist({ playlist, onSelect }) {

  if (playlist.length === 0) {
    return <p>No songs added</p>;
  }

  return (
    <div className="playlist">
      <h3>📃 Playlist</h3>

      {playlist.map((song) => (
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

export default Playlist;