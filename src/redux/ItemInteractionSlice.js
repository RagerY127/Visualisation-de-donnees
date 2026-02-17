import { createSlice } from '@reduxjs/toolkit'


export const itemInteractionSlice = createSlice({
  name: 'itemInteraction',
  initialState: {
    selectedItems: [],  // Items selected via click or brush
    hoveredItem: {},    // Item currently hovered
    brushedItems: [],   // Items selected via brush interaction
  },
  reducers: {
    // Set selected items (for click interaction)
    setSelectedItems: (state, action) => {
      return {...state, selectedItems: action.payload}
    },
    // Set brushed items (for brush interaction)
    setBrushedItems: (state, action) => {
      return {...state, brushedItems: action.payload, selectedItems: action.payload}
    },
    // Set hovered item
    setHoveredItem: (state, action) => {
      return {...state, hoveredItem: action.payload}
    },
    // Clear all selections
    clearSelections: (state) => {
      return {...state, selectedItems: [], brushedItems: []}
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setSelectedItems, 
  setBrushedItems, 
  setHoveredItem, 
  clearSelections 
} = itemInteractionSlice.actions

export default itemInteractionSlice.reducer