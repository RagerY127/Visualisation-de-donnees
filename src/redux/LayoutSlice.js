import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {setNodes} from './DataSetSlice'
export const getLayout = createAsyncThunk('layout/fetchLayout', async (dataset, thunkAPI) => {
  try{
    // do somehting

    // you can also dispatch any other reducer
    // thunkAPI.dispatch(reducerAction(params))

    // const dataset = thunkAPI.getState().dataSet
    const layout = thunkAPI.getState().layout
    if(layout.layoutName==="third-party"){
      const response = await fetch('http://localhost:5000/getLayout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({dataset, layout_name: layout.networkXLayoutName})
      });
      const responseJSON = await response.json();

      const newNodes = dataset.nodes.map(node=>{
        const [x,y] = responseJSON[node.id]
        return {...node, x, y}
      });

      
      thunkAPI.dispatch(setNodes(newNodes));
    }
    // return result;
    // when a result is returned, extraReducer below is triggered
  }catch(error){
    console.error("error catched in asyncThunk" + error);
    return thunkAPI.rejectWithValue(error)
  }
})


export const layoutSlice = createSlice({
  name: 'counter',
  initialState: {
    layoutName: "d3-force", // "d3-force" | "third-party"
    networkXLayoutName: "spring" // spring | circular | spectral  ...
  },
  // initialState:[] if you need an array
  reducers: {
    updateLayoutName: (state, action) => {
      return {...state, layoutName: action.payload}
    },
    updateNetworkXLayoutName: (state, action) => {
      return {...state, layoutName: action.payload}
    },
  },
  extraReducers: builder => {
    builder.addCase(getLayout.pending, (state, action) => {
      console.log("extraReducer getLayout.pending");
      // do something with state, e.g. to change a status
    })
    // builder.addCase(getLayout.fulfilled, (state, action) => {
    //   // do something with state or return action.payload directly
    //   return action.payload
    // })
    builder.addCase(getLayout.rejected, (state, action) => {
      // Add any fetched house to the array
      const error = action.payload
      console.log("extraReducer getLayout.rejected with error" + error);
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateAnObject/* , addValueToAnArray, updateAnArray */ } = layoutSlice.actions

export default layoutSlice.reducer