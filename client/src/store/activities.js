import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from '../config/api';

const activitiesSlice = createSlice({
    name: "activities",
    initialState: {
        status: 'not_loaded',
        data: []
    },
    
});

export default activitiesSlice.reducer;