import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Papa from "papaparse"

// get the data in asyncThunk
export const getD3TestData = createAsyncThunk('communities/fetchD3TestData', async (args, thunkAPI) => {
  try{
    const response = await fetch('data/D3TestData.json');
    const responseJSON = await response.json();

    return responseJSON;

  }catch(error){
    console.error("error catched in asyncThunk" + error);
    return thunkAPI.rejectWithValue(error)
  }
})

export const getDataSet = createAsyncThunk('communities/fetchData', async (args, thunkAPI) => {
  try{
    const responseLinks = await fetch('data/email-Eu-core.txt');
    const responseLinksText = await responseLinks.text();
    console.log("loaded file for links, parse with Papa library ");
    const responseLinksJson = Papa.parse(responseLinksText,{header:false, delimiter:" ", dynamicTyping:true});

    const responseNodes = await fetch('data/email-Eu-core-department-labels.txt');
    const responseNodesText = await responseNodes.text();
    console.log("loaded file for nodes, parse with Papa library ");
    const responseNodesJson = Papa.parse(responseNodesText,{header:false, delimiter: " ", dynamicTyping:true});

    // you can also dispatch any other reducer
    // thunkAPI.dispatch(reducerAction(params))

    const result = {
      nodes: responseNodesJson.data.map((item, i) => {
        return {node: item[0], label: item[1], id: item[0]}
      }),
      links: responseLinksJson.data.map((item, i) => {
        return {source: item[0], target: item[1], pos: i }
      })

    }
    return result;
    // when a result is returned, extraReducer below is triggered with the case setSeoulBikeData.fulfilled
  }catch(error){
    console.error("error catched in asyncThunk" + error);
    return thunkAPI.rejectWithValue(error)
  }
})

export const dataSetSlice = createSlice({
  name: 'dataSet',
  initialState: {nodes:[], links:[]},
  reducers: {
      // add reducer if needed
  },
  extraReducers: builder => {
    builder.addCase(getD3TestData.pending, (state, action) => {
      console.log("extraReducer getDataSet.pending");
      // do something with state, e.g. to change a status
    })
    builder.addCase(getD3TestData.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(getD3TestData.rejected, (state, action) => {
      // Add any fetched house to the array
      const error = action.payload
      console.log("extraReducer getDataSet.rejected with error" + error);
    })
    builder.addCase(getDataSet.pending, (state, action) => {
      console.log("extraReducer getDataSet.pending");
      // do something with state, e.g. to change a status
    })
    builder.addCase(getDataSet.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(getDataSet.rejected, (state, action) => {
      // Add any fetched house to the array
      const error = action.payload
      console.log("extraReducer getDataSet.rejected with error" + error);
    })
  }
})

// Action creators are generated for each case reducer function
// export const { reducerAction } = dataSetSlice.actions

export default dataSetSlice.reducer