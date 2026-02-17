import './Hierarchy.css'
import { useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'

import HierarchyD3 from './Hierarchy-d3';
import { setSelectedItems, setHoveredItem } from '../../redux/ItemInteractionSlice'

function HierarchyContainer(){
    const visData = useSelector(state =>state.dataSet)
    const selectedItems = useSelector(state => state.itemInteraction.selectedItems);
    const dispatch = useDispatch();
    
    // State for layout selection
    const [currentLayout, setCurrentLayout] = useState('treemap');

    // every time the component re-render
    useEffect(()=>{
        console.log("HierarchyContainer useEffect (called each time re-renders)");
    });

    const divContainerRef=useRef(null);
    const hierarchyD3Ref = useRef(null)

    const getChartSize = function(){
        let width;
        let height;
        if(divContainerRef.current!==undefined){
            width=divContainerRef.current.offsetWidth;
            height=divContainerRef.current.offsetHeight;
        }
        return {width:width,height:height};
    }

    // did mount called once the component did mount
    useEffect(()=>{
        console.log("HierarchyContainer useEffect [] called once the component did mount");
        const hierarchyD3 = new HierarchyD3(divContainerRef.current);
        hierarchyD3.create({size:getChartSize()});
        hierarchyD3Ref.current = hierarchyD3;
        return ()=>{
            console.log("HierarchyContainer useEffect [] return function, called when the component did unmount...");
            const hierarchyD3 = hierarchyD3Ref.current;
            hierarchyD3.clear()
        }
    },[]);

    // did update, called each time dependencies change
    useEffect(()=>{
        console.log("HierarchyContainer useEffect with dependency [visData, currentLayout], rendering hierarchy...");

        if (!visData || visData.length === 0) {
            console.log("No data available yet");
            return;
        }

        const handleNodeClick = function(nodeData){
            // When clicking a node, select that community
            dispatch(setSelectedItems([nodeData]))
        }
        
        const handleNodeHover = function(nodeData){
            // When hovering a node, update hovered item
            dispatch(setHoveredItem(nodeData))
        }

        const controllerMethods={
            handleNodeClick,
            handleNodeHover
        }

        const hierarchyD3 = hierarchyD3Ref.current;
        hierarchyD3.renderHierarchy(visData, currentLayout, controllerMethods);
    },[visData, currentLayout, dispatch]);

    // Update highlighting when selection changes
    useEffect(()=>{
        if (hierarchyD3Ref.current && visData && visData.length > 0) {
            const hierarchyD3 = hierarchyD3Ref.current;
            hierarchyD3.highlightSelectedItems(selectedItems);
        }
    },[selectedItems, visData])

    const handleLayoutChange = (layout) => {
        setCurrentLayout(layout);
    }

    return(
        <div ref={divContainerRef} className="hierarchyDivContainer col2" style={{position: 'relative'}}>
            <div className="hierarchy-controls">
                <button 
                    className={currentLayout === 'treemap' ? 'active' : ''}
                    onClick={() => handleLayoutChange('treemap')}
                >
                    Treemap
                </button>
                <button 
                    className={currentLayout === 'sunburst' ? 'active' : ''}
                    onClick={() => handleLayoutChange('sunburst')}
                >
                    Sunburst
                </button>
                <button 
                    className={currentLayout === 'pack' ? 'active' : ''}
                    onClick={() => handleLayoutChange('pack')}
                >
                    Circle Pack
                </button>
                <button 
                    className={currentLayout === 'tree' ? 'active' : ''}
                    onClick={() => handleLayoutChange('tree')}
                >
                    Tree
                </button>
            </div>
        </div>
    )
}

export default HierarchyContainer;
