import { Badge } from "@material-ui/core";
import React from "react";
import { img_300, unavailable } from "../Config";
import ContentModal from "./ContentModal";
import './SingleContent.css'

const SingleContent = ({ id, poster, title, date, type, rating }) => {
  return (
    <ContentModal type={type} id={id}>
        <Badge badgeContent={rating} color={rating>6 ?"primary":"secondary"}/>
      <img src={poster ? `${img_300}/${poster}` : unavailable} />
      <b className="title">{title}</b>
      <div className="subTitle">
        <span className="type">{type === "tv" ? "TV Series" : "Movies"}</span>
        <span className="date">{date}</span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
