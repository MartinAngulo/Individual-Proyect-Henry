import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetShow, searchCountries } from '../store/countriesShow';
import styles from '../StyleSheets/SearchBar.module.css'


export default function SearchBar() {

  let [input, setInput] = useState('');
  const dispatch = useDispatch();
  const OnSubmit = (data) => {
    dispatch(
      searchCountries(data)
    )
    setInput('')
  }
  const onChange = (e) => {
    let input = e.target.value;
    setInput(input)
  }

  useEffect(() => {
    const OnSubmit = (data) => {
      dispatch(
        searchCountries(data)
      )
    }
    if (input.length > 0) OnSubmit(input);
    if (input === '') {
      dispatch(
        resetShow()
      );
    }
  }, [input, dispatch])

  return (
    <form onSubmit={() => OnSubmit(input)} className={styles.cont}>
      <input
        className={styles.input}
        type="text"
        name='name'
        onChange={onChange}
        value={input}
        pattern='^[a-zA-Z ]*$'
        placeholder='Type a country name to search' />
      {input.length > 0 &&
        <button
        className={styles.clear}
        onClick={()=>{setInput('')}}
        ></button>}
      {/* {input.length>0&&<input type="submit" value="Search" />} */}
    </form>
  )
}
