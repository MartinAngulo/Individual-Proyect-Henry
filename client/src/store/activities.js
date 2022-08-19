import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from '../config/api';
import axios from 'axios';

export const createActivity = createAsyncThunk('activities/create',async(activityData, thunkAPI)=>{
    const data = await axios.post(`${apiConfig.api_domain}/activities`, activityData);
    return data.data;
})

const activitiesSlice = createSlice({
    name: "activities",
    initialState: {
        status: 'not_loaded',
        data: []
    },
    reducers:{},
    extraReducers:{
        [createActivity.fulfilled]:(state, action)=>{
            state.status= 'success';
            state.data.push(action.payload);
        },
        [createActivity.rejected]:(state,action)=>{
            state.status = 'loaded_rejected';
        }
    }
});

export default activitiesSlice.reducer;