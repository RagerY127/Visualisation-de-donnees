import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
// here import other dependencies
import { getDataSet } from './redux/DataSetSlice'
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
  
  return (
    <div className="App">
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
        <div style={{padding: '10px', fontSize: '12px', color: '#666'}}>
          <p><strong>Instructions:</strong> Use brush selection on the scatterplot or click nodes in the hierarchy to explore communities. 
          Lower crime rates indicate safer areas.</p>
        </div>
    </div>
  );
}

export default App;
