import { Chip } from "@material-ui/core";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import axios from "axios";
import React, { useEffect } from "react";
import apiKey from "../Config";

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  
    const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove =(genre)=>{
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  }

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`
    );

    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div className="genres">
      {selectedGenres.map((genre) => (
        <Chip
          label={genre.name}
          style={{
            fontWeight: 600,
            margin: 5,
            cursor: "pointer",
          }}
          clickable
          color="primary"
          key={genre.id}
          onDelete={()=>handleRemove(genre)}
        />
      ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{
              fontWeight: 600,
              margin: 5,
              cursor: "pointer",
            }}
            clickable
            key={genre.id}
            onClick={()=>handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
