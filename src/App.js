import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
// here import other dependencies
import { getDataSet } from './redux/DataSetSlice'
import { clearSelections } from './redux/ItemInteractionSlice'
import ScatterplotContainer from './components/scatterplot/ScatterplotContainer';
import HierarchyContainer from './components/hierarchy/HierarchyContainer';

// a component is a piece of code which render a part of the user interface
function App() {
  const dispatch = useDispatch();
  const [currentLayout, setCurrentLayout] = useState('treemap');
  
  // every time the component re-render
  useEffect(()=>{
      console.log("App useEffect (called each time App re-renders)");
  }); // if no second parameter, useEffect is called at each re-render

  useEffect(()=>{
    dispatch(getDataSet());
  },[dispatch])
  
  const selectedItems = useSelector(state => state.itemInteraction.selectedItems);
  
  // Generate display text for selected items
  const selectedItemsText = selectedItems.length > 0 
      ? selectedItems.map(item => item.name || item.communityname || `Community ${item.index}`).join(', ')
      : '';
  
  const handleClearSelections = () => {
    dispatch(clearSelections());
  };
  
  return (
    <div className="App">
        {/* Clear button at top left */}
        <button className="clear-selections-button" onClick={handleClearSelections}>
          Clear All
        </button>
        
        {/* Layout controls at top right */}
        <div className="global-hierarchy-controls">
          <button 
              className={currentLayout === 'treemap' ? 'active' : ''}
              onClick={() => setCurrentLayout('treemap')}
          >
              Treemap
          </button>
          <button 
              className={currentLayout === 'sunburst' ? 'active' : ''}
              onClick={() => setCurrentLayout('sunburst')}
          >
              Sunburst
          </button>
          <button 
              className={currentLayout === 'pack' ? 'active' : ''}
              onClick={() => setCurrentLayout('pack')}
          >
              Circle Pack
          </button>
          <button 
              className={currentLayout === 'tree' ? 'active' : ''}
              onClick={() => setCurrentLayout('tree')}
          >
              Tree
          </button>
        </div>
        
        <div id={"MultiviewContainer"} className={"row"}>
          {/* Scatterplot with brush interaction */}
          <ScatterplotContainer xAttributeName={"medIncome"} yAttributeName={"ViolentCrimesPerPop"}/>
          
          {/* Hierarchical visualization with multiple layouts */}
          <HierarchyContainer currentLayout={currentLayout} />
        </div>
        
        {/* Selected items display at bottom */}
        <div className="selected-items-display">
          <strong>Selected: </strong>
          <span className="selected-items-text">{selectedItemsText || 'None'}</span>
        </div>
    </div>
  );
}

export default App;
