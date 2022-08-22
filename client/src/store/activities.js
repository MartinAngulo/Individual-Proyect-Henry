import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from '../config/api';
import axios from 'axios';

export const createActivity = createAsyncThunk('activities/create', async (activityData, thunkAPI) => {
    const data = await axios.post(`${apiConfig.api_domain}/activities`, activityData);
    return data.data;
})

export const getActivity = createAsyncThunk('activities/getAll', async ( thunkAPI) => {
    const data = await axios.get(`${apiConfig.api_domain}/activities`);
    return data.data;
})

const activitiesSlice = createSlice({
    name: "activities",
    initialState: {
        status: 'not_loaded',
        data: [],
        charge: false,
        activities: []
    },
    reducers: {
        addCharge: (state) => {
            state.charge = true;
        },
        resetCharge: (state) => {
            state.charge = false
        }
    },
    extraReducers: {
        [createActivity.fulfilled]: (state, action) => {
            state.status = 'success';
            state.data= action.payload;
        },
        [createActivity.rejected]: (state, action) => {
            state.status = 'loaded_rejected';
        },
        [getActivity.fulfilled]: (state, action) => {
            state.activities= action.payload;
        },
        [getActivity.rejected]: (state, action) => {
            state.status = 'loaded_rejected';
        }
    }
});

export const {addCharge, resetCharge} = activitiesSlice.actions;

export default activitiesSlice.reducer;