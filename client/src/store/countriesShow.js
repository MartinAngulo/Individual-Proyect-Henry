import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from '../config/api';
import axios from 'axios';

export const getAllCountries = createAsyncThunk('countries/getAll',async(thunkAPI)=>{
    const countries = await axios.get(`${apiConfig.api_domain}/countries`);
    return countries.data;
});

export const searchCountries = createAsyncThunk('countries/search',async(countriesData, thunkAPI)=>{
    const countries = await axios.get(`${apiConfig.api_domain}/countries?name=${countriesData.name}`);
    return countries.data;
});

export const countryDetail = createAsyncThunk('countries/detail',async(countryId, thunkAPI)=>{
    const country = await axios.get(`${apiConfig.api_domain}/countries/${countryId}`);
    return country.data;
})

const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        searchStatus: 'not_loaded',
        detailStatus: 'not_loaded',
        countries: [],
        search: [],
        detail:[],
    },
    reducers:{
        resetShow(state){
            state.searchStatus='not_loaded'
        }
    },
    extraReducers:{
        [getAllCountries.fulfilled]:(state, action)=>{
            state.countries = action.payload;
        },
        [searchCountries.fulfilled]:(state, action)=>{
            state.searchStatus= 'success';
            state.search = action.payload;
        },
        [countryDetail.fulfilled]:(state, action)=>{
            state.detailStatus= 'success';
            state.detail = action.payload;
        },
    }
});

export const {resetShow}= countriesSlice.actions;
export default countriesSlice.reducer;