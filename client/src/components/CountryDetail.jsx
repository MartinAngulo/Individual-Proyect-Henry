import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { countryDetail } from '../store/countriesShow';

export default function CountryDetail() {
  const { countryId } = useParams();
  const dispatch = useDispatch();
  const country = useSelector(state=>state.countriesShow.detail);
  const detailStatus = useSelector(state=>state.countriesShow.detailStatus);
  useEffect(()=>{
    dispatch(
      countryDetail(countryId)
    )
  },[countryId, dispatch])

  return detailStatus==='success'&&(
    <div>
      <h1>{country.name} DETAILS</h1>
      <p>CONTINENT: {country.continent}</p>
      <p>CAPITAL: {country.capital}</p>
      <p>SUBREGION: {country.subregion}</p>
      <p>AREA: {country.area}</p>
      <p>POPULATION: {country.population}</p>
      <div>
        <p>Turis Activitites:</p>
        {country.TurisActivities.length>0
        &&country.TurisActivities.map(actv=>(
          <p>{actv.name}</p>
        ))
        }
      </div>
    </div>
  )
}

/* {
  "id": "PER",
  "name": "PERU",
  "imgFlag": "https://flagcdn.com/w320/pe.png",
  "continent": "Americas",
  "capital": "Lima",
  "subregion": "South America",
  "area": 1285216,
  "population": 32971846,
  "TurisActivities": []
} */
