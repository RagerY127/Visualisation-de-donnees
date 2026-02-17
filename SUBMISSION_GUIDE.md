# Assignment 2 Submission Guide

## Pre-Submission Checklist

### ✅ Code Requirements
- [x] Scatterplot with 2D brush interaction implemented
- [x] Hierarchical visualization with state→community levels
- [x] Multiple layouts (Treemap, Sunburst, Circle Pack, Tree)
- [x] Synchronized interactions between visualizations
- [x] React design patterns properly used (Hooks, useRef, useEffect, etc.)
- [x] D3 classes separated from React components
- [x] Global update pattern with join() function

### ✅ Documentation Requirements
- [x] README.md created
- [ ] Assignment2_Report.md converted to PDF
- [ ] Repository is public
- [ ] Code is committed to GitHub

### ✅ Testing
- [ ] Application runs with `npm install`
- [ ] Application starts with `npm start`
- [ ] Both visualizations render correctly
- [ ] Brush selection works on scatterplot
- [ ] Layout switching works in hierarchy
- [ ] Selections are synchronized between views

---

## Step-by-Step Submission Process

### Step 1: Convert Report to PDF

```bash
# Using Pandoc (recommended)
pandoc Assignment2_Report.md -o Assignment2_Report.pdf --pdf-engine=xelatex
```

See `CONVERT_TO_PDF.md` for alternative methods.

### Step 2: Test the Application

```bash
# Install dependencies
npm install

# Start the application
npm start
```

Verify that:
1. Application opens at http://localhost:3000
2. Both visualizations appear
3. You can brush on the scatterplot
4. Hierarchy responds to clicks
5. Layout buttons switch between treemap/sunburst/pack/tree

### Step 3: Prepare Git Repository

```bash
# Check current status
git status

# Add all new/modified files
git add .

# Create a commit with meaningful message
git commit -m "Complete Assignment 2: Interactive Community Crime Visualization

- Implement scatterplot with 2D brush selection
- Create hierarchical visualization with 4 layouts (treemap, sunburst, pack, tree)
- Add synchronized interactions between views
- Include comprehensive report and documentation"

# Push to GitHub
git push origin main
```

### Step 4: Make Repository Public

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Danger Zone"
4. Click "Change visibility"
5. Select "Make public"
6. Confirm the action

### Step 5: Verify Submission

Visit your GitHub repository URL and check:
- ✅ README.md is visible on the homepage
- ✅ Assignment2_Report.pdf is at the root
- ✅ All source code is present in `src/` directory
- ✅ package.json is present
- ✅ Repository is marked as "Public"

### Step 6: Submit to Arche

1. Copy your GitHub repository URL (e.g., `https://github.com/yourusername/your-repo`)
2. Go to Arche submission page
3. Paste the URL
4. Submit before the deadline: **February 12, 2026**

---

## Troubleshooting

### Issue: Git repository is not initialized

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Issue: Application won't start

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: Can't convert to PDF

Use online converter: https://www.markdowntopdf.com/

### Issue: Repository is private

1. Go to Settings → Danger Zone
2. Change visibility to Public

---

## Grading Criteria Reminder

- **30%** - Proper use of design patterns
  - React Hooks properly used
  - D3 classes separated from React
  - Clean code organization

- **40%** - Application running with synchronized interactions
  - Both visualizations work
  - Brush selection functions
  - Interactions are synchronized

- **30%** - Design and justification in report
  - Clear data characterization
  - Well-reasoned design choices
  - Layout comparison and preference

---

## Important Dates

- **Deadline**: February 12, 2026
- **Recommended submission**: 1-2 days before deadline (allow time for issues)

---

## Support

If you encounter issues:
1. Check README.md for setup instructions
2. Verify all dependencies are installed
3. Check browser console for errors
4. Ensure data file (communities.csv) is in public/data/

---

## Final Checklist Before Submission

- [ ] Code is pushed to GitHub
- [ ] Repository is PUBLIC
- [ ] Application runs with npm install + npm start
- [ ] Assignment2_Report.pdf is at repository root
- [ ] README.md is complete and helpful
- [ ] Repository URL is submitted on Arche
- [ ] Submission is before February 12, 2026

**Good luck! 🎓**
