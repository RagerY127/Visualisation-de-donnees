# Community Crime Analysis Visualization

Interactive data visualization system built with React and D3.js to help users identify safe communities based on crime rates and socioeconomic factors.

## 🎯 Project Overview

This application implements two synchronized interactive visualizations:
1. **Scatterplot with 2D Brush Selection** - Analyze correlation between median income and violent crime rates
2. **Hierarchical Visualization** - Explore state→community hierarchy with 4 different layouts (Treemap, Sunburst, Circle Pack, Tree)

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run Application
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📊 Features

### 🎨 Scatterplot Visualization
- ✅ **2D Brush Selection**: Drag a rectangle to select multiple communities
- ✅ **Correlation Analysis**: Median Income (X) vs Violent Crime Rate (Y)
- ✅ **Visual Feedback**: Selected items highlighted with opacity and red borders
- ✅ **Axis Labels**: Clear axis labels for easy interpretation

### 🗺️ Hierarchical Visualization
- ✅ **4 Layout Options**:
  - **Treemap** ⭐ (Recommended): Space-filling rectangular tiles, optimal for 1,994 communities
  - **Sunburst**: Radial partition layout
  - **Circle Pack**: Nested circles with containment metaphor
  - **Tree**: Traditional node-link diagram
- ✅ **Multi-Level Selection**:
  - Click **state number** → Select all communities in that state
  - Click **individual community** → Select single community
- ✅ **Hover Effects**: Visual feedback on mouse interaction
- ✅ **State Labels**: Bold numbers displayed on state-level nodes

### 🔗 Synchronized Interactions
- ✅ **Bidirectional Highlighting**: Selections propagate between both views
- ✅ **Brush → Hierarchy**: Communities within brush area highlighted in hierarchy
- ✅ **Click → Scatterplot**: Selected communities/states highlighted in scatterplot
- ✅ **Clear All Button**: Red button (top-left) to reset all selections and brush
- ✅ **Selection Display**: Bottom bar shows all selected community names (comma-separated, ellipsis if too long)

## 📁 Project Structure

```
src/
├── components/
│   ├── scatterplot/
│   │   ├── ScatterplotContainer.js    # React container with hooks
│   │   ├── Scatterplot-d3.js          # D3 rendering + brush logic
│   │   └── Scatterplot.css
│   └── hierarchy/
│       ├── HierarchyContainer.js      # React container with layout switching
│       ├── Hierarchy-d3.js            # D3 hierarchical layouts (4 types)
│       └── Hierarchy.css
├── redux/
│   ├── DataSetSlice.js                # Async data loading (PapaParse)
│   ├── ItemInteractionSlice.js        # Selection state management
│   └── store.js                       # Redux store configuration
├── App.js                             # Main app + global controls
├── App.css                            # Global layout styles
└── index.js                           # Entry point

public/
└── data/
    └── communities.csv                # US Communities Crime Dataset (1,994 records)

Root Files:
├── Rapport_VDD_LIU_Yao.pdf           # Complete academic report (French)
└── README.md                          # This file
```

## 🛠️ Technical Stack

- **React** 18.3.1 - UI framework
- **D3.js** 7.9.0 - Data visualization
- **Redux Toolkit** 2.2.7 - State management
- **PapaParse** 5.5.3 - CSV parsing

## 📖 Design Patterns Used

### React Patterns
- **Hooks**: useState, useRef, useEffect, useSelector, useDispatch
- **Container/Presentational**: Separation of concerns between React and D3
- **Component Composition**: Modular, reusable components

### D3 Patterns
- **Enter-Update-Exit**: Data binding and updates
- **Scales**: Linear scales for scatterplot, color scales for hierarchy
- **Layouts**: Treemap, sunburst, pack, tree hierarchical layouts
- **Interactions**: Brush, click, hover events

### Redux Patterns
- **Unidirectional Data Flow**: Single source of truth
- **Async Thunks**: Data loading
- **Slice Pattern**: Modular state management

## 📊 Dataset

**Source**: US Communities Crime Dataset
- **Records**: 1,994 communities
- **Attributes**: 128 features including demographics, economic, social, and housing data
- **Hierarchy**: State → Community (2 levels)
- **Target Variable**: ViolentCrimesPerPop

