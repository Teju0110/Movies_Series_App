import { Button, Tab, Tabs, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.css";
import apiKey from "../Config";
import axios from "axios";
import SingleContent from "../Components/SingleContent";
import CustomPagination from "../Components/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [searchText, setSearchText] = useState("");

  const fetchSearch = async () => {
    try {

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=${apiKey}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [page, type]);

  return (
    <div className="search">
      <div className="searchBar">
        <TextField
          variant="filled"
          label="Search"
          className="serachBox"
          style={{ flex: 1 }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginLeft: 20 }}
          onClick={fetchSearch}
        >
          <SearchIcon on/>
        </Button>
      </div>

      <div className="tabs">
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </div>

      <div>
        <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              type={type ? "tv" : "movie"}
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
    </div>
  );
};

export default Search;
