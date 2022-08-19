import React from 'react';
import styles from '../StyleSheets/Country.module.css'
import { Link } from 'react-router-dom';

export default function Country({data}) {
    const { id, name, continent, imgFlag} = data;
  return (
    <div className={styles.container}>
        <Link to={`/detail/${id}`}>{name}</Link>
        <h4>{continent}</h4>
        <img src={imgFlag} alt='Flag'/>
    </div>
  )
}


