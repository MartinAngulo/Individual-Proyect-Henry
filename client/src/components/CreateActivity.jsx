import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import config from '../config/api';
import { createActivity } from '../store/activities';

export default function CreateActivity() {
  const dispatch = useDispatch();

  let [name, setName] = useState('');
  let [dif, setDif] = useState(1);
  let [dura, setDura] = useState(1);
  let [season, setSeason] = useState('');
  let [selected, setSelected] = useState([]);
  const countries = useSelector(state => state.countriesShow.countries).map(e => { return { value: e.id, label: e.name } })

  const handleChange = (e) => {
    setDif(e);
  }
  const handleChange2 = (e) => {
    setDura(e);
  }
  const handleChange3 = (e) => {
    setSeason(e);
  }
  const handleChange4 = (selectedOption) => {
    setSelected(selectedOption);
  }
  const handleName = (e) => {
    setName(e.target.value);
  }

  const inputsValidation = () => {
    if(name.length<3||!dif.value||!dura.value||!season.value||selected.length===0)return false;
    else return true;
  }

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      createActivity({
        name: name,
        difficulty: dif.value,
        duration: dura.value,
        season: season.value,
        countries: selected.map(e => e.value)
      })
    )
  }

  return (
    <div>
      <h1>CreateActivity</h1>
      <form onSubmit={onSubmit} >
        <input type="text" name={name} onChange={handleName} pattern='^[a-zA-Z ]{3,15}$' placeholder='Name Activity(3 - 15 letters)' /><br />
        <label>Difficulty: </label>
        <Select
          options={config.OneToFiveOptions}
          onChange={handleChange}
        />
        <br />
        <label>Duration: </label>
        <Select
          options={config.OneToFiveOptions}
          onChange={handleChange2}
        />
        <br />
        <label>Season: </label>
        <Select
          options={config.seasonsOptions}
          onChange={handleChange3}
        />
        <br />
        <label>Countries: </label>
        <Select
          options={countries}
          closeMenuOnSelect={false}
          isMulti
          onChange={handleChange4}
        />
        {inputsValidation()&&<input type="submit" value="Create" />}
      </form>
    </div>
  )
}
