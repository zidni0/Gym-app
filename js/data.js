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
          video: "https://www.youtube.com/embed/N-nimt37c-Y?start=5&end=25&autoplay=1&mute=1&loop=1&playlist=N-nimt37c-Y"
        },
        {
          name: "Smith Machine Incline Press",
          muscles: "Upper chest, front delts, triceps",
          sets: 3,
          reps: "8–12",
          rest: 105,
          equipment: ["Smith Machine (bench 30–45°)", "Incline Dumbbell Press", "Incline Press Machine"],
          video: "https://www.youtube.com/embed/N-nimt37c-Y?start=24&end=44&autoplay=1&mute=1&loop=1&playlist=N-nimt37c-Y"
        },
        {
          name: "Cable Chest Fly",
          muscles: "Pec major",
          sets: 3,
          reps: "12–15",
          rest: 68,
          equipment: ["Cable Tower", "Pec Deck / Butterfly Machine", "Dumbbell Fly on bench"],
          video: "https://www.youtube.com/embed/TBs_uIWSuFU?start=80&end=100&autoplay=1&mute=1&loop=1&playlist=TBs_uIWSuFU"
        },
        {
          name: "Dumbbell Shoulder Press",
          muscles: "Front & side delts, triceps",
          sets: 4,
          reps: "8–12",
          rest: 90,
          equipment: ["Dumbbells on adjustable bench", "Shoulder Press Machine", "Smith Machine OHP"],
          video: "https://www.youtube.com/embed/zeczBJSr13Y?start=675&end=695&autoplay=1&mute=1&loop=1&playlist=zeczBJSr13Y"
        },
        {
          name: "Dumbbell Lateral Raise",
          muscles: "Side deltoid",
          sets: 3,
          reps: "12–20",
          rest: 68,
          equipment: ["Dumbbells", "Cable lateral raise (single arm)"],
          video: "https://www.youtube.com/embed/Xlq6nNbgy0I?start=444&end=464&autoplay=1&mute=1&loop=1&playlist=Xlq6nNbgy0I"
        },
        {
          name: "Cable Face Pull",
          muscles: "Rear delt, traps, rotator cuff",
          sets: 3,
          reps: "15–20",
          rest: 68,
          equipment: ["Cable Tower with rope", "Rear Delt Machine", "Dumbbell rear delt fly"],
          video: "https://www.youtube.com/embed/OZ4KwIILbQc?start=1027&end=1047&autoplay=1&mute=1&loop=1&playlist=OZ4KwIILbQc"
        },
        {
          name: "Cable Tricep Pushdown",
          muscles: "Triceps (all heads)",
          sets: 3,
          reps: "10–15",
          rest: 60,
          equipment: ["Cable Tower (rope or bar)", "Tricep Press Machine"],
          video: "https://www.youtube.com/embed/Gp8clzLMvNM?start=9&end=29&autoplay=1&mute=1&loop=1&playlist=Gp8clzLMvNM"
        },
        {
          name: "Overhead Tricep Extension",
          muscles: "Triceps long head",
          sets: 3,
          reps: "10–15",
          rest: 60,
          equipment: ["Dumbbell overhead", "Cable overhead extension", "EZ-bar skull crushers on bench"],
          video: "https://www.youtube.com/embed/R1FXJOroOXY?start=35&end=55&autoplay=1&mute=1&loop=1&playlist=R1FXJOroOXY"
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
          video: "https://www.youtube.com/embed/9tVPuc_zhec?start=10&end=30&autoplay=1&mute=1&loop=1&playlist=9tVPuc_zhec"
        },
        {
          name: "Lat Pulldown (Underhand Grip)",
          muscles: "Lower lats, biceps",
          sets: 3,
          reps: "10–12",
          rest: 105,
          equipment: ["Lat Pulldown Machine (reverse grip)", "Seated Cable Row underhand"],
          video: "https://www.youtube.com/embed/VprlTxpB1rk?start=0&end=15&autoplay=1&mute=1&loop=1&playlist=VprlTxpB1rk"
        },
        {
          name: "Straight-Arm Cable Pulldown",
          muscles: "Lats isolation",
          sets: 3,
          reps: "12–15",
          rest: 68,
          equipment: ["Cable Tower (bar or rope at top, arms straight)", "Dumbbell pullover on bench"],
          video: "https://www.youtube.com/embed/G9uNaXGTJ4w?start=0&end=15&autoplay=1&mute=1&loop=1&playlist=G9uNaXGTJ4w"
        },
        {
          name: "Seated Cable Row",
          muscles: "Mid-back, rhomboids, traps, lats",
          sets: 4,
          reps: "8–12",
          rest: 105,
          equipment: ["Cable Tower (V-bar or wide bar)", "Machine Row", "Smith Machine bent-over row"],
          video: "https://www.youtube.com/embed/UCXxvVItLoM?start=0&end=18&autoplay=1&mute=1&loop=1&playlist=UCXxvVItLoM"
        },
        {
          name: "Single-Arm Dumbbell Row",
          muscles: "Lats, rhomboids",
          sets: 3,
          reps: "10–12 each",
          rest: 90,
          equipment: ["Dumbbell + flat bench", "Single-arm cable row"],
          video: "https://www.youtube.com/embed/gfUg6qWohTk?start=30&end=50&autoplay=1&mute=1&loop=1&playlist=gfUg6qWohTk"
        },
        {
          name: "Cable Face Pull / Rear Delt Fly",
          muscles: "Rear delts, traps",
          sets: 3,
          reps: "15–20",
          rest: 68,
          equipment: ["Cable Tower (rope at eye level)", "Reverse Pec Deck", "Dumbbell rear delt fly"],
          video: "https://www.youtube.com/embed/qz1OLup4W_M?start=0&end=15&autoplay=1&mute=1&loop=1&playlist=qz1OLup4W_M"
        },
        {
          name: "Dumbbell Curl (Alternating)",
          muscles: "Biceps long & short head",
          sets: 3,
          reps: "10–12 each",
          rest: 68,
          equipment: ["Dumbbells", "Barbell curl", "Cable curl (cable low)"],
          video: "https://www.youtube.com/embed/Gp8clzLMvNM?start=37&end=57&autoplay=1&mute=1&loop=1&playlist=Gp8clzLMvNM"
        },
        {
          name: "Hammer Curl",
          muscles: "Brachialis, forearms",
          sets: 3,
          reps: "10–12",
          rest: 68,
          equipment: ["Dumbbells (neutral grip)", "Cable rope hammer curl"],
          video: "https://www.youtube.com/embed/MOyJ7bR1fkk?start=79&end=99&autoplay=1&mute=1&loop=1&playlist=MOyJ7bR1fkk"
        },
        {
          name: "Preacher Curl",
          muscles: "Bicep peak",
          sets: 2,
          reps: "10–15",
          rest: 60,
          equipment: ["Preacher Curl Machine", "Preacher bench + dumbbell", "Incline dumbbell curl"],
          video: "https://www.youtube.com/embed/ooPsABIklMI?start=20&end=40&autoplay=1&mute=1&loop=1&playlist=ooPsABIklMI"
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
          video: "https://www.youtube.com/embed/OXnMyNG3IkU?start=20&end=40&autoplay=1&mute=1&loop=1&playlist=OXnMyNG3IkU"
        },
        {
          name: "Leg Press",
          muscles: "Quads, glutes, hamstrings",
          sets: 4,
          reps: "10–15",
          rest: 150,
          equipment: ["Leg Press Machine", "Single-leg press"],
          video: "https://www.youtube.com/embed/KzldjgY4Mqg?start=10&end=30&autoplay=1&mute=1&loop=1&playlist=KzldjgY4Mqg"
        },
        {
          name: "Bulgarian Split Squat",
          muscles: "Quads, glutes",
          sets: 3,
          reps: "10–12 each",
          rest: 120,
          equipment: ["Dumbbells + bench", "Smith Machine split squat"],
          video: "https://www.youtube.com/embed/fazW1BV9RI8?start=77&end=97&autoplay=1&mute=1&loop=1&playlist=fazW1BV9RI8"
        },
        {
          name: "Lying Leg Curl",
          muscles: "Hamstrings",
          sets: 3,
          reps: "10–15",
          rest: 83,
          equipment: ["Lying Leg Curl Machine", "Seated Leg Curl Machine"],
          video: "https://www.youtube.com/embed/QatAMaY8eY8?start=10&end=30&autoplay=1&mute=1&loop=1&playlist=QatAMaY8eY8"
        },
        {
          name: "Romanian Deadlift (RDL)",
          muscles: "Hamstrings, glutes, lower back",
          sets: 3,
          reps: "10–12",
          rest: 120,
          equipment: ["Dumbbells", "Smith Machine RDL"],
          video: "https://www.youtube.com/embed/jhuIczzFaXY?start=15&end=35&autoplay=1&mute=1&loop=1&playlist=jhuIczzFaXY"
        },
        {
          name: "Leg Extension",
          muscles: "Quadriceps isolation",
          sets: 3,
          reps: "12–15",
          rest: 83,
          equipment: ["Leg Extension Machine"],
          video: "https://www.youtube.com/embed/m0FOpMEgero?start=0&end=15&autoplay=1&mute=1&loop=1&playlist=m0FOpMEgero"
        },
        {
          name: "Standing Calf Raise",
          muscles: "Gastrocnemius, soleus",
          sets: 4,
          reps: "15–20",
          rest: 60,
          equipment: ["Standing Calf Raise Machine", "Smith Machine calf raise", "Leg Press toes on edge"],
          video: "https://www.youtube.com/embed/ffCkIkBODC4?start=20&end=40&autoplay=1&mute=1&loop=1&playlist=ffCkIkBODC4"
        },
        {
          name: "Cable Crunch",
          muscles: "Rectus abdominis",
          sets: 3,
          reps: "15–20",
          rest: 60,
          equipment: ["Cable Tower (rope, kneel down)", "Ab Crunch Machine", "Decline sit-up"],
          video: "https://www.youtube.com/embed/TBs_uIWSuFU?start=108&end=128&autoplay=1&mute=1&loop=1&playlist=TBs_uIWSuFU"
        },
        {
          name: "Plank",
          muscles: "Core, transverse abs",
          sets: 3,
          reps: "30–60 sec",
          rest: 60,
          equipment: ["Floor mat", "Ab wheel rollout"],
          video: "https://www.youtube.com/embed/85EXY8gfgaw?start=10&end=30&autoplay=1&mute=1&loop=1&playlist=85EXY8gfgaw"
        },
        {
          name: "Cardio",
          muscles: "Cardiovascular, fat burn",
          sets: 1,
          reps: "20–25 min",
          rest: 0,
          equipment: ["Treadmill incline walk (3.5–4 mph, 10–15% incline)", "StairMaster", "Arc Trainer"],
          video: "https://www.youtube.com/embed/5R-ewoo5CIQ?start=79&end=99&autoplay=1&mute=1&loop=1&playlist=5R-ewoo5CIQ"
        }
      ]
    }
  ]
};