## 🎨 User Interface Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Clear All]                    [Treemap] [Sunburst] etc.  │  ← Controls
├─────────────────────┬───────────────────────────────────────┤
│                     │                                       │
│   Scatterplot       │     Hierarchical Visualization        │
│   (medIncome vs     │     (Treemap/Sunburst/Pack/Tree)     │
│    ViolentCrimes)   │                                       │
│                     │                                       │
│   [Brush Selection] │     [Click to Select]                │
│                     │                                       │
├─────────────────────┴───────────────────────────────────────┤
│ Selected: Community1, Community2, Community3...             │  ← Selection Display
└─────────────────────────────────────────────────────────────┘
```

### Visual Encodings

**Scatterplot**:
- **X-axis**: medIncome (0-1 normalized)
- **Y-axis**: ViolentCrimesPerPop (0-1 normalized)
- **Opacity**: 0.3 (default) → 1.0 (selected)
- **Stroke**: Red 2px border when selected
- **Radius**: 3px (fixed to avoid overplotting)

**Hierarchy**:
- **Color**: Categorical scale by state (consistent across layouts)
- **Size**: Proportional to ViolentCrimesPerPop (treemap, circle pack)
- **Angle/Position**: Hierarchical structure (sunburst, tree)
- **Labels**: Bold state numbers on top-level nodes


## 🎓 Assignment Requirements Met

- ✅ Scatterplot with 2D brush interaction
- ✅ Hierarchical visualization with state→community levels
- ✅ Multiple hierarchical layouts tested (treemap, sunburst, pack, tree)
- ✅ Synchronized interactions between views
- ✅ Proper use of React design patterns
- ✅ D3 classes separated from React components
- ✅ Global update pattern with join()
- ✅ 2-page report with 4 required sections

## 🔍 User Workflow

### Scenario: Finding Safe Communities to Settle Down

**Step 1: Explore Overall Correlation**
- Observe the scatterplot: negative trend visible (↑income = ↓crime)
- Identify the "ideal zone": lower-right corner (high income, low crime)

**Step 2: Select Zone with Brush**
- Drag a rectangle on scatterplot to select communities in the ideal zone
- Watch them highlight in the hierarchy view
- Check bottom bar to see community names

**Step 3: Analyze by State**
- Switch to **Treemap** layout (recommended for overview)
- Large state rectangles = high total crime (avoid)
- Small tiled states = safer (consider)

**Step 4: Drill Down by State**
- Click a **state number** on treemap to select all its communities
- Scatterplot shows their distribution
- Assess if that state has consistently safe communities

**Step 5: Select Specific Community**
- Click on individual small rectangles
- View its position on scatterplot
- Note the community name at bottom

**Step 6: Compare Layouts**
- Try **Sunburst** for proportional view of states
- Try **Circle Pack** for aesthetic containment view
- Try **Tree** to explore specific branches

**Step 7: Reset and Refine**
- Click **Clear All** (red button) to reset
- Repeat with different brush selections
- Build a shortlist of candidate communities

**Tip**: States with many small tiles in Treemap = distributed safe communities = good candidates!

## 🐛 Troubleshooting

**Issue**: Application doesn't start
- **Solution**: Ensure Node.js is installed, run `npm install` then `npm start`

**Issue**: "selectedItems.map is not a function" error
- **Solution**: Fixed in latest version with type checking. Clear browser cache and refresh.

**Issue**: Visualizations don't appear
- **Solution**: Check browser console, ensure `communities.csv` loads correctly

**Issue**: Brush selection not working
- **Solution**: Must **drag** (not click) on scatterplot to create brush rectangle

**Issue**: Can't click on Treemap
- **Solution**: Fixed in latest version. Now supports clicking both state-level and community-level rectangles.

**Issue**: Brush doesn't clear when clicking "Clear All"
- **Solution**: Fixed with `shouldClearBrush` flag mechanism in Redux.

**Issue**: Performance issues with 1,994 points
- **Solution**: Optimized with D3 join pattern and fixed radius (3px)