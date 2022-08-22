import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from '../config/api';
import axios from 'axios';

export const getAllCountries = createAsyncThunk('countries/getAll', async (thunkAPI) => {
    const countries = await axios.get(`${apiConfig.api_domain}/countries`);
    return countries.data;
});

export const searchCountries = createAsyncThunk('countries/search', async (countriesData, thunkAPI) => {
    const countries = await axios.get(`${apiConfig.api_domain}/countries?name=${countriesData}`);
    return countries.data;
});

export const countryDetail = createAsyncThunk('countries/detail', async (countryId, thunkAPI) => {
    const country = await axios.get(`${apiConfig.api_domain}/countries/${countryId}`);
    return country.data;
});

export const filter = createAsyncThunk('countries/filter', async (info, thunkAPI) => {
    const country = await axios.get(`${apiConfig.api_domain}/countries/order/${info.order}?para=${info.para}`);
    return country.data;
});

export const filterSeason = createAsyncThunk('countries/filter', async (season, thunkAPI) => {
    const country = await axios.get(`${apiConfig.api_domain}/countries/order/season/${season}`);
    return country.data;
});

const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        searchStatus: 'not_loaded',
        detailStatus: 'not_loaded',
        countries: [],
        search: [],
        detail: [],
        filters: [],
        filter_not_found: false,
    },
    reducers: {
        addFilter(state, action) {
            state.filters = action.payload;
        },
        resetFilters(state) {
            state.filters = [];
            state.filter_not_found=false;
        },
        resetShow(state) {
            state.searchStatus = 'not_loaded'
        }
    },
    extraReducers: {
        [getAllCountries.fulfilled]: (state, action) => {
            state.countries = action.payload;
        },
        [searchCountries.fulfilled]: (state, action) => {
            state.searchStatus = 'success';
            state.search = action.payload;
        },
        [countryDetail.fulfilled]: (state, action) => {
            state.detailStatus = 'success';
            state.detail = action.payload;
        },
        [filter.fulfilled]: (state, action) => {
            
            state.filters = action.payload;
        },
        [filterSeason.fulfilled]: (state, action) => {
            if(action.payload.length>0){
                state.filter_not_found=false;
                state.filters = action.payload;
            }
            else state.filter_not_found=true;
        },
    }
});

export const { addFilter, resetShow, resetFilters } = countriesSlice.actions;
export default countriesSlice.reducer;