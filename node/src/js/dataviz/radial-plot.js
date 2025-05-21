import * as d3 from 'd3'
import {
  getColor,
  radialBarChartPreProcessing,
  getCatLabelWidth,
} from './radial-plot-dataprocessing'

export function RadialBarChart({
  target,
  data,
  width = 640,
  height: _height = undefined,
  innerRadius = 80,
  outerPadding = 100,
  categoryPadding = 0.1,
  skillPadding = 0.05,
  arcPercent = 0.8,
  arcStartOffset = 0.1,
  annotationPadding = 10,
  lineThickness = 2,
  labelTextColor = 'black',
  lvlTextColor = '#ccc',
  lvlArcColor = '#444',
  colourList = d3.schemeAccent,
}) {
  const height = _height ?? width * 0.8 // Width needs to be larger than height to fit cat labels

  const svg = d3
    .select(target)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)

    .attr('class', 'radial-bar-chart')

  const g = svg
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .attr('class', 'radial-bar-chart-group')
    .attr('aria-label', 'Radial Bar Chart')
    .attr('role', 'img')
    .attr('aria-describedby', 'radial-bar-chart-description')

  const {
    sortedCategories,
    filteredCategories,
    groupedByCategory,
    catAnnotationPointInner,
    catAnnotationPointOuter,
    barFullHeightArc,
    barSegmentArc,
    categoryBaseArc,
    lvlRing,
    lvlsArray,
    outerRadius,
    getYPoint,
  } = radialBarChartPreProcessing({
    data,
    width,
    height,
    innerRadius,
    outerPadding,
    categoryPadding,
    skillPadding,
    arcPercent,
    arcStartOffset,
    // categoryFocus,
  })

  const color = sortedCategories
    ? getColor(sortedCategories, colourList)
    : () => 'black'

  // D3.js function to render the skill highlight
  function renderSkillHighlightD3(svg, highlightedSkill) {
    // Remove previous highlight if any
    svg.selectAll('.SkillHighlight').remove()

    if (!highlightedSkill) return

    const group = svg.append('g').attr('class', 'SkillHighlight')

    // Renders a circle
    group
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', innerRadius - 10)
      .attr('fill', color(highlightedSkill.category))

    // Category text
    group
      .append('text')
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', labelTextColor)
      .text(highlightedSkill.category)

    // Skill text
    group
      .append('text')
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('fill', labelTextColor)
      .text(highlightedSkill.skill)

    // Skill level text
    group
      .append('text')
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .attr('fill', labelTextColor)
      .text(highlightedSkill.skill_level)
  }

  // eslint-disable-next-line no-unused-vars
  const handleSkillSelect = (_category) => {
    // TODO: handle skill selection
    // renderBarsD3
  }

  const setHighlightedSkill = (skill) => {
    renderSkillHighlightD3(g, skill)
  }

  /* D3js component to render the radial bar chart bars

  Each bar is made up of a path for the bar itself and a path for each segment
  where each segment represents a lvl.

  A path is also created to handle the hover events for each bar
  */
  function renderBarsD3(svg, cat, dItems) {
    // Remove previous bars for this category if any
    svg.selectAll(`.Bars-${cat}`).remove()

    const barGroup = svg
      .append('g')
      .attr('class', `Bars Bars-${cat}`)
      .attr('fill', color(cat))

    const bars = barGroup
      .selectAll('.bar-group')
      .data(dItems, (d) => d.skill)
      .join('g')
      .attr('class', 'bar-group')
      .on('click', () => handleSkillSelect(cat))
      .on('mouseover', (event, d) => setHighlightedSkill(d))
      .on('mouseout', () => setHighlightedSkill(false))
      .on('focus', (event, d) => setHighlightedSkill(d))
      .on('blur', () => setHighlightedSkill(false))

    bars
      .append('path')
      .attr('d', (d) => barFullHeightArc(d))
      .attr('tabindex', 0)
      .attr('class', 'bar')
      .attr('fill-opacity', 0.0001)

    bars
      .append('path')
      .attr('d', (d) => barFullHeightArc(d))
      .attr('class', 'bar-outline')
      .attr('fill', 'none')
      .attr('stroke', color(cat))
      .attr('stroke-opacity', 0)

    bars.each(function (d) {
      const group = d3.select(this)
      for (let lvl = 1; lvl <= d.skill_level; lvl++) {
        group
          .append('path')
          .attr('d', barSegmentArc(d, lvl))
          .attr('fill', color(cat))
          .attr('class', 'bar-segment')
      }
    })
    return svg
  }

  /* React component to render the rings indicating each level */
  // D3.js function to render the background level rings for a category
  function renderBackgroundLvlRingsD3(svg) {
    // Remove previous rings for this category if any
    svg.selectAll('.LvlRings').remove()

    const ringGroup = svg.append('g').attr('class', 'LvlRings')

    lvlsArray.forEach((lvl) => {
      ringGroup
        .append('path')
        .attr('d', lvlRing(lvl))
        .attr('fill', lvlArcColor)
        .attr('stroke', 'none')
        .attr('stroke-width', 1)
    })

    return svg
  }

  /* D3 component to render the annotations for each category
  Each annotation consists of a path for the arc, a line to the outer radius,
  a line to the label, a box around the label and the label itself.
  The label is positioned at the outer radius and is centered on the line
  */
  function renderAnnotationsD3(svg, cat) {
    // Remove previous annotation for this category if any
    svg.selectAll(`.Annotation-${cat}`).remove()

    const annotationGroup = svg
      .append('g')
      .attr('class', `Annotation Annotation-${cat}`)
      .attr('fill', color(cat))

    // Arc at base of category
    annotationGroup
      .append('path')
      .attr('d', categoryBaseArc(cat))
      .attr('fill', color(cat))
      .attr('stroke', 'none')
      .attr('stroke-width', lineThickness)

    // Line from base of category to annotation label
    annotationGroup
      .append('line')
      .attr('x1', catAnnotationPointInner(cat).x * innerRadius)
      .attr('y1', catAnnotationPointInner(cat).y * innerRadius)
      .attr('x2', catAnnotationPointOuter(cat).x * (outerRadius + annotationPadding))
      .attr('y2', catAnnotationPointOuter(cat).y * (outerRadius + annotationPadding))
      .attr('stroke', color(cat))
      .attr('fill', 'none')
      .attr('stroke-width', lineThickness)
      .attr('opacity', 1)

    // Line beneath category label
    annotationGroup
      .append('line')
      .attr('x1', catAnnotationPointOuter(cat).x * (outerRadius + annotationPadding))
      .attr('y1', catAnnotationPointOuter(cat).y * (outerRadius + annotationPadding))
      .attr(
        'x2',
        catAnnotationPointOuter(cat).x * (outerRadius + annotationPadding) +
          (catAnnotationPointOuter(cat).x > 0
            ? getCatLabelWidth(cat)
            : -getCatLabelWidth(cat))
      )
      .attr('y2', catAnnotationPointOuter(cat).y * (outerRadius + annotationPadding))
      .attr('stroke', color(cat))
      .attr('fill', 'none')
      .attr('stroke-width', lineThickness)

    // Category label text box
    annotationGroup
      .append('rect')
      .attr(
        'x',
        (catAnnotationPointOuter(cat).x > 0 ? 0 : -getCatLabelWidth(cat)) +
          catAnnotationPointOuter(cat).x * (outerRadius + annotationPadding)
      )
      .attr(
        'y',
        catAnnotationPointOuter(cat).y * (outerRadius + annotationPadding) -
          (catAnnotationPointOuter(cat).y > 0 ? 0 : 30)
      )
      .attr('width', getCatLabelWidth(cat))
      .attr('height', 30)
      .attr('color', labelTextColor)
      .attr('fill', color(cat))

    // Category label text
    annotationGroup
      .append('text')
      .attr(
        'x',
        catAnnotationPointOuter(cat).x * (outerRadius + annotationPadding) +
          (catAnnotationPointOuter(cat).x > 0
            ? getCatLabelWidth(cat) / 2
            : -getCatLabelWidth(cat) / 2)
      )
      .attr(
        'y',
        catAnnotationPointOuter(cat).y * (outerRadius + annotationPadding) +
          (catAnnotationPointOuter(cat).y > 0 ? 20 : -10)
      )
      .attr('fill', labelTextColor)
      .attr('font-weight', 700)
      .attr('text-anchor', 'middle')
      .attr('color', labelTextColor)
      .text(cat)

    // Category lvl annotations
    lvlsArray.forEach((lvl) => {
      annotationGroup
        .append('text')
        .attr('x', 0)
        .attr('y', -getYPoint(lvl - 0.1))
        .attr('fill', lvlTextColor)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .text(lvl)
    })

    return svg
  }

  /* add bars to svg */
  filteredCategories.forEach((cat) => {
    const dItems = groupedByCategory.get(cat)
    renderBarsD3(g, cat, dItems)
  })
  renderBackgroundLvlRingsD3(g, 'cat')
  filteredCategories.forEach((cat) => {
    renderAnnotationsD3(g, cat)
  })
  renderSkillHighlightD3(svg, false)
  return svg
}
