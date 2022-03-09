import axios from "axios";
import React, { useState, useEffect } from "react";
import apiKey from "../Config";
import SingleContent from "../Components/SingleContent";
import CustomPagination from "../Components/CustomPagination";
import Genres from "../Components/Genres";
import './Series.css'
import useGenre from "../Hooks/useGenre";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreURL=useGenre(selectedGenres)

  const   fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchSeries();
  }, [page,genreURL]);

  return (
    <div className="movies">
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />

      <div className="trending" style={{marginTop:10}}>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              title={c.title || c.name}
              poster={c.poster_path}
              date={c.release_date || c.first_air_date}
              type="tv"
              rating={c.vote_average}
            />
          ))}
      </div>
      <div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </div>
  );
}

export default Series