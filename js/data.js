// data.js — All workout data for Kazi's Gym App

const workoutData = {
  days: [
    {
      id: 1,
      label: "DAY 1",
      name: "PUSH",
      weekday: "Monday",
      muscles: "Chest · Shoulders · Triceps",
      exercises: [
        {
          name: "Smith Machine Flat Press",
          muscles: "Chest, front delts, triceps",
          sets: 4,
          reps: "6–10",
          rest: 105,
          equipment: ["Smith Machine", "Iso-Lateral Bench Press Machine", "Chest Press Machine"],
          video: "assets/videos/smith-flat-press.mp4"
        },
        {
          name: "Smith Machine Incline Press",
          muscles: "Upper chest, front delts, triceps",
          sets: 3,
          reps: "8–12",
          rest: 105,
          equipment: ["Smith Machine (bench 30–45°)", "Incline Dumbbell Press", "Incline Press Machine"],
          video: "assets/videos/smith-incline-press.mp4"
        },
        {
          name: "Cable Chest Fly",
          muscles: "Pec major",
          sets: 3,
          reps: "12–15",
          rest: 68,
          equipment: ["Cable Tower", "Pec Deck / Butterfly Machine", "Dumbbell Fly on bench"],
          video: "assets/videos/cable-chest-fly.mp4"
        },
        {
          name: "Dumbbell Shoulder Press",
          muscles: "Front & side delts, triceps",
          sets: 4,
          reps: "8–12",
          rest: 90,
          equipment: ["Dumbbells on adjustable bench", "Shoulder Press Machine", "Smith Machine OHP"],
          video: "assets/videos/db-shoulder-press.mp4"
        },
        {
          name: "Dumbbell Lateral Raise",
          muscles: "Side deltoid",
          sets: 3,
          reps: "12–20",
          rest: 68,
          equipment: ["Dumbbells", "Cable lateral raise (single arm)"],
          video: "assets/videos/db-lateral-raise.mp4"
        },
        {
          name: "Cable Face Pull",
          muscles: "Rear delt, traps, rotator cuff",
          sets: 3,
          reps: "15–20",
          rest: 68,
          equipment: ["Cable Tower with rope", "Rear Delt Machine", "Dumbbell rear delt fly"],
          video: "assets/videos/cable-face-pull.mp4"
        },
        {
          name: "Cable Tricep Pushdown",
          muscles: "Triceps (all heads)",
          sets: 3,
          reps: "10–15",
          rest: 60,
          equipment: ["Cable Tower (rope or bar)", "Tricep Press Machine"],
          video: "assets/videos/cable-tricep-pushdown.mp4"
        },
        {
          name: "Overhead Tricep Extension",
          muscles: "Triceps long head",
          sets: 3,
          reps: "10–15",
          rest: 60,
          equipment: ["Dumbbell overhead", "Cable overhead extension", "EZ-bar skull crushers on bench"],
          video: "assets/videos/overhead-tricep-extension.mp4"
        }
      ]
    },
    {
      id: 2,
      label: "DAY 2",
      name: "PULL",
      weekday: "Wednesday",
      muscles: "Back · Lats · Traps · Biceps · Rear Delts",
      exercises: [
        {
          name: "Lat Pulldown (Wide Grip)",
          muscles: "Lats, lower traps, biceps",
          sets: 4,
          reps: "8–12",
          rest: 105,
          equipment: ["Lat Pulldown Machine", "Cable Tower with bar", "Assisted Pull-Up Machine"],
          video: "assets/videos/lat-pulldown-wide.mp4"
        },
        {
          name: "Lat Pulldown (Underhand Grip)",
          muscles: "Lower lats, biceps",
          sets: 3,
          reps: "10–12",
          rest: 105,
          equipment: ["Lat Pulldown Machine (reverse grip)", "Seated Cable Row underhand"],
          video: "assets/videos/lat-pulldown-underhand.mp4"
        },
        {
          name: "Straight-Arm Cable Pulldown",
          muscles: "Lats isolation",
          sets: 3,
          reps: "12–15",
          rest: 68,
          equipment: ["Cable Tower (bar or rope at top, arms straight)", "Dumbbell pullover on bench"],
          video: "assets/videos/straight-arm-pulldown.mp4"
        },
        {
          name: "Seated Cable Row",
          muscles: "Mid-back, rhomboids, traps, lats",
          sets: 4,
          reps: "8–12",
          rest: 105,
          equipment: ["Cable Tower (V-bar or wide bar)", "Machine Row", "Smith Machine bent-over row"],
          video: "assets/videos/seated-cable-row.mp4"
        },
        {
          name: "Single-Arm Dumbbell Row",
          muscles: "Lats, rhomboids",
          sets: 3,
          reps: "10–12 each",
          rest: 90,
          equipment: ["Dumbbell + flat bench", "Single-arm cable row"],
          video: "assets/videos/single-arm-db-row.mp4"
        },
        {
          name: "Cable Face Pull / Rear Delt Fly",
          muscles: "Rear delts, traps",
          sets: 3,
          reps: "15–20",
          rest: 68,
          equipment: ["Cable Tower (rope at eye level)", "Reverse Pec Deck", "Dumbbell rear delt fly"],
          video: "assets/videos/rear-delt-fly.mp4"
        },
        {
          name: "Dumbbell Curl (Alternating)",
          muscles: "Biceps long & short head",
          sets: 3,
          reps: "10–12 each",
          rest: 68,
          equipment: ["Dumbbells", "Barbell curl", "Cable curl (cable low)"],
          video: "assets/videos/db-alternating-curl.mp4"
        },
        {
          name: "Hammer Curl",
          muscles: "Brachialis, forearms",
          sets: 3,
          reps: "10–12",
          rest: 68,
          equipment: ["Dumbbells (neutral grip)", "Cable rope hammer curl"],
          video: "assets/videos/hammer-curl.mp4"
        },
        {
          name: "Preacher Curl",
          muscles: "Bicep peak",
          sets: 2,
          reps: "10–15",
          rest: 60,
          equipment: ["Preacher Curl Machine", "Preacher bench + dumbbell", "Incline dumbbell curl"],
          video: "assets/videos/preacher-curl.mp4"
        }
      ]
    },
    {
      id: 3,
      label: "DAY 3",
      name: "LEGS",
      weekday: "Friday",
      muscles: "Quads · Hamstrings · Glutes · Calves · Core",
      exercises: [
        {
          name: "Hack Squat",
          muscles: "Quads, glutes, hamstrings",
          sets: 4,
          reps: "8–12",
          rest: 150,
          equipment: ["Hack Squat Machine", "Smith Machine squat", "Goblet squat with dumbbell"],
          video: "assets/videos/hack-squat.mp4"
        },
        {
          name: "Leg Press",
          muscles: "Quads, glutes, hamstrings",
          sets: 4,
          reps: "10–15",
          rest: 150,
          equipment: ["Leg Press Machine", "Single-leg press"],
          video: "assets/videos/leg-press.mp4"
        },
        {
          name: "Bulgarian Split Squat",
          muscles: "Quads, glutes",
          sets: 3,
          reps: "10–12 each",
          rest: 120,
          equipment: ["Dumbbells + bench", "Smith Machine split squat"],
          video: "assets/videos/bulgarian-split-squat.mp4"
        },
        {
          name: "Lying Leg Curl",
          muscles: "Hamstrings",
          sets: 3,
          reps: "10–15",
          rest: 83,
          equipment: ["Lying Leg Curl Machine", "Seated Leg Curl Machine"],
          video: "assets/videos/lying-leg-curl.mp4"
        },
        {
          name: "Romanian Deadlift (RDL)",
          muscles: "Hamstrings, glutes, lower back",
          sets: 3,
          reps: "10–12",
          rest: 120,
          equipment: ["Dumbbells", "Smith Machine RDL"],
          video: "assets/videos/romanian-deadlift.mp4"
        },
        {
          name: "Leg Extension",
          muscles: "Quadriceps isolation",
          sets: 3,
          reps: "12–15",
          rest: 83,
          equipment: ["Leg Extension Machine"],
          video: "assets/videos/leg-extension.mp4"
        },
        {
          name: "Standing Calf Raise",
          muscles: "Gastrocnemius, soleus",
          sets: 4,
          reps: "15–20",
          rest: 60,
          equipment: ["Standing Calf Raise Machine", "Smith Machine calf raise", "Leg Press toes on edge"],
          video: "assets/videos/standing-calf-raise.mp4"
        },
        {
          name: "Cable Crunch",
          muscles: "Rectus abdominis",
          sets: 3,
          reps: "15–20",
          rest: 60,
          equipment: ["Cable Tower (rope, kneel down)", "Ab Crunch Machine", "Decline sit-up"],
          video: "assets/videos/cable-crunch.mp4"
        },
        {
          name: "Plank",
          muscles: "Core, transverse abs",
          sets: 3,
          reps: "30–60 sec",
          rest: 60,
          equipment: ["Floor mat", "Ab wheel rollout"],
          video: "assets/videos/plank.mp4"
        },
        {
          name: "Cardio",
          muscles: "Cardiovascular, fat burn",
          sets: 1,
          reps: "20–25 min",
          rest: 0,
          equipment: ["Treadmill incline walk (3.5–4 mph, 10–15% incline)", "StairMaster", "Arc Trainer"],
          video: "assets/videos/cardio-treadmill.mp4"
        }
      ]
    }
  ]
};
