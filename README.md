# Community Crime Analysis Visualization

Interactive data visualization application built with React and D3.js to help users decide where to settle down based on community safety and socioeconomic factors.

## 🎯 Project Overview

This project implements two synchronized visualizations:
1. **Scatterplot with 2D Brush Interaction** - Explore relationships between income and crime rates
2. **Hierarchical Visualization** - Navigate state→community hierarchy with multiple layout options (Treemap, Sunburst, Circle Pack, Tree)

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

### Scatterplot Features
- ✅ **2D Brush Selection**: Select multiple communities by dragging a rectangular brush
- ✅ **Attribute Correlation**: Visualize Median Income vs Violent Crime Rate
- ✅ **Interactive Highlighting**: Selected items are highlighted with increased opacity and red borders
- ✅ **Axis Labels**: Clear labels and titles for easy interpretation

### Hierarchical Visualization Features
- ✅ **Multiple Layouts**: Switch between 4 different layouts:
  - **Treemap**: Space-efficient rectangular tiles
  - **Sunburst**: Radial circular layout
  - **Circle Pack**: Nested circles
  - **Tree**: Traditional node-link diagram
- ✅ **Click Interaction**: Click on communities to select them
- ✅ **Hover Effects**: Visual feedback on mouse hover
- ✅ **State Grouping**: Communities organized by state

### Synchronized Interactions
- 🔗 Selections in one view are reflected in the other
- 🔗 Brush selection on scatterplot highlights communities in hierarchy
- 🔗 Clicking nodes in hierarchy highlights points in scatterplot

## 📁 Project Structure

```
src/
├── components/
│   ├── scatterplot/
│   │   ├── ScatterplotContainer.js    # React container
│   │   ├── Scatterplot-d3.js          # D3 visualization class
│   │   └── Scatterplot.css            # Styles
│   └── hierarchy/
│       ├── HierarchyContainer.js      # React container
│       ├── Hierarchy-d3.js            # D3 visualization class
│       └── Hierarchy.css              # Styles
├── redux/
│   ├── DataSetSlice.js                # Data loading
│   ├── ItemInteractionSlice.js        # Selection state
│   └── store.js                       # Redux store configuration
├── App.js                             # Main application
└── index.js                           # Entry point
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

## 🎨 User Interface

### Scatterplot
- **X-axis**: Median Income (medIncome)
- **Y-axis**: Violent Crimes Per Population (ViolentCrimesPerPop)
- **Interaction**: Drag to create brush selection
- **Visual Encoding**: 
  - Position: Income and crime rate
  - Opacity: 0.3 (unselected) to 1.0 (selected)
  - Stroke: Red border for selected items

### Hierarchy Visualization
- **Layout Controls**: Buttons to switch between layouts
- **Color**: Different colors for each state
- **Size**: Represents crime rate in treemap and circle pack
- **Interaction**: Click nodes to select, hover for preview

## 📝 Report

See `Assignment2_Report.md` for detailed analysis including:
- Data characterization and user tasks
- Design rationale for each visualization
- Comparison of hierarchical layouts
- Preferred layout justification
- Technical implementation details

**Note**: Convert `Assignment2_Report.md` to PDF before submission using tools like:
- Pandoc: `pandoc Assignment2_Report.md -o Assignment2_Report.pdf`
- Online converters: markdown-to-pdf.com
- VS Code extensions: Markdown PDF

## 🎓 Assignment Requirements Met

- ✅ Scatterplot with 2D brush interaction
- ✅ Hierarchical visualization with state→community levels
- ✅ Multiple hierarchical layouts tested (treemap, sunburst, pack, tree)
- ✅ Synchronized interactions between views
- ✅ Proper use of React design patterns
- ✅ D3 classes separated from React components
- ✅ Global update pattern with join()
- ✅ 2-page report with 4 required sections

## 📦 Submission Checklist

- [ ] Code pushed to public GitHub repository
- [ ] Application runs with `npm install` + `npm start`
- [ ] Report (PDF) at root of repository
- [ ] Repository URL submitted on Arche

## 🔍 How to Use

1. **Explore Income-Crime Relationship**: 
   - Observe the scatterplot to see how median income relates to crime rates
   - Lower right area = high income, low crime (ideal)

2. **Select Communities of Interest**:
   - Drag a rectangle on the scatterplot to select multiple communities
   - Watch the hierarchy visualization highlight selected communities

3. **Switch Hierarchy Layouts**:
   - Click layout buttons (Treemap, Sunburst, Pack, Tree) to compare different views
   - Each layout offers unique insights into the data

4. **Drill Down by State**:
   - Click on states or communities in the hierarchy
   - See their position in the scatterplot

5. **Make Decisions**:
   - Identify states with many safe, affluent communities
   - Select specific communities for further research

## 🐛 Troubleshooting

**Issue**: Application doesn't start
- **Solution**: Ensure Node.js is installed, run `npm install` first

**Issue**: Visualizations don't appear
- **Solution**: Check browser console for errors, ensure data loads correctly

**Issue**: Brush selection not working
- **Solution**: Make sure to drag (not click) on the scatterplot

## 📄 License

This project is created for academic purposes as part of Assignment 2.

## 👨‍💻 Author

**Date**: February 2026
**Course**: Data Visualization Development

---

**Note**: This README provides technical documentation. For design rationale and analysis, please refer to `Assignment2_Report.md`.
