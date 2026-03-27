const radialBarChartConfig = {
  width: 900,
  height: 700,
  plotYOffset: 40,
  innerRadius: 140,
  outerPadding: 100,
  categoryPadding: 0.1,
  skillPadding: 0.01,
  arcPercent: 0.99,
  arcStartOffset: 0.01,
  annotationPadding: 20,
  maxLabelWidth: 180,
  lineThickness: 2,
  fontSize: 20,
  labelXOffset: 1.05,
  labelYSpacing: 40,
  lvlLabelType: 'none',
  labelTextColor: 'white',
  lvlTextColor: 'var(--ar-primary)',
  lvlArcColor: 'rgba(var(--ar-primary-rgb), 0.2)',
  colourList: [
    '#4E79A7', // blue
    '#F28E2B', // orange
    '#E15759', // red
    '#76B7B2', // teal
    '#59A14F', // green
    '#EDC948', // yellow
    '#B07AA1', // purple
    '#FF9DA7', // pink
    '#9C755F', // brown
    '#BAB0AC', // grey
  ],
}

function renderRadialBarChart(target, data, levels) {
  target.innerHTML = ''
  main().RadialBarChart({
    target: target,
    data: data,
    levels: levels,
    config: radialBarChartConfig,
  })
}
