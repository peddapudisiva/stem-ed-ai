// XP threshold to REACH each level (index = level number)
export const XP_THRESHOLDS = [
  0,    // Level 1
  50,   // Level 2
  100,  // Level 3
  160,  // Level 4
  230,  // Level 5
  310,  // Level 6
  380,  // Level 7
  480,  // Level 8
  590,  // Level 9
  710,  // Level 10
  750,  // Level 11
  800,  // Level 12  ← Alex Chen (847 xp)
  950,  // Level 13
  1050, // Level 14
  1100, // Level 15
  1130, // Level 16
  1160, // Level 17
  1200, // Level 18  ← Taylor Washington (1240 xp)
  1400, // Level 19
  1600, // Level 20
]

export const LEVEL_TITLES: Record<number, string> = {
  1: "Newcomer",
  2: "Explorer",
  3: "Learner",
  4: "Apprentice",
  5: "Student",
  6: "Scholar",
  7: "Junior Scholar",
  8: "Achiever",
  9: "Contributor",
  10: "Adept",
  11: "Skilled",
  12: "Senior Scholar",
  13: "Expert",
  14: "Specialist",
  15: "Distinguished",
  16: "Advanced",
  17: "Elite",
  18: "Master",
  19: "Grandmaster",
  20: "Legend",
}

export interface LevelInfo {
  level: number
  title: string
  currentXp: number
  levelStartXp: number
  nextLevelXp: number
  progressXp: number
  progressPct: number
}

export function getLevelInfo(totalXp: number): LevelInfo {
  let level = 1
  for (let i = XP_THRESHOLDS.length - 1; i >= 1; i--) {
    if (totalXp >= XP_THRESHOLDS[i]) {
      level = i + 1
      break
    }
  }
  level = Math.min(level, 20)

  const levelStartXp = XP_THRESHOLDS[level - 1] ?? 0
  const nextLevelXp = XP_THRESHOLDS[level] ?? XP_THRESHOLDS[XP_THRESHOLDS.length - 1]
  const progressXp = totalXp - levelStartXp
  const progressPct = Math.min(100, Math.round((progressXp / (nextLevelXp - levelStartXp)) * 100))

  return {
    level,
    title: LEVEL_TITLES[level] ?? `Level ${level}`,
    currentXp: totalXp,
    levelStartXp,
    nextLevelXp,
    progressXp,
    progressPct,
  }
}
