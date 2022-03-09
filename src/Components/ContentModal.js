import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import apiKey from "../Config";
import { img_500, unavailable, unavailableLandscape } from "../Config";
import axios from "axios";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Button } from "@material-ui/core";
import './ContentModal.css'
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height:"90%",
    marginTop:"20px",
    margin:"10px",
  },
  paper: {
    width: "98%",
    height: "95%",
    backgroundColor: "white",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, type, id }) {
  const [content, setContent] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <div>
      <div type="button" onClick={handleOpen} className="singleContent">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {content && (
              <div className={classes.paper}>
                <div className="ContentModal">
                  <img
                    src={
                      content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
                    }
                    alt={content.name || content.title}
                    className="ContentModal__portrait"
                  />
                  <img
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="ContentModal__landscape"
                  />
                  <div className="ContentModal__about">
                    <span className="ContentModal__title">
                      {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                      )
                    </span>
                    {content.tagline && (
                      <i className="tagline">{content.tagline} </i>
                    )}

                    <span className="ContentModal__description">
                      {content.overview}
                    </span>

                    <div><Carousel id={id} type={type} /></div>

                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      style={{backgroundColor:"red", color:"white"}}
                      target="__blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch the Trailer
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
