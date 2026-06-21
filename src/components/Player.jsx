import { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaRandom,
  FaRedo
} from "react-icons/fa";

function Player({
  currentSong,
  audioRef,
  onNext,
  onPrevious,
  onFavorite,
  shuffle,
  repeat,
  setShuffle,
  setRepeat
}) 

{
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.pause();
      audioRef.current.load();

      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [currentSong, audioRef]);

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleProgress = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const percent =
      (audio.currentTime / audio.duration) * 100;

    setProgress(percent || 0);
  };

  const changeProgress = (e) => {
    const audio = audioRef.current;

    if (!audio) return;

    const value = e.target.value;

    audio.currentTime =
      (value / 100) * audio.duration;

    setProgress(value);
  };

  const changeVolume = (e) => {
    const value = e.target.value;

    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  return (
    <div className="player-card">

      <img
        className={`album-art ${
          playing ? "rotating" : ""
        }`}
        src={
          currentSong?.image ||
          currentSong?.artworkUrl100?.replace(
            "100x100",
            "600x600"
          ) ||
          "https://wallpaperaccess.com/full/1891198.jpg"
        }
        alt="Album Art"
      />

      <h2>
        {currentSong?.title ||
          currentSong?.trackName ||
          "No Song Selected"}
      </h2>

      <p>
        {currentSong?.artist ||
          currentSong?.artistName ||
          "Select a song"}
      </p>

      <div className="controls">

        <button
          onClick={() =>
          setShuffle(!shuffle)
        }
        style={{
          background: shuffle ? "#1db954" : ""
        }}
        >
          🔀
        </button>

        <button
          onClick={onPrevious}
          disabled={!currentSong}
        >
          <FaBackward />
        </button>

        <button
          className="play-btn"
          onClick={togglePlay}
          disabled={!currentSong}
        >
          {playing ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={() => {
            console.log("NEXT CLICKED");
            onNext();
          }}
        >
          <FaForward />
        </button>

        <button
          onClick={() =>
            setRepeat(!repeat)
          }
          style={{
            background: repeat ? "#1db954" : ""
          }}
        >
          🔁
        </button>

        <button
          className="fav-player"
          onClick={() => {
            if (currentSong) {
              onFavorite(currentSong);
          }
        }}
        >
          ❤️
        </button>

      </div>

      <audio
        ref={audioRef}
        controls
        src={
          currentSong
            ? currentSong.audio ||
              currentSong.previewUrl
            : ""
        }
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {

          if (repeat) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            return;
          }

            onNext();
        }}
      />
    </div>
  );
}

export default Player;