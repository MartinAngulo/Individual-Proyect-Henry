import { createSlice } from "@reduxjs/toolkit";



const paginadoReducer = createSlice({
    name: "paginado",
    initialState: {
        countries: [],
        previusPage:0,
        currentPage:1,
        nextPage:2,
    },
    reducers:{
        resetPage: (state)=>{

        },
        nextPage: (state)=>{

        }
    }
});

export default paginadoReducer.reducer;