import * as d3 from 'd3'
import {
  radialBarChartPreProcessing,
  getCatLabelWidth,
  getArcsFn,
} from './radial-plot-dataprocessing'

/* D3js component to render the radial bar chart bars

  Each bar is made up of a path for the bar itself and a path for each segment
  where each segment represents a lvl.

  A path is also created to handle the hover events for each bar
  */
function refreshBarsD3({
  svg,
  sortedCategories,
  categoryFocus,
  skillsData,
  getArcs,
  groupedByCategory,
  handleSkillSelect,
  setHighlightedSkill,
}) {
  const filteredCategories = categoryFocus ? [categoryFocus] : sortedCategories
  const filteredCategoriesIds = filteredCategories.map((c) => c.id)
  const filteredData = skillsData
    /* Only show the data in the focus category or all categories */
    // TODO: Check this
    .filter((d) => filteredCategoriesIds.includes(d.category))

  const { barFullHeightArc, barSegmentArc } = getArcs({
    skillsData: filteredData,
    categories: filteredCategories,
    groupedByCategory,
  })
  svg.selectAll('.Bars').remove()

  filteredCategories.forEach((categoryData) => {
    const dItems = groupedByCategory.get(categoryData.id)

    const barGroup = svg
      .append('g')
      .attr('class', `Bars Bars-${categoryData.id}`)
      .attr('fill', categoryData.color)

    const bars = barGroup
      .selectAll('.bar-group')
      .data(dItems, (d) => d.skill)
      .join('g')
      .attr('class', 'bar-group')

    bars
      .append('path')
      .attr('d', (d) => barFullHeightArc(d))
      .attr('class', 'bar')
      .attr('fill-opacity', 0.0001)

    bars.each(function (d) {
      const group = d3.select(this)
      for (let lvl = 1; lvl <= d.skill_level; lvl++) {
        group
          .append('path')
          .attr('d', barSegmentArc(d, lvl))
          .attr('fill', categoryData.color)
          .attr('class', 'bar-segment')
      }
    })

    bars
      .append('path')
      .attr('d', (d) => barFullHeightArc(d))
      .attr('class', 'bar-outline')
      .attr('fill', 'rgba(0, 0, 0, 0)')
      .attr('stroke', categoryData.color)
      .attr('stroke-opacity', 0)
      .on('click', () => handleSkillSelect(categoryFocus ? null : categoryData))
      .on('mouseover', (event, d) => setHighlightedSkill(d))
      .on('mouseout', () => setHighlightedSkill(false))
      .on('focus', (event, d) => setHighlightedSkill(d))
      .on('blur', () => setHighlightedSkill(false))
  })

  return svg
}

/* D3 component to render the annotations for each category
  Each annotation consists of a path for the arc, a line to the outer radius,
  a line to the label, a box around the label and the label itself.
  The label is positioned at the outer radius and is centered on the line
  */
