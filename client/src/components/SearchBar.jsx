import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useForm } from 'react-hook-form';
import { searchCountries } from '../store/countriesShow';


export default function SearchBar() {
  
  let [input, setInput] = useState('');
  const dispatch = useDispatch();
  let { register, handleSubmit } = useForm();
  const OnSubmit = (data)=>{
    dispatch(
      searchCountries(data)
    )
    setInput('')
  }
  const onChange = (e)=>{
    let input = e.target.value;
    setInput(input)
  }
  
  return (
    <form onSubmit={handleSubmit(OnSubmit)}>
      <input
      type="text"
      {...register('name')}
      onChange={onChange}
      value = {input}
      pattern='^[a-zA-Z ]*$'
      placeholder='Country name to search'/>
      {input.length>0&&<input type="submit" value="Search" />}
    </form>
  )
}
