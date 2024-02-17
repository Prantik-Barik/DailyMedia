import React from 'react'
import { Link } from 'react-router-dom'
import HoverUnderline from './HoverUnderline'
import '../App.css'

function Logo({width = '100px'}) {
    return (
      <HoverUnderline>
        <Link to="/" className = "font-bold text-3xl font-protest_font">DailyMedia</Link>
      </HoverUnderline>
      
    )
  }

export default Logo