import React, { ReactNode } from "react";
import axios from "../api/axios";
import "./Row.css";
import YouTube from "react-youtube";

export interface IRowProps {
  title: string;
  fetchUrl: string;
  isLargeRow: boolean;
}

const movieTrailer = require("movie-trailer");
const baseURL = "https://image.tmdb.org/t/p/original/";
const Row: React.FC<IRowProps> = (props) => {
  const [movies, setMovies] = React.useState([]);
  const [trailerUrl, setTrailerUrl] = React.useState("");

  React.useEffect(() => {
    // if [] run once
    fetchData(props.fetchUrl).then((result) => {
      setMovies(result.data.results);
    });
  }, [props.fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  function handleClick(movie: any): void {
    console.log(movie.name);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url: URL) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v") ?? "");
        })
        .catch((error: any) => console.log(error));
    }
  }

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row-posters">
        {movies.map((movie: any): ReactNode => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row-poster ${props.isLargeRow && "row-poster-large"}`}
              src={`${baseURL}${
                props.isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

const fetchData = async (fetchUrl: string) => {
  const response = await axios.get(fetchUrl);

  return response;
};

export default Row;
