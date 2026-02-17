import * as d3 from 'd3'
// import { getDefaultFontSize } from '../../utils/helper';

class ScatterplotD3 {
    margin = {top: 20, right: 20, bottom: 50, left: 80};
    size;
    height;
    width;
    svg;
    // add specific class properties used for the vis render/updates
    defaultOpacity=0.3;
    transitionDuration=1000;
    circleRadius = 3;
    xScale;
    yScale;
    brush;
    brushG;
    currentData;
    currentXAttribute;
    currentYAttribute;


    constructor(el){
        this.el=el;
    };

    create = function (config) {
        this.size = {width: config.size.width, height: config.size.height};

        // get the effect size of the view by subtracting the margin
        this.width = this.size.width - this.margin.left - this.margin.right;
        this.height = this.size.height - this.margin.top - this.margin.bottom;

        // initialize the svg and keep it in a class property to reuse it in renderScatterplot()
        this.svg=d3.select(this.el).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("class","svgG")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        ;

        this.xScale = d3.scaleLinear().range([0,this.width]);
        this.yScale = d3.scaleLinear().range([this.height,0]);

        // build xAxisG
        this.svg.append("g")
            .attr("class","xAxisG")
            .attr("transform","translate(0,"+this.height+")")
        ;
        this.svg.append("g")
            .attr("class","yAxisG")
        ;

        // Add axis labels
        this.svg.append("text")
            .attr("class", "xAxisLabel")
            .attr("text-anchor", "middle")
            .attr("x", this.width / 2)
            .attr("y", this.height + 40)
            .style("font-size", "12px")
            .style("fill", "#333");

        this.svg.append("text")
            .attr("class", "yAxisLabel")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -this.height / 2)
            .attr("y", -55)
            .style("font-size", "12px")
            .style("fill", "#333");

        // Initialize brush
        this.brush = d3.brush()
            .extent([[0, 0], [this.width, this.height]]);

        // Add brush group
        this.brushG = this.svg.append("g")
            .attr("class", "brush");
    }

    changeBorderAndOpacity(selection, selected){
        selection.style("opacity", selected?1:this.defaultOpacity)
        ;

        selection.select(".markerCircle")
            .attr("stroke-width",selected?2:0)
        ;
    }

    updateMarkers(selection,xAttribute,yAttribute){
        // transform selection
        selection
            .transition().duration(this.transitionDuration)
            .attr("transform", (item)=>{
                // use scales to return shape position from data values
                return "translate("+this.xScale(item[xAttribute])+","+this.yScale(item[yAttribute])+")";
            })
        ;
        this.changeBorderAndOpacity(selection, false)
    }

    highlightSelectedItems(selectedItems){
        this.svg.selectAll(".markerG")
            // all elements with the class .cellG (empty the first time)
            .data(selectedItems,(itemData)=>itemData.index)
            .join(
                enter => {},
                update => {
                    this.changeBorderAndOpacity(update, true);
                },
                exit => {
                    this.changeBorderAndOpacity(exit, false);
                },
            );
        // use pattern update to change the border and opacity of objects:
        //      - call this.changeBorderAndOpacity(selection,true) for objects in selectedItems
        //      - this.changeBorderAndOpacity(selection,false) for objects not in selectedItems
    }

    updateAxis = function(visData,xAttribute,yAttribute){
        // compute min max using d3.min/max(visData.map(item=>item.attribute))
        const minX = d3.min(visData.map(item=>item[xAttribute]))
        const maxX = d3.max(visData.map(item=>item[xAttribute]))
        const minY = d3.min(visData.map(item=>item[yAttribute]))
        const maxY = d3.max(visData.map(item=>item[yAttribute]))
        this.xScale.domain([minX,maxX]);
        this.yScale.domain([minY,maxY]);

        // create axis with computed scales
        // .xAxisG and .yAxisG are initialized in create() function
        this.svg.select(".xAxisG")
            .transition().duration(500)
            .call(d3.axisBottom(this.xScale))
        ;
        this.svg.select(".yAxisG")
            .transition().duration(500)
            .call(d3.axisLeft(this.yScale))
        ;
    }


    renderScatterplot = function (visData, xAttribute, yAttribute, controllerMethods){
        console.log("render scatterplot with a new data list ...")

        // Store current data and attributes for brush interaction
        this.currentData = visData;
        this.currentXAttribute = xAttribute;
        this.currentYAttribute = yAttribute;

        // build the size scales and x,y axis
        this.updateAxis(visData,xAttribute,yAttribute);

        // Update axis labels
        this.svg.select(".xAxisLabel").text(xAttribute);
        this.svg.select(".yAxisLabel").text(yAttribute);

        this.svg.selectAll(".markerG")
            // all elements with the class .cellG (empty the first time)
            .data(visData,(itemData)=>itemData.index)
            .join(
                enter=>{
                    // all data items to add:
                    // doesn’exist in the select but exist in the new array
                    const itemG=enter.append("g")
                        .attr("class","markerG")
                        .style("opacity",this.defaultOpacity)
                        .on("click", (event,itemData)=>{
                            controllerMethods.handleOnClick(itemData);
                        })
                    ;
                    // render element as child of each element "g"
                    itemG.append("circle")
                        .attr("class","markerCircle")
                        .attr("r",this.circleRadius)
                        .attr("stroke","red")
                    ;
                    this.updateMarkers(itemG,xAttribute,yAttribute);
                },
                update=>{
                    this.updateMarkers(update,xAttribute,yAttribute)
                },
                exit =>{
                    exit.remove()
                    ;
                }

            )

        // Setup brush behavior
        const self = this;
        this.brush.on("end", function(event) {
            if (!event.selection) {
                // If no selection, clear brushed items
                if (controllerMethods.handleBrushEnd) {
                    controllerMethods.handleBrushEnd([]);
                }
                return;
            }

            const [[x0, y0], [x1, y1]] = event.selection;
            
            // Find all items within brush selection
            const brushedItems = self.currentData.filter(d => {
                const x = self.xScale(d[self.currentXAttribute]);
                const y = self.yScale(d[self.currentYAttribute]);
                return x >= x0 && x <= x1 && y >= y0 && y <= y1;
            });

            if (controllerMethods.handleBrushEnd) {
                controllerMethods.handleBrushEnd(brushedItems);
            }
        });

        // Apply brush to brush group
        this.brushG.call(this.brush);
    }

    clear = function(){
        d3.select(this.el).selectAll("*").remove();
    }
}
export default ScatterplotD3;