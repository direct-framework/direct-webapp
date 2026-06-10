export const generateRandomData = (n, categoryCount, maxLvl) =>
  Array.from({ length: n }, (_, i) => ({
    skill: `skill-${i}`,
    category: `category-${Math.floor(Math.random() * categoryCount)}`,
    skill_level: Math.floor(Math.random() * maxLvl),
  }))
    .concat([
      { skill: 'Zero Skill', category: 'category-0', skill_level: 0 },
      { skill: 'Max Skill', category: 'category-0', skill_level: maxLvl - 1 },
    ])
    .concat([
      {
        skill: 'long name skill using max char count of about 20 etc',
        category: 'Really long category name that is about 30 chars',
        skill_level: maxLvl - 1,
      },
    ])
