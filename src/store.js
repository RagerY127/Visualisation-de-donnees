import { configureStore } from '@reduxjs/toolkit'
import dataSetReducer from './redux/DataSetSlice'
import itemInteractionReducer from './redux/ItemInteractionSlice'
import layoutSliceReducer from './redux/LayoutSlice'
export default configureStore({
  reducer: {
    dataSet: dataSetReducer,
    layout: layoutSliceReducer,
    itemInteraction: itemInteractionReducer,
  }
})