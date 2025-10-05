# Movie Search App

A responsive movie search application that allows users to search and discover movies using the OMDB API. Built with React and TailwindCSS for a modern, clean user experience.

## 🚀 Live Demo

**[View Live Demo](https://movie-search-app-11.netlify.app/)**

## ✨ Features

- 🔍 **Movie Search**: Search for movies by title using OMDB API
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices  
- ⚡ **Real-time Results**: Instant search results as you type
- 🎬 **Movie Details**: View movie posters, titles, and release years
- 🚀 **Fast Loading**: Optimized performance with React and Vite

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: TailwindCSS 4.1
- **API**: OMDB API (Open Movie Database)
- **Build Tool**: Vite
- **Linting**: ESLint
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mystify7777/awesome-single-page-apps.git
   cd "awesome-single-page-apps/Movie Search App"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API Key (IMPORTANT) - Easy Setup**

   **Option A: Automated Setup (Recommended)**

   ```bash
   npm run setup
   ```

   This interactive script will guide you through getting and configuring your API key.

   **Option B: Manual Setup**
   
   ```bash
   # Copy the environment template
   cp .env.example .env.local
   ```

   **Get your API key**:
   - Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Register for a free API key
   - Add your API key to `.env.local`:

   ```env
   # For Vite (recommended)
   VITE_OMDB_API_KEY=your_api_key_here
   
   # For Create React App (if using CRA)
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```

   ⚠️ **NEVER commit your actual API key to GitHub!**

4. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

## 🎮 How to Use

1. **Enter Movie Title**: Type the name of any movie in the search box
2. **View Results**: Browse through the search results displayed as cards
3. **Explore Details**: See movie posters, titles, and release years
4. **Responsive Experience**: Use on any device - desktop, tablet, or mobile

## 🏗️ Project Structure

```bash
Movie Search App/
├── public/
│   └── vite.svg
├── src/
│   ├── Components/
│   │   └── Home.jsx        # Main search component
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.jsx             # Root component
│   ├── index.css
│   └── main.jsx            # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔒 Security Configuration

### API Key Management

This application uses the OMDB API which requires an API key. For security reasons, **NEVER hardcode API keys** in your source code.

**✅ Correct Way (Environment Variables):**
```javascript
const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const api = `https://www.omdbapi.com/?apikey=${apiKey}&s=${text}`;
```

**❌ Wrong Way (Hardcoded):**
```javascript
// NEVER do this - exposed to anyone who views your code!
const api = `https://www.omdbapi.com/?apikey=12345678&s=${text}`;
```

### Environment Setup

1. **Create `.env.local` file** in the project root
2. **Add your API key**: `VITE_OMDB_API_KEY=your_actual_key`
3. **Add `.env.local` to `.gitignore`** (already included)
4. **Share `.env.example`** with other developers (without real keys)

### For Contributors

If you're contributing to this project:

1. Get your own free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Create your own `.env.local` file using `.env.example` as a template
3. Never commit files containing real API keys

## 🌟 Key Implementation Details

- **API Integration**: Uses OMDB API for fetching movie data
- **State Management**: React hooks (useState) for managing search state and results
- **Error Handling**: Graceful handling of API errors and empty results
- **Responsive Design**: TailwindCSS utilities for mobile-first design
- **Performance**: Vite for fast development and optimized builds

## 🚀 Deployment

**Recommended Platform**: Vercel or Netlify

**Deployment Steps**:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Update the live demo link in this README

## 🤝 Contributing

If you find any bugs or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the [awesome-single-page-apps](https://github.com/Mystify7777/awesome-single-page-apps) repository and follows the same MIT License.

## 🙏 Acknowledgments

- Thank you to [OMDB API](http://www.omdbapi.com/) for providing the movie data
- [React](https://react.dev/) for the component framework
- [TailwindCSS](https://tailwindcss.com/) for styling utilities
- [Vite](https://vitejs.dev/) for the build tool

## 📧 Contact

- **GitHub**: [@Mystify7777](https://github.com/Mystify7777)

---

**Made with ❤️ for Hacktoberfest 2025**
