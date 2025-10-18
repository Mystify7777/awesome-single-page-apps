# 🎨 Paint Studio - Advanced Web Paint App

A professional-grade paint application built with **HTML5 Canvas, CSS3, and vanilla JavaScript**. Features a modern glassmorphism UI, comprehensive drawing tools, and advanced painting capabilities.

---

## ✨ Features

### 🖌️ Drawing Tools
* **Brush Tool** - Multiple shapes (round, square, spray)
* **Eraser Tool** - Clean erasing with adjustable size
* **Fill Tool** - Bucket fill for enclosed areas
* **Eyedropper** - Pick colors from canvas
* **Shape Tools** - Lines, rectangles, circles, triangles

### 🎨 Advanced Features
* **Color Palette** - 20+ preset colors + custom color picker
* **Opacity Control** - Adjustable brush transparency
* **Undo/Redo** - 50-state history management
* **Symmetry Mode** - Mirror drawing across center
* **Rainbow Mode** - Dynamic color cycling
* **Grid Overlay** - Precision alignment tool
* **Background Color** - Changeable canvas background

### 💾 File Operations
* **Save as PNG** - Export high-quality images
* **Load Images** - Import and draw over existing images
* **Auto-naming** - Timestamp-based file names

### 📱 Modern Interface
* **Glassmorphism Design** - Modern blur effects and gradients
* **Collapsible Sidebar** - Space-efficient tool organization
* **Top Navigation** - Quick access to primary tools
* **Touch Support** - Full mobile device compatibility
* **Keyboard Shortcuts** - Professional workflow support
* **Responsive Design** - Works on all screen sizes

---

## 🚀 Live Demo

**🌐 [Try Paint Studio Live](https://paint-j3wa2h095-writetosagniks-projects.vercel.app)**

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NeuralNik/awesome-single-page-apps.git
cd awesome-single-page-apps/vanillaJSProjects/paintApp
```

### 2️⃣ Run Locally

Simply open the `index.html` file in your browser:

```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

### 3️⃣ Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `B` | Brush Tool |
| `E` | Eraser Tool |
| `F` | Fill Tool |
| `I` | Eyedropper Tool |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |

## 🧠 Technical Details

### Architecture
- **HTML5 Canvas API** - High-performance 2D rendering with real-time drawing
- **CSS3 Glassmorphism** - Modern UI with backdrop filters and gradient overlays
- **Vanilla JavaScript** - Zero dependencies, lightweight (~42KB total)
- **Responsive Design** - CSS Grid, Flexbox, and mobile-first approach
- **Professional Layout** - Collapsible sidebar with top navigation bar

### Features Implementation
- **Advanced Flood Fill Algorithm** - Efficient bucket fill with boundary detection
- **Real-time Symmetry Drawing** - Mirror calculations across canvas center
- **50-State Undo/Redo System** - Complete canvas state management with memory optimization
- **Multi-touch Events** - Full mobile and tablet drawing support
- **Shape Drawing Tools** - Line, rectangle, circle, and triangle with live preview
- **Spray Paint Effect** - Particle-based brush with randomized positioning
- **Rainbow Mode** - Dynamic HSL color cycling during drawing
- **Grid Overlay System** - Precision alignment with toggleable 20px grid
- **File Operations** - Canvas to PNG/Blob conversion with auto-naming
- **Brush Preview System** - Real-time cursor preview with size and color indication

---

## 🧩 File Structure

```
paintApp/
├── index.html           # Main application (deployed version)
├── paintApp.html        # Development/source version
├── package.json         # NPM metadata and scripts
├── vercel.json          # Vercel deployment configuration
├── DEPLOYMENT.md        # Deployment guide and instructions
├── README.md           # Project documentation
├── .vercel/             # Vercel deployment settings (auto-generated)
└── .gitignore          # Git ignore patterns (auto-generated)
```

## 🌟 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🧑‍💻 Tech Stack

* **HTML5 Canvas API** - Advanced 2D rendering with optimized drawing operations
* **CSS3 (Modern)** - Glassmorphism effects, CSS Grid, Flexbox, and responsive design
* **Vanilla JavaScript (ES6+)** - Event handling, state management, and advanced algorithms
* **Google Fonts** - Inter typography for professional appearance
* **Vercel Platform** - Static hosting with global CDN and security headers

---

## � Recent Updates & Improvements

### ✅ **Completed Features (Latest Version)**
* ✅ **Complete UI Overhaul** - Modern glassmorphism design with professional layout
* ✅ **Collapsible Sidebar** - Space-efficient tool organization with toggle functionality
* ✅ **Top Navigation Bar** - Quick access toolbar for primary drawing tools
* ✅ **50-State Undo/Redo** - Full history management with memory optimization
* ✅ **Advanced Drawing Tools** - Shape tools (line, rectangle, circle, triangle) with live preview
* ✅ **PNG Export/Import** - High-quality image save/load functionality with auto-naming
* ✅ **Touch & Mobile Support** - Complete mobile device compatibility with responsive design
* ✅ **Special Effects** - Symmetry mode, rainbow mode, and precision grid overlay
* ✅ **Professional Brush System** - Multiple shapes (round, square, spray) with opacity control
* ✅ **Color Management** - 20+ preset colors, custom picker, and eyedropper tool
* ✅ **Vercel Deployment** - Live production deployment with CDN and security headers

### � **Performance Optimizations**
* ⚡ **Lightweight Codebase** - Zero dependencies, ~42KB total size
* ⚡ **Efficient Rendering** - Optimized canvas operations and memory management
* ⚡ **Fast Loading** - Static assets with instant startup
* ⚡ **Mobile Optimized** - Touch-friendly interface with gesture support

### 🎯 **Potential Future Enhancements**
* � **Layer System** - Multiple drawing layers with blend modes
* 🔮 **Text Tool** - Add text with custom fonts and styling
* 🔮 **Pattern Brushes** - Textured and patterned brush effects
* 🔮 **Animation Export** - GIF creation from drawing sessions
* 🔮 **Collaboration** - Real-time collaborative drawing
* 🔮 **Vector Mode** - SVG-based drawing with scalable graphics

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature/my-feature`)
3. Make changes to `paintApp.html` (development file)
4. Copy changes to `index.html` for deployment testing
5. Commit your changes (`git commit -m 'Add my feature'`)
6. Push to your branch (`git push origin feature/my-feature`)
7. Open a Pull Request 🚀

### Development Workflow
- **Edit**: `paintApp.html` (main development file)
- **Test**: Copy to `index.html` and test locally
- **Deploy**: Use `vercel --prod` to deploy changes
- **Live**: Changes appear at the live URL

---

## 📈 Project Statistics

- **Lines of Code**: ~1,200+ (HTML, CSS, JS combined)
- **File Size**: ~42KB (optimized for fast loading)
- **Features**: 25+ professional painting tools and effects
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Support**: iOS Safari, Chrome Mobile, Samsung Internet
- **Performance**: 95+ Lighthouse score across all categories

---

**Made with ❤️ using HTML5 Canvas, Modern CSS3, and Vanilla JavaScript.**  
**Deployed on 🚀 Vercel with global CDN and optimized performance.**
