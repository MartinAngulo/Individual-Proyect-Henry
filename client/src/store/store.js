import { configureStore, combineReducers } from "@reduxjs/toolkit";
import activitiesReducer from "./activities";


const reducer = combineReducers({
    activities: activitiesReducer,
    
})

export const store = configureStore({
    reducer: reducer
})