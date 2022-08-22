import { configureStore, combineReducers } from "@reduxjs/toolkit";
import activitiesReducer from "./activities";
import countriesReducer from './countriesShow';
import paginadoReducer from './paginado';


const reducer = combineReducers({
    activities: activitiesReducer,
    countriesShow: countriesReducer,
    paginado: paginadoReducer,
})

export const store = configureStore({
    reducer: reducer
})