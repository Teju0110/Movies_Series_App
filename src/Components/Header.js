import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <span className='heading' onClick={()=>window.scroll(0,0)}>🎬 Movie Plaza 🎥</span>
    </div>
  )
}

export default Header