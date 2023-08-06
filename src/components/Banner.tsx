import axios from "../api/axios";
import React from "react";
import requests from "../api/requests";
import "./Banner.css";

interface Movie {
  backdrop_path: string;
  title: string;
  name: string;
  original_name: string;
  overview: string;
}

const Banner: React.FC = () => {
  const [movie, setMovie] = React.useState<Movie>();

  React.useEffect(() => {
    fetchData().then((result) => {
      const movieIndex = Math.floor(
        Math.random() * (result.data.results.length - 1)
      );
      console.log(movieIndex);
      setMovie(result.data.results[movieIndex]);
    });
  }, []);

  console.log(JSON.stringify(movie?.backdrop_path));

  function truncateWithEllipsis(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.substring(0, maxLength - 3);
      const lastSpaceIndex = truncatedText.lastIndexOf(" ");

      if (lastSpaceIndex !== -1) {
        return truncatedText.substring(0, lastSpaceIndex) + "...";
      } else {
        return truncatedText + "...";
      }
    }
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url(
          https://image.tmdb.org/t/p/original${movie?.backdrop_path}
        )`,
      }}
    >
      <div className="banner-contents">
        {/*title */}
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/*div 2 buttons*/}
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        {/*description*/}
        <h1 className="banner-description">
          {truncateWithEllipsis(movie ? movie.overview : "", 250)}
        </h1>
      </div>
      <div className="banner-fadeBottom"></div>
    </header>
  );
};

const fetchData = async () => {
  const response = await axios.get(requests.fetchNetflixOriginals);

  return response;
};

export default Banner;