function renderAnnotationsD3({
  svg,
  sortedCategories,
  categoryFocus,
  skillsData,
  getArcs,
  groupedByCategory,
  config,
}) {
  const {
    lineThickness,
    innerRadius,
    outerRadius,
    annotationPadding,
    labelTextColor,
    lvlTextColor,
  } = config
  // Remove previous annotation for this category if any
  svg.selectAll('.Annotation').remove()

  const filteredCategories = categoryFocus ? [categoryFocus] : sortedCategories
  const filteredCategoriesIds = filteredCategories.map((c) => c.id)
  const filteredData = skillsData.filter((d) =>
    filteredCategoriesIds.includes(d.category)
  )
  const {
    categoryBaseArc,
    catAnnotationPointInner,
    catAnnotationPointOuter,
    lvlsArray,
    getYPoint,
  } = getArcs({
    skillsData: filteredData,
    categories: filteredCategories,
    groupedByCategory,
  })

  filteredCategories.forEach((cat) => {
    const annotationGroup = svg
      .append('g')
      .attr('class', `Annotation Annotation-${cat.id}`)
      .attr('fill', cat.color)

    // Arc at base of category
    annotationGroup
      .append('path')
      .attr('d', categoryBaseArc(cat.id))
      .attr('fill', cat.color)
      .attr('stroke', 'none')
      .attr('stroke-width', lineThickness)

    // Line from base of category to annotation label
    annotationGroup
      .append('line')
      .attr('x1', catAnnotationPointInner(cat.id).x * (innerRadius - 3))
      .attr('y1', catAnnotationPointInner(cat.id).y * (innerRadius - 3))
      .attr('x2', catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding))
      .attr('y2', catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding))
      .attr('stroke', cat.color)
      .attr('fill', 'none')
      .attr('stroke-width', lineThickness)
      .attr('opacity', 1)

    // Line beneath category label
    annotationGroup
      .append('line')
      .attr('x1', catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding))
      .attr('y1', catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding))
      .attr(
        'x2',
        catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding) +
          (catAnnotationPointOuter(cat.id).x > 0
            ? getCatLabelWidth(cat.id)
            : -getCatLabelWidth(cat.id))
      )
      .attr('y2', catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding))
      .attr('stroke', cat.color)
      .attr('fill', 'none')
      .attr('stroke-width', lineThickness)

    // Category label text box
    annotationGroup
      .append('rect')
      .attr(
        'x',
        (catAnnotationPointOuter(cat.id).x > 0 ? 0 : -getCatLabelWidth(cat.id)) +
          catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding)
      )
      .attr(
        'y',
        catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding) -
          (catAnnotationPointOuter(cat.id).y > 0 ? 0 : 30)
      )
      .attr('width', getCatLabelWidth(cat.id))
      .attr('height', 30)
      .attr('color', labelTextColor)
      .attr('fill', cat.color)

    // Category label text
    annotationGroup
      .append('text')
      .attr(
        'x',
        catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding) +
          (catAnnotationPointOuter(cat.id).x > 0
            ? getCatLabelWidth(cat.id) / 2
            : -getCatLabelWidth(cat.id) / 2)
      )
      .attr(
        'y',
        catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding) +
          (catAnnotationPointOuter(cat.id).y > 0 ? 20 : -10)
      )
      .attr('fill', labelTextColor)
      .attr('font-weight', 700)
      .attr('text-anchor', 'middle')
      .attr('color', labelTextColor)
      .text(cat.id)

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
  })

  return svg
}

const defaultConfig = {
  width: 640,
  height: undefined,
  innerRadius: 80,
  outerPadding: 100,
  categoryPadding: 0.1,
  skillPadding: 0.05,
  arcPercent: 0.8,
  arcStartOffset: 0.1,
  annotationPadding: 10,
  lineThickness: 2,
  labelTextColor: 'black',
  lvlTextColor: '#ccc',
  lvlArcColor: '#444',
  colourList: d3.schemeAccent,
}

/**
 * RadialBarChart component renders a radial bar chart using D3.js.
 *
 * Config Params:
 *   width = 640,
 *   height: _height = undefined,
 *   innerRadius = 80,
 *   outerPadding = 100,
 *   categoryPadding = 0.1,
 *   skillPadding = 0.05,
 *   arcPercent = 0.8,
 *   arcStartOffset = 0.1,
 *   annotationPadding = 10,
 *   lineThickness = 2,
 *   labelTextColor = 'black',
 *   lvlTextColor = '#ccc',
 *   lvlArcColor = '#444',
 *   colourList = d3.schemeAccent,
 */
