function SongList({ songs, onSelect, onFavorite }) {
  return (
    <div className="song-list">
      {songs.map((song) => (
        <div
          key={song.trackId || song.id}
          className="song-item"
        >
          <div
            className="song-info"
            onClick={() => onSelect(song)}
          >
            <h4>
              🎵 {song.trackName || song.title}
            </h4>

            <p>
              {song.artistName || song.artist}
            </p>
          </div>

          <button
            className="fav-btn"
            onClick={() => onFavorite(song)}
          >
            ❤️
          </button>
        </div>
      ))}
    </div>
  );
}

export default SongList;