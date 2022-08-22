import React from 'react';
import { useSelector } from 'react-redux';
import Country from './Country';
import styles from '../StyleSheets/CountryShow.module.css'

export default function CountryShow() {
  const countries = useSelector(state => state.countriesShow.countries);
  const searchResult = useSelector(state => state.countriesShow.search);
  const searchStatus = useSelector(state => state.countriesShow.searchStatus);
  const filters = useSelector(state => state.countriesShow.filters);
  const filterError = useSelector(state => state.countriesShow.filter_not_found);

  return (
    <div className={styles.container}>
      {
        searchStatus === 'success'
          ?
          (searchResult.length > 0
            ? searchResult.map(country => (
              <Country data={country} key={country.id} />))
            : <h1 style={{ color: 'white' }}>Country not found</h1>)
          : (filters.length > 0
            ? filters.map(country => (
              <Country data={country} key={country.id} />))
            : (filterError ? (<h1 style={{ color: 'white' }}>Countries not found</h1>)
              :
              countries.map(country => (
                <Country data={country} key={country.id} />)))
          )
      }
    </div>
  )
}