export function RadialBarChart({ target, data, config: configIn }) {
  const config = { ...defaultConfig, ...configIn }
  const {
    width = 640,
    height: _height = undefined,
    innerRadius = 80,
    outerPadding = 200,
    categoryPadding = 0.1,
    skillPadding = 0.05,
    arcPercent = 0.8,
    arcStartOffset = 0.1,
    labelTextColor = 'black',
    lvlArcColor = '#444',
    colourList = d3.schemeAccent,
  } = config
  const height = _height ?? width * 0.8 // Width needs to be larger than height to fit cat labels
  const outerRadius = Math.min(width, height) / 2 - outerPadding
  config.height = height // Update config with calculated height
  config.outerRadius = config.outerRadius || outerRadius

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

  const { skillsData, sortedCategories, groupedByCategory } =
    radialBarChartPreProcessing({
      data,
      colourList,
    })

  const getArcs = getArcsFn({
    width,
    height,
    innerRadius,
    outerRadius,
    outerPadding,
    categoryPadding,
    skillPadding,
    arcPercent,
    arcStartOffset,
  })
  console.info({
    skillsData,
    sortedCategories,
  })
  const { lvlRing, lvlsArray } = getArcs({
    skillsData,
    categories: sortedCategories,
    groupedByCategory,
  })

  // D3.js function to render the skill highlight
  function renderSkillHighlightD3(svg) {
    const group = svg.append('g').attr('class', 'skill-highlight')

    // Circle for skill highlight
    group
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', innerRadius - 10)
      .attr('class', 'skill-highlight-circle')
      .attr('opacity', 0)

    // Category text
    group
      .append('text')
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', labelTextColor)
      .attr('class', 'skill-highlight-text-cat')
      .text('')

    // Skill text
    group
      .append('text')
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('fill', labelTextColor)
      .attr('class', 'skill-highlight-text-skill')
      .text('')

    // Skill level text
    group
      .append('text')
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .attr('fill', labelTextColor)
      .attr('class', 'skill-highlight-text-lvl')
      .text('')
  }

  // D3.js function to render the skill highlight
  function refreshSkillHighlightD3(svg, highlightedSkill) {
    const group = svg.select('.skill-highlight')

    if (!highlightedSkill) {
      const t = d3.transition().delay(200).duration(200).ease(d3.easeLinear)
      // Renders a circle
      group
        .select('.skill-highlight-circle')
        .transition(t) // Transition to the new highlight
        .attr('opacity', 0)

      // Category text
      group
        .select('.skill-highlight-text-cat')
        .transition(t)
        .attr('opacity', 0)
        .text('')

      // Skill text
      group
        .select('.skill-highlight-text-skill')
        .transition(t)
        .attr('opacity', 0)
        .text('')

      // Skill level text
      group
        .select('.skill-highlight-text-lvl')
        .transition(t)
        .attr('opacity', 0)
        .text('')
    } else {
      const t = d3.transition().duration(200).ease(d3.easeLinear)
      // Circle for skill highlight
      group
        .select('.skill-highlight-circle')
        .transition(t) // Transition to the new highlight
        .attr('opacity', 1)
        .attr('fill', highlightedSkill.color)

      // Category text
      group
        .select('.skill-highlight-text-cat')
        .transition(t)
        .attr('opacity', 1)
        .text(highlightedSkill.category)

      // Skill text
      group
        .select('.skill-highlight-text-skill')
        .transition(t)
        .attr('opacity', 1)
        .text(highlightedSkill.skill)

      // Skill level text
      group
        .select('.skill-highlight-text-lvl')
        .transition(t)
        .attr('opacity', 1)
        .text(highlightedSkill.skill_level)
    }
  }

  const setHighlightedSkill = (skill) => {
    refreshSkillHighlightD3(g, skill)
  }

  // eslint-disable-next-line no-unused-vars
  const handleSkillSelect = (categoryFocus) => {
    refreshBarsD3({
      svg: g,
      sortedCategories,
      categoryFocus,
      skillsData,
      getArcs,
      groupedByCategory,
      handleSkillSelect,
      setHighlightedSkill,
    })
    renderAnnotationsD3({
      svg: g,
      sortedCategories,
      categoryFocus,
      skillsData,
      getArcs,
      groupedByCategory,
      config,
    })
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

  /* add bars to svg */

  renderBackgroundLvlRingsD3(g, 'cat')
  renderAnnotationsD3({
    svg: g,
    sortedCategories,
    categoryFocus: null,
    skillsData,
    getArcs,
    groupedByCategory,
    config,
  })
  renderSkillHighlightD3(g, false)
  refreshBarsD3({
    svg: g,
    sortedCategories,
    categoryFocus: false,
    skillsData,
    getArcs,
    groupedByCategory,
    handleSkillSelect,
    setHighlightedSkill,
  })
  return svg
}
