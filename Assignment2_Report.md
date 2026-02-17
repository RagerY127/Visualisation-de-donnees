# Assignment 2 Report: Interactive Data Visualization for Community Safety Analysis

## Student Information
- **Project**: Developing Interactive Data Visualizations in React and D3.js
- **Dataset**: US Communities Crime Dataset
- **Date**: February 2026

---

## 1. Data Characterization and User Tasks

### 1.1 Dataset Description
The Communities Crime dataset contains information about **1,994 communities** across the United States with **128 attributes** including:

- **Demographic data**: population, race percentages, age distributions
- **Economic indicators**: median income (medIncome), per capita income, poverty rates
- **Social factors**: education levels, employment rates, family structures
- **Housing information**: rent, home ownership, housing conditions
- **Target variable**: **ViolentCrimesPerPop** (violent crimes per population)

The data has a **hierarchical structure** with two levels:
1. **State level** (identified by state code)
2. **Community level** (identified by communityname)

### 1.2 User Task
**Primary Goal**: Help users decide in which state/city to settle down to live.

**Specific Tasks**:
- T1: Identify communities with low crime rates
- T2: Explore relationships between socioeconomic factors (income, population) and crime rates
- T3: Compare crime patterns across different states
- T4: Select and analyze multiple communities simultaneously
- T5: Navigate hierarchical relationships between states and communities

---

## 2. Design Rationale

### 2.1 Visualization 1: Scatterplot with 2D Brush Interaction

**Design Choice**: A scatterplot displaying **Median Income vs Violent Crime Rate**

**Rationale**:
- Reveals the **negative correlation** between income and crime (higher income → lower crime)
- Enables precise identification of safe, affordable communities
- The 2D brush allows users to select **regions of interest** (e.g., "high income + low crime")

**Interaction Features**:
- **Brush Selection**: Rectangular selection to highlight multiple data points simultaneously
- **Visual Encoding**: 
  - Position: Income (x-axis) and Crime Rate (y-axis)
  - Size: Small circles (3px radius) to reduce overplotting
  - Opacity: 0.3 for unselected, 1.0 for selected items
  - Color: Red border for selected items

**Strengths**:
- ✅ Intuitive for exploring correlations
- ✅ Efficient multi-item selection with brush
- ✅ Clear visual feedback on selection

**Weaknesses**:
- ❌ Cannot show more than 2 attributes simultaneously
- ❌ Difficult to see hierarchical state-community relationships

---

### 2.2 Visualization 2: Hierarchical Layouts

Four different hierarchical layouts were implemented to represent the state→community structure:

#### **Layout 1: Treemap** (Preferred Choice)
**Description**: Rectangular tiles nested within state containers

**Strengths**:
- ✅ **Space-efficient**: Displays all communities simultaneously
- ✅ **Intuitive hierarchy**: Clear parent-child relationship
- ✅ **Size encoding**: Area represents crime rate magnitude
- ✅ **Easy comparison**: Adjacent communities within states are easy to compare

**Weaknesses**:
- ❌ Text labels can be hard to read for small communities
- ❌ Aspect ratios can distort perception

**Use Case**: Best for getting an **overview** of crime distribution across all states

---

#### **Layout 2: Sunburst (Radial Partition)**
**Description**: Circular, radial layout with states as inner ring, communities as outer ring

**Strengths**:
- ✅ **Aesthetically appealing**: Engaging circular design
- ✅ **Clear hierarchy**: Radial structure naturally shows parent-child
- ✅ **Angular encoding**: Proportion of communities per state visible

**Weaknesses**:
- ❌ **Label clutter**: Text difficult to read on outer rings
- ❌ **Size distortion**: Outer segments appear larger than inner
- ❌ **Limited scalability**: Too many communities create tiny slices

**Use Case**: Good for **presentations** and showing proportions, but less practical for detailed analysis

---

#### **Layout 3: Circle Packing**
**Description**: Nested circles with communities contained within state circles

**Strengths**:
- ✅ **Natural metaphor**: Containment relationship is intuitive
- ✅ **Size encoding**: Circle area represents crime rate
- ✅ **Aesthetic appeal**: Organic, pleasing layout

**Weaknesses**:
- ❌ **Space inefficiency**: Significant wasted whitespace
- ❌ **Occlusion**: Communities can overlap or be hidden
- ❌ **Poor scalability**: Difficult with many communities

