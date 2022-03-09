import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiKey from '../Config'
import SingleContent from '../Components/SingleContent'
import './Trending.css'
import CustomPagination from '../Components/CustomPagination'

const Trending = () => {
  const[page,setPage]=useState(1)
  const[content,setContent]=useState([])

  const fetchTrending= async ()=>{
    const {data}= await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`
    )
    setContent(data.results)
  
  }

  useEffect(() => {
    fetchTrending()
  }, [page])
  

  return (
    <div>
       <div className='trending'>
    {content && content.map((c)=> (<SingleContent key={c.id} 
    id={c.id} 
    title={c.title || c.name} 
    poster={c.poster_path}
    date={c.release_date || c.first_air_date} 
    type={c.media_type}
    rating={c.vote_average}
    />)) } 
    
    </div>
    <div>
    <CustomPagination setPage={setPage}/> 
    </div>
   
    </div>
   
  )
}

export default Trending