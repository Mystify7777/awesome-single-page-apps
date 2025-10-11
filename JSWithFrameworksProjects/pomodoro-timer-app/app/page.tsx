"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Play, Pause, RotateCcw, SkipForward, Settings, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

/* Focusly - A modern Pomodoro Timer with modular components */

type Mode = "work" | "short" | "long"

type SettingsState = {
  workDuration: number // minutes
  shortBreakDuration: number
  longBreakDuration: number
  pomodorosBeforeLongBreak: number
  autoStartNextSession: boolean
  soundEnabled: boolean
  notificationsEnabled: boolean
}

const defaultSettings: SettingsState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  pomodorosBeforeLongBreak: 4,
  autoStartNextSession: false,
  soundEnabled: true,
  notificationsEnabled: false,
}

function useSound(enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // A short, pleasant chime sound for timer completion notifications
    const src =
      "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAAAAAAAAPwAAAAAAAACQAAACAgAAAB9AAAACAAACcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    const a = new Audio(src)
    a.volume = 0.7
    audioRef.current = a
  }, [])

  const play = useCallback(() => {
    if (!enabled) return
    audioRef.current?.currentTime !== undefined && (audioRef.current.currentTime = 0)
    audioRef.current?.play().catch(() => {})
  }, [enabled])

  return { play }
}

function useTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check if user has a preference stored, otherwise default to dark
    const stored = localStorage.getItem('theme')
    if (stored === 'light') {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    } else {
      // Default to dark theme
      setIsDark(true)
      document.documentElement.classList.add('dark')
      if (!stored) {
        localStorage.setItem('theme', 'dark')
      }
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return { isDark, toggleTheme }
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

function useTimer(settings: SettingsState) {
  const [mode, setMode] = useState<Mode>("work")
  const [isRunning, setIsRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(settings.workDuration * 60)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [sessionInCycle, setSessionInCycle] = useState(1) // 1..pomodorosBeforeLongBreak

  // reset timeRemaining when durations or mode change
  useEffect(() => {
    if (mode === "work") setTimeRemaining(settings.workDuration * 60)
    if (mode === "short") setTimeRemaining(settings.shortBreakDuration * 60)
    if (mode === "long") setTimeRemaining(settings.longBreakDuration * 60)
  }, [settings.workDuration, settings.shortBreakDuration, settings.longBreakDuration, mode])

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) return 0
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  const nextMode = useCallback((): Mode => {
    if (mode === "work") {
      // decide break type
      if (sessionInCycle >= settings.pomodorosBeforeLongBreak) return "long"
      return "short"
    }
    // from any break back to work
    return "work"
  }, [mode, sessionInCycle, settings.pomodorosBeforeLongBreak])

  const controls = {
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset: () => {
      setIsRunning(false)
      if (mode === "work") setTimeRemaining(settings.workDuration * 60)
      if (mode === "short") setTimeRemaining(settings.shortBreakDuration * 60)
      if (mode === "long") setTimeRemaining(settings.longBreakDuration * 60)
    },
    skip: () => {
      setIsRunning(false)
      setTimeRemaining(0)
    },
  }

  const onComplete = useCallback(() => {
    // Update counters
    if (mode === "work") {
      setCompletedPomodoros((c) => c + 1)
      setSessionInCycle((s) => (s >= settings.pomodorosBeforeLongBreak ? 1 : s + 1))
    } else if (mode !== "work") {
      // break ended, nothing else to count
    }

    // Transition mode
    const nm = nextMode()
    setMode(nm)
    // set time for next mode
    if (nm === "work") setTimeRemaining(settings.workDuration * 60)
    if (nm === "short") setTimeRemaining(settings.shortBreakDuration * 60)
    if (nm === "long") setTimeRemaining(settings.longBreakDuration * 60)

    setIsRunning(settings.autoStartNextSession)
  }, [
    mode,
    nextMode,
    settings.autoStartNextSession,
    settings.pomodorosBeforeLongBreak,
    settings.workDuration,
    settings.shortBreakDuration,
    settings.longBreakDuration,
  ])

  return {
    mode,
    setMode,
    isRunning,
    timeRemaining,
    setTimeRemaining,
    completedPomodoros,
    sessionInCycle,
    controls,
    onComplete,
  }
}

function ProgressRing({
  size,
  stroke = 8,
  progress, // 0..1
  animated = true,
  running = false,
}: {
  size: number
  stroke?: number
  progress: number
  animated?: boolean
  running?: boolean
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(1, progress))
  const dashOffset = circumference * (1 - clamped)

  return (
    <div
      className={cn("relative transition-transform", running && "motion-safe:[animation:pomodoro-pulse_2s_infinite]")}
      style={{ filter: "drop-shadow(0 0 12px var(--accent-current))" }}
    >
      <svg className="block -rotate-90" width={size} height={size}>
        <circle
          stroke="rgba(148, 163, 184, 0.25)" /* slate-400 @ 25% for background ring */
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="var(--accent-current)"
          fill="transparent"
          strokeLinecap="round"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: dashOffset,
            transition: animated ? "stroke-dashoffset 1s linear" : undefined,
          }}
        />
      </svg>
    </div>
  )
}

