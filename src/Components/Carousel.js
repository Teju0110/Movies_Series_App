import { ViewCarousel } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import apiKey, { img_300, noPicture } from '../Config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({type,id}) => {
    const [credits, setCredits] = useState([]);

    const handleDragStart=(e)=>{
        e.preventDefault();
    }
    const items=credits?.map((c)=>(
        <div className='carousel'>
            <img 
            src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
            alt={c.name}
            onDragStart={handleDragStart}
            className="carousel_img"/>
            <b className='carousel_name'>{c.name}</b>

        </div>
    ));

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}&language=en-US`
        );
        setCredits(data.cast);
        console.log(data);
      };
    
      useEffect(() => {
        fetchCredits();
      }, []);

  return (
    <AliceCarousel mouseTracking
    autoPlay
    responsive={responsive} items={items}
    infinite
    disableButtonsControls
    disableDotsControls />
  );
}



export default Carousel;