# WordLabs

WordLabs is a web-based text utility application built with React.  
It allows users to perform a wide range of operations on sentences and words — including text formatting, encoding/decoding, and case transformations — in a fast and user-friendly interface.

**Live Demo:** [https://wordlabs.netlify.app/](https://wordlabs.netlify.app/)  
**Repository:** [https://github.com/Yash-Bandal/WordLabs](https://github.com/Yash-Bandal/WordLabs)

<br>

## Features

### Text Formatting
- Apply styles such as **bold**, *italic*, underline, strikethrough, and inline code.  
- Copy formatted text directly to the clipboard.

### Case Conversion
- Convert text to uppercase, lowercase, title case, sentence case, or capitalize each word.

### Encoding / Decoding
- Base64 encoding and decoding  
- URL encoding and decoding  
- HTML entity encoding and decoding

### Text Cleanup
- Remove extra spaces  
- Remove numbers, symbols, or punctuation  
- Count words, characters, and lines

### Additional Utilities
- Reverse words or sentences  
- Sort words alphabetically  
- Find and replace text  
- Word frequency analysis (optional feature)

### User Interface
- Clean and minimal design built with Tailwind CSS  
- Responsive layout for all devices  
- Light and dark mode support

<br>







## Project Structure

```
WordLabs/
├── public/                     # Static assets served directly (favicon, logos, redirects)
│   ├── logo-wp.png
│   └── _redirects
│
├── src/                        # React source code
│   ├── assets/                 # Local images and icons
│   │   ├── logo-wp.png
│   │   ├── logo.PNG
│   │   └── react.svg
│   │
│   ├── components/             # Reusable UI components
│   │   ├── About.jsx
│   │   ├── Alert.jsx
│   │   ├── Navbar.jsx
│   │   └── TextForm.jsx
│   │
│   ├── App.css                 # Main App styling
│   ├── App.jsx                 # Root React component
│   ├── index.css               # Global CSS (Tailwind imports)
│   └── main.jsx                # Application entry point
└── README.md                   # Project documentation
```

<br>

##  Tech Stack

- **Frontend**: React.js  
- **Styling**: Tailwind CSS  
- **Build Tool**: Vite  
- **Deployment**: Netlify  

<br>

##  Quick Start

### Prerequisites

- Web browser  
- Node.js (for React development)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Yash-Bandal/WordLabs.git
cd WordLabs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
```bash
npm run dev
```
<br>

#### 4. Open your browser at `http://localhost:5173`

## ow to Use

1. Enter or paste text in the editor  
2. Use toolbar buttons to format, convert, encode/decode, or analyze text  
3. Copy the result or download it as needed  

<br>


##  Key Implementation Details

- **Responsive Design**: Fully mobile-friendly layout  
- **Dark Mode Support**: Toggle between light and dark themes  
- **Performance**: Minimal and optimized React components  
- **Reusable Components**: Navbar, Alert, TextForm, About for modular structure  


<br>


##  Deployment

**Platform Used**: Netlify  

**Deployment Steps**:

1. Build the project
```bash
npm run build
```
2. Upload the `dist` folder to Netlify  
3. Configure `_redirects` for SPA routing  


<br>


##  Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add some amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  


<br>


## License

This project is licensed under the MIT License.


<br>


##  Acknowledgments

- [awesome-single-page-apps](https://github.com/Mystify7777/awesome-single-page-apps) for inspiration  
- Libraries and resources used in this project  


<br>

##  Contact

- **GitHub**: [@Yash-Bandal](https://github.com/Yash-Bandal)  


<br>

**Made with ❤️ for Hacktoberfest 2025**
