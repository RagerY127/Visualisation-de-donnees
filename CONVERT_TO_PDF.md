# How to Convert the Report to PDF

The report is provided as `Assignment2_Report.md`. You need to convert it to PDF before submission.

## Option 1: Using Pandoc (Recommended)

### Install Pandoc
- Windows: Download from https://pandoc.org/installing.html
- Mac: `brew install pandoc`
- Linux: `sudo apt-get install pandoc`

### Convert Command
```bash
pandoc Assignment2_Report.md -o Assignment2_Report.pdf --pdf-engine=xelatex
```

Or with better formatting:
```bash
pandoc Assignment2_Report.md -o Assignment2_Report.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V documentclass=article
```

## Option 2: Using VS Code Extension

1. Install "Markdown PDF" extension in VS Code
2. Open `Assignment2_Report.md`
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Markdown PDF: Export (pdf)"
5. Select the option and the PDF will be generated

## Option 3: Online Converter

Visit one of these websites:
- https://www.markdowntopdf.com/
- https://md2pdf.netlify.app/
- https://cloudconvert.com/md-to-pdf

Upload `Assignment2_Report.md` and download the PDF.

## Option 4: Print to PDF from Browser

1. Install a Markdown preview extension in your browser (e.g., "Markdown Viewer" for Chrome)
2. Open `Assignment2_Report.md` in the browser
3. Press `Ctrl+P` (or `Cmd+P` on Mac)
4. Select "Save as PDF"
5. Save as `Assignment2_Report.pdf`

## Verify PDF Quality

After conversion, check that:
- ✅ All sections are present (1. Data, 2. Design Rationale, 3. Conclusion, 4. Technical Summary)
- ✅ Formatting is preserved (headers, lists, code blocks)
- ✅ Length is approximately 2 pages
- ✅ Text is readable and properly sized

## Final File

Place the generated `Assignment2_Report.pdf` at the root of your repository before submission.
