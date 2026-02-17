import './Scatterplot.css'
import { useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import ScatterplotD3 from './Scatterplot-d3';
import { setSelectedItems, setBrushedItems, resetClearBrushFlag } from '../../redux/ItemInteractionSlice'

function ScatterplotContainer({xAttributeName, yAttributeName}){
    const visData = useSelector(state =>state.dataSet)
    const selectedItems = useSelector(state => state.itemInteraction.selectedItems);
    const shouldClearBrush = useSelector(state => state.itemInteraction.shouldClearBrush);
    const dispatch = useDispatch();
    const divContainerRef=useRef(null);
    const scatterplotD3Ref = useRef(null)

    const getChartSize = function(){
        let width, height;
        if(divContainerRef.current!==undefined){
            width=divContainerRef.current.offsetWidth;
            height=divContainerRef.current.offsetHeight;
        }
        return {width:width,height:height};
    }

    useEffect(()=>{
        const scatterplotD3 = new ScatterplotD3(divContainerRef.current);
        scatterplotD3.create({size:getChartSize()});
        scatterplotD3Ref.current = scatterplotD3;
        return ()=>{
            scatterplotD3Ref.current.clear()
        }
    },[]);

    useEffect(()=>{
        const handleOnClick = (itemData) => dispatch(setSelectedItems([itemData]))
        const handleOnMouseEnter = (itemData) => {}
        const handleOnMouseLeave = () => {}
        const handleBrushEnd = (brushedItems) => dispatch(setBrushedItems(brushedItems))

        const controllerMethods={
            handleOnClick,
            handleOnMouseEnter,
            handleOnMouseLeave,
            handleBrushEnd
        }

        const scatterplotD3 = scatterplotD3Ref.current;
        scatterplotD3.renderScatterplot(visData, xAttributeName, yAttributeName, controllerMethods);
    },[visData, xAttributeName, yAttributeName, dispatch]);

    useEffect(()=>{
        if (scatterplotD3Ref.current) {
            scatterplotD3Ref.current.highlightSelectedItems(selectedItems);
        }
    },[selectedItems])

    useEffect(()=>{
        if (shouldClearBrush && scatterplotD3Ref.current) {
            scatterplotD3Ref.current.clearBrush();
            dispatch(resetClearBrushFlag());
        }
    },[shouldClearBrush, dispatch])

    return(
        <div ref={divContainerRef} className="scatterplotDivContainer col2">

        </div>
    )
}

export default ScatterplotContainer;