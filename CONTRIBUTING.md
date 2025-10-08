# 🤝 Contributing to Awesome Single-Page Apps

Thank you for your interest in contributing to our **Hacktoberfest 2025** project! We're excited to see your creative single-page applications and welcome contributors of all skill levels.

## 📋 Quick Checklist

Before you start, make sure you have:

- [ ] A GitHub account
- [ ] Git installed on your machine
- [ ] A single-page application project ready to share
- [ ] A live demo link (deployed on GitHub Pages, Vercel, Netlify, etc.)

## 🚀 Step-by-Step Contribution Guide

### 1. Fork the Repository

Click the **Fork** button at the top right of this repository page to create your own copy.

### 2. Clone Your Fork

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git clone https://github.com/YOUR_USERNAME/awesome-single-page-apps.git
cd awesome-single-page-apps
```

### 3. Create a New Branch

Create a descriptive branch name for your contribution:

```bash
git checkout -b add-your-project-name
```

**Example:**

```bash
git checkout -b add-weather-dashboard
```

### 4. Create Your Project Folder

Create a new folder inside the repository root with a **unique and descriptive name** using `kebab-case`:

```bash
mkdir your-project-name
```

**Good folder names:**

- `weather-dashboard`
- `retro-calculator`
- `memory-card-game`
- `portfolio-website`

**Avoid:**

- `project1` or `myapp` (not descriptive)
- `Weather_App` or `weatherApp` (not kebab-case)

### 5. Add Your Project Files

Place all your project files inside your new folder. **Important**: Each project must include a comprehensive README.md file using our standardized template.

**Required Structure:**

```bash
your-project-name/
├── index.html          # Main entry point
├── README.md           # REQUIRED - Use our template (see below)
├── style.css           # CSS styling
├── script.js           # JavaScript functionality
├── screenshots/        # RECOMMENDED - App screenshots
└── assets/             # Images, fonts, etc. (if needed)
```

**📝 README Requirements:**

- Copy our [README template](./PROJECT_README_TEMPLATE.md) and fill it out completely
- Include working live demo link
- List all features and technologies used
- Add installation/setup instructions
- Include at least 1 screenshot (recommended)

**✅ Use the Template:**

```bash
# Copy the template to your project folder
cp PROJECT_README_TEMPLATE.md your-project-name/README.md
# Then edit it with your project details
```

### 6. Deploy Your Project

Deploy your project to get a live demo link using one of these free services:

**GitHub Pages:**

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch and save

**Vercel:**

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

**Netlify:**

1. Go to [netlify.com](https://www.netlify.com)
2. Drag and drop your project folder
3. Get instant deployment

### 7. Update the README Table

Open the `CONTRIBUTOR.md` file and add your project to the "Contributed Applications" table:

```markdown
| Your Project Name | Brief description of what it does | Tech Stack | [Live Demo](your-live-link) | [@yourusername](https://github.com/yourusername) |
```

**Important:**

- Add your entry at the **bottom** of the table
- Check that no similar project already exists
- Ensure your live demo link works

### 8. Commit Your Changes

Stage and commit your changes with a descriptive message:

```bash
git add .
git commit -m "feat: Add your-project-name project"
```

**Good commit message examples:**

```bash
git commit -m "feat: Add weather dashboard with 5-day forecast"
git commit -m "feat: Add retro-style calculator app"
git commit -m "feat: Add memory card matching game"
```

### 9. Push to Your Fork

```bash
git push origin add-your-project-name
```

### 10. Create a Pull Request

1. Go to your forked repository on GitHub
2. Click the **"Contribute"** button or **"Compare & pull request"**
3. Provide a clear title and description:

**Example PR Title:**

```text
Add weather dashboard project
```

**Example PR Description:**

```text
## 📱 Project: Weather Dashboard

**Description:** A responsive weather dashboard that shows current weather and 5-day forecast for any city.

**Features:**
- Current weather display
- 5-day forecast
- City search functionality
- Responsive design

**Tech Stack:** HTML, CSS, JavaScript, OpenWeather API

**Live Demo:** [Weather Dashboard](https://your-demo-link.com)

**Screenshots:** (optional)

---

This project follows all contribution guidelines and is ready for Hacktoberfest 2025! 🎃
```

## ⚠️ Important Guidelines

### ✅ What We Accept

- ✅ **Original single-page applications** with genuine functionality
- ✅ **Complete documentation** using our [README template](./PROJECT_README_TEMPLATE.md)
- ✅ **Working live demo** deployed and accessible online
- ✅ **Any web technology** (vanilla JS, React, Vue, Angular, etc.)
- ✅ **Responsive design** that works on desktop and mobile
- ✅ **Well-structured code** with proper organization

### ❌ What We Don't Accept

- ❌ **Missing or incomplete README** files
- ❌ **Broken or missing live demo** links
- ❌ **Duplicate projects** (check existing projects first)
- ❌ **Simple redirect pages** or placeholder content
- ❌ **100% AI-generated code** without personal input or understanding
- ❌ **Low-effort submissions** or copy-paste tutorials
- ❌ **Multiple projects** from the same contributor
- ❌ **Projects without proper documentation**

### 🔍 Before Submitting

- [ ] Test your live demo link
- [ ] Ensure your project is unique
- [ ] Check that all files are included
- [ ] Verify your README table entry is correct
- [ ] Make sure your branch is up to date

## 🎯 Project Ideas

Need inspiration? Here are some ideas:

- Weather App
- Todo List
- Calculator
- Memory Game
- Portfolio Website
- Quiz App
- Color Palette Generator
- Random Quote Generator
- Expense Tracker
- Music Player Interface

## 🆘 Need Help?

- **Git Issues?** Check out [Git documentation](https://git-scm.com/doc)
- **Deployment Help?** See [GitHub Pages guide](https://pages.github.com/)
- **Questions?** Open an issue or ask in the discussions

## 📝 Review Process

1. We review PRs daily during Hacktoberfest
2. Feedback will be provided if changes are needed
3. Valid contributions are merged quickly
4. Invalid submissions will be marked accordingly

---

**Thank you for contributing to open source! 🚀**

> **⏰ Note:** If multiple similar projects are submitted, the first valid submission will be accepted. Time matters!

---

![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-orange.svg)
