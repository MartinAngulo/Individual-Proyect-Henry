import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import config from '../config/api'
import styles from '../StyleSheets/Filters.module.css';
import { addFilter, filter, filterSeason, resetFilters } from '../store/countriesShow';

export default function Filters() {

  const dispatch = useDispatch();
  
  const countries = useSelector(state => state.countriesShow.countries)
  // const filters = useSelector(state => state.countriesShow.filters)
  const [values, setValues] = useState({
    name: '',
    population: '',
    area: '',
    continent: '',
    season: ''
  })

  const onClear = () => {
    setValues({
      name: '',
      population: '',
      area: '',
      continent: '',
      season: ''
    })
    dispatch(resetFilters());
  };

  const handleChange = async (e, prop) => {

    setValues({ ...values, [prop]: e });

    if (['name', 'population', 'area'].includes(prop)) {
      return dispatch(filter({ order: e.value, para: prop }))
    }
    if(prop==='continent'){
      const filters = config.contFilter(countries, e.value)
      return dispatch(addFilter(filters));
    }
    if(prop==='season'){
      return dispatch(filterSeason(e.value));
    }

  }

  return (
    <div className={styles.cont}>
      <Select
        value={values.name}
        className={styles.select}
        placeholder='Filter by Name'
        options={config.namefilter}
        onChange={(e) => handleChange(e, 'name')}
      />
      <Select
        value={values.population}
        className={styles.select}
        placeholder='Filter by population'
        options={config.populationFilter}
        isDisabled={false}
        onChange={(e) => handleChange(e, 'population')}
      />
      <Select
        value={values.area}
        className={styles.select}
        placeholder='Filter by Area'
        options={config.sizeFilter}
        onChange={(e) => handleChange(e, 'area')}
      />
      <Select
        value={values.continent}
        className={styles.select}
        placeholder='Filter by continent'
        options={config.continentFilter}
        onChange={(e) => handleChange(e, 'continent')}
      />
      <Select
        value={values.season}
        className={styles.select}
        placeholder='Filter by Activity'
        options={config.seasonsOptions}
        onChange={(e) => handleChange(e, 'season')}
      />
      <button className={styles.clear} onClick={onClear}>Clear</button>
    </div>
  )
}