function ModeBadge({ mode }: { mode: Mode }) {
  const label = mode === "work" ? "FOCUS TIME" : mode === "short" ? "SHORT BREAK" : "LONG BREAK"
  return (
    <div
      className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
      style={{
        color: "var(--accent-current)",
        background: "color-mix(in oklab, var(--accent-current) 12%, transparent)",
        border: "1px solid color-mix(in oklab, var(--accent-current) 35%, transparent)",
        boxShadow: "0 0 20px color-mix(in oklab, var(--accent-current) 28%, transparent)",
      }}
      aria-live="polite"
    >
      {label}
    </div>
  )
}

function Controls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}: {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button
        onClick={isRunning ? onPause : onStart}
        className="h-12 w-32 rounded-xl text-white shadow-md"
        style={{
          background: "var(--accent-current)",
          boxShadow: "0 4px 12px color-mix(in oklab, var(--accent-current) 30%, transparent)",
        }}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
        {isRunning ? "Pause" : "Start"}
      </Button>

      <Button variant="secondary" onClick={onReset} className="h-12 w-28 rounded-xl border" aria-label="Reset timer">
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>

      <Button
        variant="secondary"
        onClick={onSkip}
        className="h-12 w-28 rounded-xl border"
        aria-label="Skip to next session"
      >
        <SkipForward className="mr-2 h-4 w-4" />
        Skip
      </Button>
    </div>
  )
}

function SessionCounter({ current, total, completed }: { current: number; total: number; completed: number }) {
  const items = Array.from({ length: total }, (_, i) => i < completed)
  return (
    <div className="text-center text-sm text-muted-foreground" aria-live="polite">
      <div className="mb-1">
        {items.map((done, idx) => (
          <span key={idx} className={cn("mx-0.5 text-lg", idx + 1 === current && "animate-pulse")}>
            {done ? "🍅" : "⚪"}
          </span>
        ))}
      </div>
      <span>
        Session {Math.min(current, total)} of {total}
      </span>
    </div>
  )
}

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <Button
      variant="ghost"
      onClick={onToggle}
      className="h-10 w-10 rounded-full p-0 text-muted-foreground hover:text-foreground"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

