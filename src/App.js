import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDataSet } from './redux/DataSetSlice'
import { clearSelections } from './redux/ItemInteractionSlice'
import ScatterplotContainer from './components/scatterplot/ScatterplotContainer';
import HierarchyContainer from './components/hierarchy/HierarchyContainer';

function App() {
  const dispatch = useDispatch();
  const [currentLayout, setCurrentLayout] = useState('treemap');
  
  useEffect(()=>{
      console.log("App render");
  });

  useEffect(()=>{
    dispatch(getDataSet());
  },[dispatch])
  
  const selectedItems = useSelector(state => state.itemInteraction.selectedItems);
  
  const selectedItemsText = selectedItems.length > 0 
      ? selectedItems.map(item => item.name || item.communityname || `Community ${item.index}`).join(', ')
      : '';
  
  const handleClearSelections = () => {
    dispatch(clearSelections());
  };
  
  return (
    <div className="App">
        <button className="clear-selections-button" onClick={handleClearSelections}>
          Clear All
        </button>
        
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
          <ScatterplotContainer xAttributeName={"medIncome"} yAttributeName={"ViolentCrimesPerPop"}/>
          <HierarchyContainer currentLayout={currentLayout} />
        </div>
        
        <div className="selected-items-display">
          <strong>Selected: </strong>
          <span className="selected-items-text">{selectedItemsText || 'None'}</span>
        </div>
    </div>
  );
}

export default App;
