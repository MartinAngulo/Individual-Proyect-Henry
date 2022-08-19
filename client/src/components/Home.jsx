import React from 'react';
import CountryShow from './CountryShow';
import Filters from './Filters'
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function Home() {
    const countries = useSelector(state => state.countriesShow.countries);
    return (
        countries.length === 0
            ?   <Navigate to={'/'} />
            : <div>
                <Filters />
                <CountryShow />
            </div>
    )
}