function SettingsDialog({
  value,
  onChange,
}: {
  value: SettingsState
  onChange: (next: SettingsState) => void
}) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<SettingsState>(value)

  useEffect(() => setDraft(value), [value])

  const update = <K extends keyof SettingsState>(key: K, v: SettingsState[K]) => setDraft((d) => ({ ...d, [key]: v }))

  const save = () => {
    onChange(draft)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-10 px-3 rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="work">Work (min)</Label>
              <Input
                id="work"
                type="number"
                min={1}
                max={60}
                value={draft.workDuration}
                onChange={(e) => update("workDuration", Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="short">Short Break</Label>
              <Input
                id="short"
                type="number"
                min={1}
                max={30}
                value={draft.shortBreakDuration}
                onChange={(e) => update("shortBreakDuration", Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="long">Long Break</Label>
              <Input
                id="long"
                type="number"
                min={1}
                max={60}
                value={draft.longBreakDuration}
                onChange={(e) => update("longBreakDuration", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="grid gap-0.5">
                <Label>Auto-start next</Label>
                <span className="text-xs text-muted-foreground">Start next session automatically</span>
              </div>
              <Switch checked={draft.autoStartNextSession} onCheckedChange={(v) => update("autoStartNextSession", v)} />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="grid gap-0.5">
                <Label>Sound</Label>
                <span className="text-xs text-muted-foreground">Play chime on complete</span>
              </div>
              <Switch checked={draft.soundEnabled} onCheckedChange={(v) => update("soundEnabled", v)} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="grid gap-0.5">
              <Label>Desktop notifications</Label>
              <span className="text-xs text-muted-foreground">Show banner when timer completes</span>
            </div>
            <Switch checked={draft.notificationsEnabled} onCheckedChange={(v) => update("notificationsEnabled", v)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pomos">Pomodoros before long break</Label>
            <Input
              id="pomos"
              type="number"
              min={1}
              max={10}
              value={draft.pomodorosBeforeLongBreak}
              onChange={(e) => update("pomodorosBeforeLongBreak", Number(e.target.value))}
            />
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button onClick={save} className="flex-1" style={{ background: "var(--accent-current)" }}>
              Save Changes
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Page() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)
  const {
    mode,
    setMode,
    isRunning,
    timeRemaining,
    setTimeRemaining,
    completedPomodoros,
    sessionInCycle,
    controls,
    onComplete,
  } = useTimer(settings)
  const { play } = useSound(settings.soundEnabled)
  const { isDark, toggleTheme } = useTheme()

  // Notification permission request (lazy)
  useEffect(() => {
    if (settings.notificationsEnabled && typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().catch(() => {})
      }
    }
  }, [settings.notificationsEnabled])

  // Handle completion
  useEffect(() => {
    if (timeRemaining === 0) {
      // celebration, sound, notify
      play()
      if (
        settings.notificationsEnabled &&
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        const title = mode === "work" ? "Pomodoro Complete! 🍅" : "Break Finished! ✅"
        const body = mode === "work" ? "Work session finished. Time for a break!" : "Break over. Back to focus!"
        try {
          new Notification(title, { body })
        } catch {}
      }

      // small delay to show 00:00 then transition
      const t = setTimeout(() => onComplete(), 600)
      return () => clearTimeout(t)
    }
  }, [timeRemaining, mode, onComplete, play, settings.notificationsEnabled])

  const totalForCycle = settings.pomodorosBeforeLongBreak
  const progress = useMemo(() => {
    const total =
      mode === "work"
        ? settings.workDuration * 60
        : mode === "short"
          ? settings.shortBreakDuration * 60
          : settings.longBreakDuration * 60
    return (total - timeRemaining) / total
  }, [mode, timeRemaining, settings.workDuration, settings.shortBreakDuration, settings.longBreakDuration])

  // size responsive
  const size = 300 // desktop default; relies on container to shrink on small screens

  const modeClass = mode === "work" ? "mode-work" : mode === "short" ? "mode-short" : "mode-long"

  return (
    <main className={cn("min-h-dvh bg-background text-foreground", modeClass)}>
      <header className="sticky top-0 z-10 border-b border-border/50 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 w-full items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/pomodoro-logo.png"
              alt="Focusly Timer Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-contain"
            />
            <h1 className="text-balance text-lg font-semibold">Focusly</h1>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <SettingsDialog value={settings} onChange={setSettings} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-screen-sm gap-8 px-4 py-8 sm:gap-10 sm:py-12">
        <div className="flex justify-center">
          <ModeBadge mode={mode} />
        </div>

        <div
          className={cn(
            "mx-auto grid place-items-center",
            timeRemaining === 0 && "motion-safe:[animation:pomodoro-celebrate_600ms_ease-out]",
          )}
        >
          <div className="relative">
            <ProgressRing size={size} progress={progress} running={isRunning} />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div
                  className="font-mono text-6xl font-bold sm:text-7xl lg:text-8xl"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {formatTime(timeRemaining)}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {mode === "work" ? "Focus" : mode === "short" ? "Short break" : "Long break"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SessionCounter current={sessionInCycle} total={totalForCycle} completed={completedPomodoros % totalForCycle} />

        <Controls
          isRunning={isRunning}
          onStart={controls.start}
          onPause={controls.pause}
          onReset={controls.reset}
          onSkip={controls.skip}
        />

        {/* Accessibility live region for state updates */}
        <div className="sr-only" aria-live="polite">
          {isRunning ? "Timer running" : "Timer paused"}. Mode {mode}. {formatTime(timeRemaining)} remaining.
        </div>

        {/* Secondary controls: quick mode switch (optional) */}
        <div className="mt-2 flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span>Quick switch:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMode("work")
              controls.reset()
            }}
          >
            Work
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMode("short")
              controls.reset()
            }}
          >
            Short
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMode("long")
              controls.reset()
            }}
          >
            Long
          </Button>
        </div>
      </div>
    </main>
  )
}
