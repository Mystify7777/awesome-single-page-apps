# Focusly - Pomodoro Timer

A modern, minimalist Pomodoro timer app built with Next.js and TailwindCSS to boost your productivity and manage your focus sessions effectively.

## 🚀 Live Demo

[View Live Demo](https://focusly-sand.vercel.app/)


## ✨ Features

List the key features of your application:

- ✅ **Pomodoro Timer**: Classic 25-minute work sessions with customizable durations
- ✅ **Dark/Light Theme Toggle**: Switch between themes with persistent localStorage
- ✅ **Visual Progress Ring**: Animated SVG progress indicator with smooth transitions
- ✅ **Audio & Browser Notifications**: Pleasant chime sounds and desktop notifications
- ✅ **Session Management**: Track completed pomodoros with automatic mode transitions
- ✅ **Responsive Design**: Mobile-first design that works on all device sizes
- ✅ **Customizable Settings**: Adjust work/break durations, auto-start, and notification preferences
- ✅ **Accessibility Features**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

List the technologies you used:

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4.1, Custom CSS Variables, Space Grotesk Font
- **UI Components**: Radix UI primitives (Dialog, Switch, Button, etc.)
- **Icons**: Lucide React icon library
- **APIs**: Web Audio API, Notifications API, localStorage
- **Deployment**: Vercel


## � Quick Start

1. Clone the repo (or copy files into your project folder)

2. Install dependencies and run the development server:

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm package manager

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/awesome-single-page-apps.git
   cd awesome-single-page-apps/JSWithFrameworksProjects/pomodoro-timer-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # OR
   npm install
   ```

3. **Start development server**

   ```bash
   pnpm run dev
   # OR
   npm run dev
   ```

4. **Open in browser**

   Navigate to `http://localhost:3000`

## 🎮 How to Use


1. **Start a Session**: Click the "Start" button to begin a 25-minute work session
2. **Monitor Progress**: Watch the animated progress ring count down your session
3. **Take Breaks**: After work sessions, automatically transition to short (5min) or long (15min) breaks
4. **Customize Settings**: Click the settings button to adjust durations, enable auto-start, or toggle notifications
5. **Switch Themes**: Use the sun/moon button to toggle between dark and light themes
6. **Track Progress**: See completed pomodoro sessions with visual indicators

## 🏗️ Project Structure

```bash
pomodoro-timer-app/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx          # Main timer application logic
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui component library
│       ├── button.tsx    # Custom button component
│       ├── dialog.tsx    # Modal dialog component
│       ├── switch.tsx    # Toggle switch component
│       └── ...           # Other UI primitives
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   └── utils.ts         # Class name utilities
├── public/               # Static assets
│   └── pomodoro-logo.png # App logo and favicon
├── package.json          # Project dependencies and scripts
├── tailwind.config.js   # TailwindCSS configuration
└── README.md            # This documentation file
```

## 🌟 Key Implementation Details

Highlight interesting technical aspects of your project:

- **Custom Timer Hook**: `useTimer` hook manages complex state transitions between work/break modes
- **Theme System**: CSS custom properties with dark/light mode toggle and localStorage persistence
- **Progress Animation**: SVG-based circular progress ring with smooth CSS transitions
- **Audio Integration**: Web Audio API for notification sounds with volume control
- **Responsive Design**: Mobile-first approach using TailwindCSS breakpoints
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support
- **State Persistence**: Settings and preferences saved to localStorage
- **Performance**: Next.js optimization with code splitting and lazy loading

## 🚀 Deployment

Explain how you deployed your project:

**Platform Used**: Vercel/Netlify/GitHub Pages

**Deployment Steps**:

1. **Build the project**
   ```bash
   pnpm run build
   ```

2. **Deploy to Vercel** (Recommended)
   ```bash
   npx vercel
   ```

3. **OR Deploy to Netlify**
   ```bash
   # Drag and drop the .next folder to Netlify dashboard
   # OR connect your GitHub repository
   ```

4. **OR Deploy to GitHub Pages**
   ```bash
   # Export static files
   pnpm run build && pnpm run export
   ```

## 🤝 Contributing

If you find any bugs or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## � License

This project is part of the [awesome-single-page-apps](https://github.com/Mystify7777/awesome-single-page-apps) repository and follows the same MIT License.

## 🙏 Acknowledgments

- Thank you to [awesome-single-page-apps](https://github.com/Mystify7777/awesome-single-page-apps) for the platform
- Pomodoro Technique by Francesco Cirillo
- Radix UI for accessible component primitives
- TailwindCSS for utility-first styling
- Lucide React for beautiful icons
- Next.js team for the amazing React framework

## 📧 Contact

- **GitHub**: [@your-username](https://github.com/your-username)
- **Project**: [Focusly Pomodoro Timer](https://github.com/your-username/awesome-single-page-apps/tree/main/JSWithFrameworksProjects/pomodoro-timer-app)

---

**Made with ❤️ for Hacktoberfest 2025**