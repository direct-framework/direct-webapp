import { renderRadialPlot } from 'skills-competencies-dataviz'

export default () => {
  function renderDataDemo() {
    const generateRandomData = (n, categoryCount) =>
      Array.from({ length: n }, (_, i) => ({
        skill: `skill-${i}`,
        category: `category-${Math.floor(Math.random() * categoryCount)}`,
        lvl: Math.floor(Math.random() * 10),
      }))
    renderRadialPlot('dataviz_root', generateRandomData(40, 8))
  }
  return { demo: renderDataDemo }
}
