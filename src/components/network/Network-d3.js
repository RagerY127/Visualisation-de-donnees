import * as d3 from 'd3'
// import { getDefaultFontSize } from '../../utils/helper';

class NetworkD3 {
    margin = {top: 5, right: 5, bottom: 5, left: 5};
    size;
    height;
    width;
    visSvg;
    linksG;
    nodesG;
    // add specific class properties used for the vis render/updates
    // cellSize= 34;
    // radius = this.cellSize / 2;
    // colorScheme = d3.schemeYlGnBu[9];
    // cellColorScale = d3.scaleQuantile(this.colorScheme);
    // cellSizeScale = d3.scaleLinear()
    //     .range([2, this.radius-1])
    // ;


    // the constructor takes the element to add the SVG within it
    constructor(el){
        this.el=el;
    };

    create = function (config) {
        this.size = {width: config.size.width, height: config.size.height};

        // adapt the size locally if necessary
        // e.g. to create a square svg
        // if (this.size.width > this.size.height) {
        //     this.size.width = this.size.height;
        // } else {
        //     this.size.height = this.size.width;
        // }

        // get the effect size of the view by subtracting the margin
        this.width = this.size.width - this.margin.left - this.margin.right;
        this.height = this.size.height - this.margin.top - this.margin.bottom;

        // initialize the svg and keep it in a class property to reuse it in renderMatrix()
        this.visSvg=d3.select(this.el).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("class","matSvgG")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        ;
        this.linksG = this.visSvg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
        ;
        this.nodesG = this.visSvg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
        ;


    }

    updateFunction1(selection){
        // transform selection
        // selection.attr("transform", (itemData)=>{
        //      // use scales to return shape position from data values
        // })

        // change sub-element
        // selection.select(".classname")
        //    .attr("fill",(itemData)=>{
        //          // use scale to return visual attribute from data values
        //    })
    }

    renderVis = function (visData, layoutName, controllerMethods){
        this.nodesG.selectAll("*").remove();
        this.linksG.selectAll("*").remove();
        // The force simulation mutates links and nodes, so create a copy
        // so that re-evaluating this cell produces the same result.
        const links = visData.links.map(d => ({...d}));
        const nodes = visData.nodes.map(d => ({...d}));
        // build an object by Id for direct access to nodes
        const nodeById = {}
        nodes.forEach(node=>{nodeById[node.id] = node})

        const link = this.linksG.selectAll("line")
            .data(links, d=>d.id)
            .join("line")
            .attr("stroke-width",1)
        ;
        const node = this.nodesG.selectAll("circle")
            .data(nodes, d=>d.id)
            .join("circle")
            .attr("r",5)
            .attr("fill","steelblue")
        ;
        node.append("title")
            .text(d=>d.node)
        ;

        if(layoutName==="d3-force"){
            // build a layout by simulating forces forces
            const simulation = d3.forceSimulation(nodes)
                .force("center", d3.forceCenter(this.width/2, this.height/2).strength(1)) // center position of global mass, default strength is 1
                // .force("charge", d3.forceManyBody().strength(-100)) // mutual gravity or repulsion (if negative), default strength is -100
                // .force("x", d3.forceX(this.width/2).strength(1)) // apply a x-axis force toward the given x position, default strength is 1
                // .force("y", d3.forceY(this.height/2).strength(1)) // apply a y-axis force toward the given y position, default strength is 1
                // .force("link", d3.forceLink(links).id(d => d.id).distance(30)) // avg links distance, default is 30
            ;

            // Set the position attributes of links and nodes each time the simulation ticks.
            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            });
        }else if (layoutName==="third-party"){
            
        }
    }

    clear = function(){
        d3.select(this.el).selectAll("*").remove();
    }
}
export default NetworkD3;