import { createSlice } from '@reduxjs/toolkit'

export const itemInteractionSlice = createSlice({
  name: 'itemInteraction',
  initialState: {
    selectedItems: [],
    hoveredItem: {},
    brushedItems: [],
    shouldClearBrush: false,
  },
  reducers: {
    setSelectedItems: (state, action) => {
      const items = Array.isArray(action.payload) ? action.payload : [];
      return {...state, selectedItems: items, shouldClearBrush: false}
    },
    setBrushedItems: (state, action) => {
      const items = Array.isArray(action.payload) ? action.payload : [];
      return {...state, brushedItems: items, selectedItems: items, shouldClearBrush: false}
    },
    setHoveredItem: (state, action) => {
      return {...state, hoveredItem: action.payload}
    },
    clearSelections: (state) => {
      return {...state, selectedItems: [], brushedItems: [], shouldClearBrush: true}
    },
    resetClearBrushFlag: (state) => {
      return {...state, shouldClearBrush: false}
    },
  },
})

export const { 
  setSelectedItems, 
  setBrushedItems, 
  setHoveredItem, 
  clearSelections,
  resetClearBrushFlag
} = itemInteractionSlice.actions

export default itemInteractionSlice.reducer