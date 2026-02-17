import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Papa from "papaparse"

export const getDataSet = createAsyncThunk('communities/fetchData', async (args, thunkAPI) => {
  try{
    const response = await fetch('data/communities.csv');
    const responseText = await response.text();
    const responseJson = Papa.parse(responseText,{header:true, dynamicTyping:true});
    return responseJson.data.map((item,i)=>({...item,index:i}));
  }catch(error){
    console.error("Error loading data:", error);
    return thunkAPI.rejectWithValue(error)
  }
})

export const dataSetSlice = createSlice({
  name: 'dataSet',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDataSet.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(getDataSet.rejected, (state, action) => {
      console.error("Data loading failed:", action.payload);
    })
  }
})

export default dataSetSlice.reducer