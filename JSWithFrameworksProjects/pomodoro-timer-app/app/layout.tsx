import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Focusly - Focus & Productivity Timer",
  description: "A modern, minimalist Pomodoro timer app to boost your productivity and manage your focus sessions effectively",
  generator: "Next.js",
  icons: {
    icon: "/pomodoro-logo.png",
    shortcut: "/pomodoro-logo.png",
    apple: "/pomodoro-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${spaceGrotesk.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
