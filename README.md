# Kazi's Gym App

A clean, mobile-first gym tracker for a 3-day Push / Pull / Legs split. Zero dependencies — open `index.html` directly in any browser or deploy to GitHub Pages in seconds.

---

## How to use

1. **Download / clone** this repository
2. **Drop your video files** into `assets/videos/` (see full list below)
3. Open `index.html` in Chrome, Safari, or any modern browser
4. That's it — no build step, no npm, no config

---

## Deploying to GitHub Pages

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Under *Source*, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save** — your app will be live at `https://<your-username>.github.io/<repo-name>/`

---

## Video files

Videos are **not included** in this repo — add your own `.mp4` files to `assets/videos/`.
Each file must be named exactly as shown below.

### Day 1 — Push

| Filename | Exercise |
|---|---|
| `smith-flat-press.mp4` | Smith Machine Flat Press |
| `smith-incline-press.mp4` | Smith Machine Incline Press |
| `cable-chest-fly.mp4` | Cable Chest Fly |
| `db-shoulder-press.mp4` | Dumbbell Shoulder Press |
| `db-lateral-raise.mp4` | Dumbbell Lateral Raise |
| `cable-face-pull.mp4` | Cable Face Pull |
| `cable-tricep-pushdown.mp4` | Cable Tricep Pushdown |
| `overhead-tricep-extension.mp4` | Overhead Tricep Extension |

### Day 2 — Pull

| Filename | Exercise |
|---|---|
| `lat-pulldown-wide.mp4` | Lat Pulldown (Wide Grip) |
| `lat-pulldown-underhand.mp4` | Lat Pulldown (Underhand Grip) |
| `straight-arm-pulldown.mp4` | Straight-Arm Cable Pulldown |
| `seated-cable-row.mp4` | Seated Cable Row |
| `single-arm-db-row.mp4` | Single-Arm Dumbbell Row |
| `rear-delt-fly.mp4` | Cable Face Pull / Rear Delt Fly |
| `db-alternating-curl.mp4` | Dumbbell Curl (Alternating) |
| `hammer-curl.mp4` | Hammer Curl |
| `preacher-curl.mp4` | Preacher Curl |

### Day 3 — Legs

| Filename | Exercise |
|---|---|
| `hack-squat.mp4` | Hack Squat |
| `leg-press.mp4` | Leg Press |
| `bulgarian-split-squat.mp4` | Bulgarian Split Squat |
| `lying-leg-curl.mp4` | Lying Leg Curl |
| `romanian-deadlift.mp4` | Romanian Deadlift (RDL) |
| `leg-extension.mp4` | Leg Extension |
| `standing-calf-raise.mp4` | Standing Calf Raise |
| `cable-crunch.mp4` | Cable Crunch |
| `plank.mp4` | Plank |
| `cardio-treadmill.mp4` | Cardio |

> If a video file is missing, the app shows a clean dark placeholder with the exercise name — no broken elements.

---

## Optional: timer sound

Place a file named `timer-end.mp3` in `assets/audio/` to use a custom chime when the rest timer hits zero. If the file is missing, the app generates a two-tone ascending chime (440 Hz → 660 Hz) using the Web Audio API automatically.

---

## Features

- **3-day PPL split** — Push, Pull, Legs with full exercise lists
- **Exercise videos** — auto-playing, looping, muted inline video per exercise
- **Set tracker** — tap SET DONE, rest timer starts automatically between sets
- **Circular rest timer** — animated SVG countdown, turns amber at 10 sec, skip anytime
- **Workout elapsed timer** — live MM:SS in the top bar
- **Progressive overload log** *(bonus)* — optional weight input per exercise; remembers your last logged weight across sessions
- **Resume workout** — close the app mid-workout and pick up exactly where you left off
- **Day Complete screen** — canvas confetti burst, self-drawing SVG checkmark, total workout time
- **Wake Lock API** — prevents phone screen from sleeping mid-workout
- **Haptic feedback** — vibration on set completion and timer end (supported devices)
- **Web Audio fallback** — chime sound generated in-browser if MP3 is absent

---

## Tech stack

| Layer | Tech |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 (custom properties, glassmorphism, `backdrop-filter`) |
| Logic | Vanilla JavaScript (ES2020, no frameworks) |
| Fonts | Google Fonts — Inter + Poppins |
| Audio | Web Audio API + optional MP3 |
| Storage | `localStorage` (progress + weight log) |
| Screen lock | Wake Lock API |

No npm. No build tools. No dependencies. Pure browser.

---

## Project structure

```
gym-app/
├── index.html
├── css/
│   ├── styles.css       ← All layout, glassmorphism, component styles
│   └── animations.css   ← All @keyframe definitions
├── js/
│   ├── app.js           ← Main SPA logic, screen navigation, state
│   ├── timer.js         ← Circular rest timer + bottom sheet
│   ├── sound.js         ← Audio manager (MP3 + Web Audio fallback)
│   └── data.js          ← Complete workout data (days, exercises, sets)
├── assets/
│   ├── videos/          ← Drop your .mp4 files here
│   └── audio/           ← Optional timer-end.mp3
└── README.md
```

---

*Built for Kazi. No excuses. Just reps.*
