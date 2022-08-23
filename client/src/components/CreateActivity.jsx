import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import config from '../config/api';
import { addCharge, createActivity, getActivity } from '../store/activities';
import styles from '../StyleSheets/CreateActivity.module.css';
import ChargePage from './ChargePage';
import { getAllCountries } from '../store/countriesShow';
import ActivityCard from './ActivityCard';

export default function CreateActivity() {
  const dispatch = useDispatch();

  let [name, setName] = useState('');
  let [dif, setDif] = useState('');
  let [dura, setDura] = useState('');
  let [season, setSeason] = useState('');
  let [country, setCountry] = useState([]);

  const countriesShow = useSelector(state => state.countriesShow.countries).map(e => { return { value: e.id, label: e.name } });
  const chargeStatus = useSelector(state => state.activities.charge);
  const activities = useSelector(state => state.activities.activities);

  const handleChange = (e, cb) => {
    cb(e);
  }
  const handleName = (e) => {
    setName(e.target.value);
  }
  // const handleChange2 = (e) => {
  //   setDura(e);
  // }
  // const handleChange3 = (e) => {
  //   setSeason(e);
  // }
  // const handleChange4 = (selectedOption) => {
  //   setSelected(selectedOption);
  // } alert

  const disableSubmit = () => {
    if (name.length < 3 || !dif.value || !dura.value || !season.value || country.length === 0) return true;
    else return false;
  }
  const disableClear = () => {
    if (name.length > 0 || dif.value || dura.value || season.value || country.length > 0) return false;
    else return true;
  }

  const onClick = () => {
    setName('');
    setName('');
    setDif('');
    setDura('');
    setSeason('');
    setCountry('');
  }

  const onSubmit = e => {
    e.preventDefault();
    dispatch(getActivity());
    dispatch(
      createActivity({
        name: name,
        difficulty: dif.value,
        duration: dura.value,
        season: season.value,
        countries: country.map(e => e.value)
      })
    )
    dispatch(addCharge());
    onClick();
  }

  useEffect(() => {
    if (countriesShow.length === 0) {
      dispatch(getAllCountries())
      onClick();
    }
    else dispatch(getActivity());
  }, [])

  return (
    chargeStatus ? <div className={styles.charge}><ChargePage /></div> :
      <div className={styles.main}>
        <div className={styles.create}>
          <h1 className={styles.list}>CreateActivity</h1>
          <form className={styles.form} onSubmit={onSubmit} >

            <label className={styles.label} htmlFor='name' >Name: </label>
            <input type="text"
              className={styles.name}
              value={name} id='name'
              onChange={handleName}
              pattern='^[a-zA-Z ]{3,15}$'
              placeholder="Type an activity's name, min 3 letters"
            />

            <label className={styles.label}>Difficulty: </label>
            <Select
              value={dif}
              placeholder='Select activity difficulty'
              className={styles.diff}
              options={config.dificulty}
              onChange={(e) => handleChange(e, setDif)}
            />

            <label className={styles.label}>Duration: </label>
            <Select
              value={dura}
              placeholder='Select activity duration'
              className={styles.duration}
              options={config.duration}
              onChange={(e) => handleChange(e, setDura)}
            />

            <label className={styles.label}>Season: </label>
            <Select
              value={season}
              placeholder='Select activity season'
              className={styles.season}
              options={config.seasonsOptions}
              onChange={(e) => handleChange(e, setSeason)}
            />

            <label className={styles.label}>Countries: </label>
            <Select
              value={country}
              placeholder='Select countries where can practice this'
              className={styles.season}
              options={countriesShow}
              closeMenuOnSelect={false}
              isMulti
              onChange={(e) => handleChange(e, setCountry)}
            />
            <div className={styles.btns}>
              <button
              className={disableSubmit()?styles.block:styles.button}
              disabled={disableSubmit()}
              type="submit">Create</button>
              <button
              className={disableClear()?styles.block:styles.button}
              disabled={disableClear()}
              onClick={() => onClick()}>Clear</button>
            </div>

          </form>
        </div>
        <div className={styles.showAct}>
          <h1 className={styles.list}>List of Activities</h1>
          <div className={styles.countries}>
            {
              activities.length > 0
              &&
              activities.map(activity => {
                return (
                  <ActivityCard data={activity} />
                )
              }
              )
            }
          </div>
        </div>
      </div>
  )
}
