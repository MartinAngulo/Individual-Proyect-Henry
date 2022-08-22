import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetFilters, resetShow } from '../store/countriesShow';
import SearchBar from './SearchBar';
import styles from '../StyleSheets/Nav.module.css';
import Filters from './Filters'

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (path) => {
    dispatch(
      resetShow()
    )
    dispatch(
      resetFilters()
    )
    navigate(`/${path}`);
  }

  return (
    <div className={styles.cont}>
      <div className={styles.cont2}>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
        <h3
        className={styles.h3}
        onClick={(e)=>handleClick('home')}>HOME</h3>
        <h3
        className={styles.h3}
        onClick={(e)=>handleClick('create')}>ACTIVITY CREATOR</h3>
      </div>
      <Filters />
    </div>
  )
}
