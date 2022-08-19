import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { resetShow } from '../store/countriesShow';
import SearchBar from './SearchBar';

export default function Nav() {
  const dispatch = useDispatch();
  const location = useLocation();
  const handleClick = () => {
    dispatch(
      resetShow()
    )
  }
  return (
    <div>
      <h1>AQUI VA LA NAVBAR</h1>
      <div>
        <Link to={'/home'} onClick={handleClick}>HOME</Link>
        {
          location.pathname === '/home'&&  
          <><SearchBar />
          <Link to={'/create'}>Activity Creator</Link></>
        }
      </div>
    </div>
  )
}
