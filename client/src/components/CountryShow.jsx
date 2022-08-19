import React from 'react';
import { useSelector } from 'react-redux';
import Country from './Country';
import styles from '../StyleSheets/CountryShow.module.css'

export default function CountryShow() {
  const countries = useSelector(state => state.countriesShow.countries);
  const searchResult = useSelector(state => state.countriesShow.search);
  const searchStatus = useSelector(state=>state.countriesShow.searchStatus);
  
  return (
    <div className={styles.container} key='a'>
      {
        searchStatus==='success'
          ? 
          (searchResult.length>0
            ?searchResult.map(country=>(
              <Country data={country} key={country.id}/>
            ))
            :<h1>No se encontro ningun pais</h1>)
          : countries.map(country => (
            <Country data={country} key={country.id} />
          ))
      }
    </div>
  )
}
