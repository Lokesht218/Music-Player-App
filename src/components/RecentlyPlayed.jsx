function RecentlyPlayed({
  recentSongs,
  onSelect
}) {
  return (
    <div className="recently-played">

      <h3>🕒 Recently Played</h3>

      {recentSongs.length === 0 ? (
        <p>No recent songs</p>
      ) : (
        recentSongs.map((song, index) => (
          <div
            key={song.trackId || song.id || index}
            className="recent-item"
            onClick={() => onSelect(song)}
          >
            🎵 {song.trackName || song.title}

            <br />

            <small>
              {song.artistName || song.artist}
            </small>
          </div>
        ))
      )}

    </div>
  );
}

export default RecentlyPlayed;