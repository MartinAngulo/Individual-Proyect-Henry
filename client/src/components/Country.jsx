import React from 'react';
import styles from '../StyleSheets/Country.module.css'
import { useNavigate } from 'react-router-dom';
// import ScrollReveal from 'scrollreveal';
import { useRef } from 'react';
// import { useEffect } from 'react';

export default function Country({ data }) {
  const { id, name, continent, imgFlag } = data;
  const navigate = useNavigate();
  const cardRef = useRef();

  const redirect = ()=>{
    navigate(`/detail/${id}`);
  }

  // useEffect(()=>{
  //   const config = {
  //     origin: 'bottom',
  //     duration: 1500,
  //     delay: 150,
  //     distance: '500px',
  //     scale: 1,
  //     easing: 'ease',
  //   }
    
  //   ScrollReveal().reveal(cardRef.current,config);
  // },[])
 

  return (
    <div className={styles.container} onClick={redirect} ref={cardRef}>
      <img src={imgFlag} className={styles.img} alt='Flag' />
      <div className={styles.container2}>
        <h1 className={styles.h1}>{name}
          {/* <Link to={`/detail/${id}`}></Link> */}
          </h1>
        <h4 className={styles.h4}>from:<br/>{continent}</h4>
      </div>
    </div>
  )
}


