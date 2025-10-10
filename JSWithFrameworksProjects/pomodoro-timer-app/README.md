# Focusly - Pomodoro Timer

A modern, minimalist Pomodoro timer app built with Next.js and TailwindCSS to boost your productivity and manage your focus sessions effectively.

## 🚀 Live Demo

**[View Live Demo](#)** *(Add your deployment URL here)*

## ✨ Features

- ✅ **Pomodoro Timer**: Classic 25-minute work sessions with short and long breaks
- ✅ **Dark/Light Theme**: Toggle between themes with persistent settings
- ✅ **Visual Progress**: Animated progress ring showing session progress
- ✅ **Audio Notifications**: Pleasant chime sound when sessions complete
- ✅ **Browser Notifications**: Desktop notifications for session transitions
- ✅ **Customizable Settings**: Adjust work duration, break lengths, and preferences
- ✅ **Session Tracking**: Track completed pomodoros with visual indicators
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Auto Session Transitions**: Optional automatic start of next sessions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4.1, Custom CSS Variables
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Font**: Space Grotesk (Google Fonts)
- **Build Tool**: Next.js (Turbopack)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/awesome-single-page-apps.git
   cd awesome-single-page-apps/JSWithFrameworksProjects/pomodoro-timer-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm run dev
   ```

4. **Open in browser**

   Navigate to `http://localhost:3000`

## 🎮 How to Use

1. **Choose your mode**: Work (25min), Short Break (5min), or Long Break (15min)
2. **Click Start**: Begin your focus session
3. **Stay focused**: Watch the progress ring count down
4. **Take breaks**: Automatic transitions to break modes after work sessions
5. **Customize settings**: Adjust durations and preferences in the settings dialog
6. **Toggle theme**: Switch between dark and light themes with the sun/moon button

## ⚙️ Customization

### Timer Settings
- **Work Duration**: 1-60 minutes (default: 25)
- **Short Break**: 1-30 minutes (default: 5)
- **Long Break**: 1-60 minutes (default: 15)
- **Pomodoros before Long Break**: 1-10 sessions (default: 4)

### Preferences
- **Auto-start next session**: Automatically begin the next timer
- **Sound notifications**: Play chime when sessions complete
- **Browser notifications**: Show desktop notifications

## 🎨 Design Features

- **Dynamic Color System**: Red for work, teal for short breaks, violet for long breaks
- **Smooth Animations**: CSS animations for progress and celebrations
- **Accessible Design**: ARIA labels and keyboard navigation
- **Mobile Optimized**: Touch-friendly interface with responsive layout

## 🏗️ Project Structure

```
pomodoro-timer-app/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx          # Main timer application
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   └── pomodoro-logo.png # App logo/favicon
└── package.json          # Dependencies and scripts
```

## 🌟 Key Implementation Details

- **Timer Logic**: Custom `useTimer` hook managing state and transitions
- **Theme System**: CSS variables with light/dark mode support
- **Audio System**: Web Audio API for notification sounds
- **State Management**: React hooks with localStorage persistence
- **Responsive Design**: Mobile-first approach with TailwindCSS

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Build for Production

```bash
pnpm run build
pnpm run start
```

### Deploy to Vercel

```bash
npx vercel
```

### Deploy to Netlify

```bash
pnpm run build
# Upload the .next folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🙏 Acknowledgments

- Pomodoro Technique by Francesco Cirillo
- UI components inspired by modern design systems
- Community feedback and contributions

---

**Made with ❤️ for productivity enthusiasts**

*Part of the [Awesome Single-Page Apps](../../) collection*