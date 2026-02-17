import * as d3 from 'd3'

class HierarchyD3 {
    margin = {top: 20, right: 20, bottom: 20, left: 20};
    size;
    height;
    width;
    svg;
    currentLayout = 'treemap';  // default layout
    colorScale;
    hierarchyData;
    
    constructor(el){
        this.el=el;
        // Create color scale for states
        this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    }

    create = function (config) {
        this.size = {width: config.size.width, height: config.size.height};
        this.width = this.size.width - this.margin.left - this.margin.right;
        this.height = this.size.height - this.margin.top - this.margin.bottom;

        // Initialize SVG
        this.svg = d3.select(this.el).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("class","hierarchySvgG")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    }

    // Transform flat data to hierarchical structure
    prepareHierarchicalData = function(data) {
        // Group by state, then by community
        const stateMap = new Map();
        
        data.forEach(d => {
            const stateId = d.state;
            const communityName = d.communityname || `Community_${d.index}`;
            
            if (!stateMap.has(stateId)) {
                stateMap.set(stateId, {
                    name: `${stateId}`,  // Only show the number
                    state: stateId,
                    children: []
                });
            }
            
            stateMap.get(stateId).children.push({
                name: communityName,
                ...d
            });
        });

        // Create root structure
        return {
            name: "USA",
            children: Array.from(stateMap.values())
        };
    }