**Use Case**: Best for **small datasets** or when aesthetics are prioritized over information density

---

#### **Layout 4: Tree (Node-Link Diagram)**
**Description**: Traditional tree structure with nodes and connecting links

**Strengths**:
- ✅ **Clear hierarchy**: Parent-child relationships are explicit
- ✅ **Familiar metaphor**: Users understand tree structures
- ✅ **Easy navigation**: Can follow paths from root to leaves

**Weaknesses**:
- ❌ **Requires scrolling**: Cannot fit all communities in view
- ❌ **Poor space utilization**: Lots of empty space
- ❌ **Visual clutter**: Too many links create complexity
- ❌ **Limited attribute encoding**: Only position conveys information

**Use Case**: Best for **small hierarchies** or when exploring specific branches

---

### 2.3 Preferred Layout: **Treemap**

**Justification**:
For this specific task (finding a safe place to live), the **Treemap** is the optimal choice because:

1. **Information Density**: Shows all 1,994 communities simultaneously without scrolling
2. **Comparative Analysis**: Users can quickly scan states to find low-crime areas
3. **Visual Hierarchy**: State groupings are clear, making it easy to compare within and across states
4. **Actionable Insights**: The combination of color (state) and size (crime rate) helps users quickly identify:
   - **Dark-colored, small tiles** = Safe communities in specific states
   - **Large tiles** = High-crime communities to avoid

5. **Interaction Support**: Works seamlessly with brush selection from the scatterplot:
   - When users brush high-income, low-crime communities, the treemap highlights their geographic (state) distribution
   - This combined view answers: "Which states have safe, affluent communities?"

---

### 2.4 Synchronized Interactions

**Implementation**:
- **Redux state management** ensures both visualizations share the same selection state
- **Brush on scatterplot** → Updates `brushedItems` → Highlights in treemap
- **Click on treemap node** → Updates `selectedItems` → Highlights in scatterplot
- **Visual feedback**: Selected items have increased opacity, stroke width, and distinct colors

**User Workflow**:
1. User brushes "high income + low crime" region on scatterplot
2. Treemap highlights which states contain these desirable communities
3. User clicks specific state/community in treemap for detailed information
4. Scatterplot updates to show the selected community's position

This **bidirectional interaction** supports the decision-making process by linking attribute-based exploration (scatterplot) with geographic/hierarchical context (treemap).

---

## 3. Conclusion

This project successfully implements a **dual-view interactive visualization system** for exploring community safety data:

**Technical Achievements**:
- ✅ Implemented 2D brush selection on scatterplot
- ✅ Created 4 different hierarchical layouts (treemap, sunburst, pack, tree)
- ✅ Achieved synchronized highlighting across views using Redux
- ✅ Applied React design patterns (Hooks, component separation, D3 integration)

**Design Success**:
- The **scatterplot** effectively reveals income-crime relationships
- The **treemap layout** provides the best balance of information density, hierarchy clarity, and comparative analysis
- **Synchronized interactions** enable users to explore data from both attribute-based (what characteristics?) and hierarchical (which state?) perspectives

**User Value**:
For someone deciding where to live, this tool allows them to:
1. Identify communities with desirable characteristics (low crime, good income)
2. See which states contain these communities
3. Make informed decisions based on both socioeconomic and geographic factors

**Future Improvements**:
- Add filtering by additional attributes (education, employment)
- Implement tooltips showing detailed community statistics
- Add a "compare" mode to view multiple communities side-by-side
- Include map visualization for geographic spatial context

---

## 4. Technical Implementation Summary

**Technologies Used**:
- React 18.3.1 (Hooks: useState, useRef, useEffect, useSelector, useDispatch)
- D3.js 7.9.0 (d3-brush, d3-hierarchy, d3-scale)
- Redux Toolkit 2.2.7 (State management)
- PapaParse 5.5.3 (CSV parsing)

**Design Patterns Applied**:
- Container/Presentational pattern (React components vs D3 classes)
- Redux unidirectional data flow
- D3 Enter-Update-Exit pattern for data binding
- Separation of concerns (visualization logic in D3, state in Redux, UI in React)

**Repository**: [GitHub Repository URL]
