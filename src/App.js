import './App.css';
import { useEffect} from 'react';
import { useDispatch } from 'react-redux'
// here import other dependencies
import { getDataSet } from './redux/DataSetSlice'
import ScatterplotContainer from './components/scatterplot/ScatterplotContainer';
import HierarchyContainer from './components/hierarchy/HierarchyContainer';

// a component is a piece of code which render a part of the user interface
function App() {
  const dispatch = useDispatch();
  // every time the component re-render
  useEffect(()=>{
      console.log("App useEffect (called each time App re-renders)");
  }); // if no second parameter, useEffect is called at each re-render

  useEffect(()=>{
    dispatch(getDataSet());
  },[dispatch])
  return (
    <div className="App">
        <h1 style={{margin: '20px 0', color: '#333'}}>Community Crime Analysis - Where to Settle Down?</h1>
        <div id={"MultiviewContainer"} className={"row"}>
          {/* Scatterplot with brush interaction */}
          <ScatterplotContainer xAttributeName={"medIncome"} yAttributeName={"ViolentCrimesPerPop"}/>
          
          {/* Hierarchical visualization with multiple layouts */}
          <HierarchyContainer />
        </div>
        <div style={{padding: '10px', fontSize: '12px', color: '#666'}}>
          <p><strong>Instructions:</strong> Use brush selection on the scatterplot or click nodes in the hierarchy to explore communities. 
          Lower crime rates indicate safer areas.</p>
        </div>
    </div>
  );
}

export default App;