    // Treemap layout
    renderTreemap = function(hierarchyData, controllerMethods) {
        console.log("Rendering Treemap...");
        
        // Clear previous content
        this.svg.selectAll("*").remove();

        const root = d3.hierarchy(hierarchyData)
            .sum(d => d.ViolentCrimesPerPop || 0)
            .sort((a, b) => b.value - a.value);

        const treemap = d3.treemap()
            .size([this.width, this.height])
            .padding(1)
            .round(true);

        treemap(root);

        const self = this;
        
        // Create cells
        const cell = this.svg.selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x0},${d.y0})`)
            .on("click", function(event, d) {
                if (controllerMethods.handleNodeClick) {
                    controllerMethods.handleNodeClick(d.data);
                }
            })
            .on("mouseenter", function(event, d) {
                d3.select(this).select("rect")
                    .attr("stroke", "black")
                    .attr("stroke-width", 3);
                if (controllerMethods.handleNodeHover) {
                    controllerMethods.handleNodeHover(d.data);
                }
            })
            .on("mouseleave", function(event, d) {
                d3.select(this).select("rect")
                    .attr("stroke", "#333")
                    .attr("stroke-width", 1);
            });

        cell.append("rect")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill", d => this.colorScale(d.parent.data.state))
            .attr("opacity", 0.7);

        // Remove text labels from cells - will be shown on click instead
    }

    // Sunburst layout
    renderSunburst = function(hierarchyData, controllerMethods) {
        console.log("Rendering Sunburst...");
        
        this.svg.selectAll("*").remove();

        const radius = Math.min(this.width, this.height) / 2;
        
        const root = d3.hierarchy(hierarchyData)
            .sum(d => d.ViolentCrimesPerPop || 1)
            .sort((a, b) => b.value - a.value);

        const partition = d3.partition()
            .size([2 * Math.PI, radius]);

        partition(root);

        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => d.y0)
            .outerRadius(d => d.y1);

        const g = this.svg.append("g")
            .attr("transform", `translate(${this.width / 2},${this.height / 2})`);

        const self = this;

        const path = g.selectAll("path")
            .data(root.descendants())
            .join("path")
            .attr("class", "node")
            .attr("d", arc)
            .attr("fill", d => this.colorScale(d.depth === 1 ? d.data.state : (d.parent ? d.parent.data.state : 0)))
            .attr("opacity", d => d.depth === 0 ? 0 : 0.7)
            .attr("stroke", "white")
            .on("click", function(event, d) {
                if (d.depth === 2 && controllerMethods.handleNodeClick) {
                    controllerMethods.handleNodeClick(d.data);
                }
            })
            .on("mouseenter", function(event, d) {
                d3.select(this)
                    .attr("opacity", 1)
                    .attr("stroke-width", 2);
                if (d.depth === 2 && controllerMethods.handleNodeHover) {
                    controllerMethods.handleNodeHover(d.data);
                }
            })
            .on("mouseleave", function(event, d) {
                d3.select(this)
                    .attr("opacity", 0.7)
                    .attr("stroke-width", 1);
            });

        // Add labels for visible segments
        g.selectAll("text")
            .data(root.descendants().filter(d => d.depth === 1))
            .join("text")
            .attr("transform", d => {
                const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                const y = (d.y0 + d.y1) / 2;
                return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
            })
            .attr("text-anchor", "middle")
            .text(d => d.data.name)
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .attr("fill", "black");
    }

    // Circle Packing layout
    renderCirclePack = function(hierarchyData, controllerMethods) {
        console.log("Rendering Circle Pack...");
        
        this.svg.selectAll("*").remove();

        const root = d3.hierarchy(hierarchyData)
            .sum(d => d.ViolentCrimesPerPop || 1)
            .sort((a, b) => b.value - a.value);

        const pack = d3.pack()
            .size([this.width, this.height])
            .padding(3);

        pack(root);

        const self = this;

        const node = this.svg.selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .on("click", function(event, d) {
                if (d.depth === 2 && controllerMethods.handleNodeClick) {
                    controllerMethods.handleNodeClick(d.data);
                }
            })
            .on("mouseenter", function(event, d) {
                d3.select(this).select("circle")
                    .attr("stroke", "black")
                    .attr("stroke-width", 3);
                if (d.depth === 2 && controllerMethods.handleNodeHover) {
                    controllerMethods.handleNodeHover(d.data);
                }
            })
            .on("mouseleave", function(event, d) {
                d3.select(this).select("circle")
                    .attr("stroke", d.depth === 0 ? "none" : "white")
                    .attr("stroke-width", 1);
            });

        node.append("circle")
            .attr("r", d => d.r)
            .attr("fill", d => {
                if (d.depth === 0) return "none";
                if (d.depth === 1) return this.colorScale(d.data.state);
                return this.colorScale(d.parent.data.state);
            })
            .attr("opacity", d => d.depth === 0 ? 0 : 0.6)
            .attr("stroke", d => d.depth === 0 ? "none" : "white");

        node.filter(d => d.depth <= 1)
            .append("text")
            .attr("text-anchor", "middle")
            .text(d => d.data.name)
            .attr("font-size", d => d.depth === 0 ? "14px" : "12px")
            .attr("font-weight", d => d.depth === 1 ? "bold" : "normal")
            .attr("fill", "black");
    }

    // Tree layout
    renderTree = function(hierarchyData, controllerMethods) {
        console.log("Rendering Tree...");
        
        this.svg.selectAll("*").remove();

        const root = d3.hierarchy(hierarchyData);

        const treeLayout = d3.tree()
            .size([this.width, this.height - 100]);

        treeLayout(root);

        const self = this;

        // Draw links
        this.svg.selectAll(".link")
            .data(root.links())
            .join("path")
            .attr("class", "link")
            .attr("d", d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y));

        // Draw nodes
        const node = this.svg.selectAll(".node")
            .data(root.descendants())
            .join("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .on("click", function(event, d) {
                if (d.depth === 2 && controllerMethods.handleNodeClick) {
                    controllerMethods.handleNodeClick(d.data);
                }
            })
            .on("mouseenter", function(event, d) {
                d3.select(this).select("circle")
                    .attr("r", 8)
                    .attr("stroke-width", 3);
                if (d.depth === 2 && controllerMethods.handleNodeHover) {
                    controllerMethods.handleNodeHover(d.data);
                }
            })
            .on("mouseleave", function(event, d) {
                d3.select(this).select("circle")
                    .attr("r", 5)
                    .attr("stroke-width", 2);
            });

        node.append("circle")
            .attr("r", 5)
            .attr("fill", d => {
                if (d.depth === 0) return "red";
                if (d.depth === 1) return this.colorScale(d.data.state);
                return this.colorScale(d.parent.data.state);
            });

        node.append("text")
            .attr("dy", -10)
            .attr("text-anchor", "middle")
            .text(d => d.depth <= 1 ? d.data.name : "")
            .attr("font-size", d => d.depth === 1 ? "12px" : "10px")
            .attr("font-weight", d => d.depth === 1 ? "bold" : "normal");
    }

    // Main render function
    renderHierarchy = function(data, layout, controllerMethods) {
        this.currentLayout = layout;
        this.hierarchyData = this.prepareHierarchicalData(data);

        switch(layout) {
            case 'treemap':
                this.renderTreemap(this.hierarchyData, controllerMethods);
                break;
            case 'sunburst':
                this.renderSunburst(this.hierarchyData, controllerMethods);
                break;
            case 'pack':
                this.renderCirclePack(this.hierarchyData, controllerMethods);
                break;
            case 'tree':
                this.renderTree(this.hierarchyData, controllerMethods);
                break;
            default:
                this.renderTreemap(this.hierarchyData, controllerMethods);
        }
    }

    // Highlight selected items
    highlightSelectedItems = function(selectedItems) {
        const selectedIndices = new Set(selectedItems.map(d => d.index));
        
        if (this.currentLayout === 'treemap') {
            this.svg.selectAll(".node rect")
                .attr("opacity", function() {
                    const d = d3.select(this.parentNode).datum();
                    if (!d || !d.data) return 0.7;
                    if (selectedIndices.size === 0) return 0.7;
                    return selectedIndices.has(d.data.index) ? 1 : 0.3;
                })
                .attr("stroke-width", function() {
                    const d = d3.select(this.parentNode).datum();
                    if (!d || !d.data) return 1;
                    return selectedIndices.has(d.data.index) ? 3 : 1;
                });
        } else if (this.currentLayout === 'sunburst') {
            this.svg.selectAll("path.node")
                .attr("opacity", function() {
                    const d = d3.select(this).datum();
                    if (!d || !d.data || d.depth !== 2) return 0.7;
                    if (selectedIndices.size === 0) return 0.7;
                    return selectedIndices.has(d.data.index) ? 1 : 0.3;
                })
                .attr("stroke-width", function() {
                    const d = d3.select(this).datum();
                    if (!d || !d.data || d.depth !== 2) return 1;
                    return selectedIndices.has(d.data.index) ? 3 : 1;
                });
        } else if (this.currentLayout === 'pack') {
            this.svg.selectAll(".node circle")
                .attr("opacity", function() {
                    const d = d3.select(this.parentNode).datum();
                    if (!d || !d.data || d.depth !== 2) return 0.6;
                    if (selectedIndices.size === 0) return 0.6;
                    return selectedIndices.has(d.data.index) ? 1 : 0.3;
                })
                .attr("stroke-width", function() {
                    const d = d3.select(this.parentNode).datum();
                    if (!d || !d.data || d.depth !== 2) return 1;
                    return selectedIndices.has(d.data.index) ? 3 : 1;
                });
        } else if (this.currentLayout === 'tree') {
            this.svg.selectAll(".node circle")
                .attr("r", function() {
                    const d = d3.select(this.parentNode).datum();
                    if (!d || !d.data || d.depth !== 2) return 5;
                    if (selectedIndices.size === 0) return 5;
                    return selectedIndices.has(d.data.index) ? 8 : 5;
                })
                .attr("stroke-width", function() {
                    const d = d3.select(this.parentNode).datum();
                    if (!d || !d.data || d.depth !== 2) return 2;
                    return selectedIndices.has(d.data.index) ? 4 : 2;
                })
                .attr("stroke", function() {
                    const d = d3.select(this.parentNode).datum();
                    if (!d || !d.data || d.depth !== 2) return "steelblue";
                    return selectedIndices.has(d.data.index) ? "red" : "steelblue";
                });
        }
    }

    clear = function(){
        d3.select(this.el).selectAll("*").remove();
    }
}

export default HierarchyD3;
