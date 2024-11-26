import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();

  const navigateCreate=()=>{
    navigate("/create")
  }
  return (
    <div>
        <button onClick={()=>{navigateCreate()}} style={{background:'green',color:'wheat'}}>CRUD</button>
    </div>
  )
}

export default Home;