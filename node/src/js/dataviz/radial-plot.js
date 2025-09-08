import * as d3 from 'd3'
import { radialBarChartPreProcessing, getArcsFn } from './radial-plot-dataprocessing'
import { splitTextToFitWidth } from './utils'

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
  levels,
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
    levels: levels,
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
  levels,
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
    lvlLabelType = 'name', // 'none' | 'name' | 'level' - Whether to show the lvl name or lvl number in the lvl annotation
    fontSize = 10,
    useSmartLabelPositioning = true,
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
    catAnnotationPointOuterLabel,
    lvlsArray,
    getYPoint,
    catLabelWidthHeightMap,
  } = getArcs({
    levels,
    skillsData: filteredData,
    categories: filteredCategories,
    groupedByCategory,
  })

  filteredCategories.forEach((cat) => {
    const annotationGroup = svg
      .append('g')
      .attr('class', `Annotation Annotation-${cat.id.replaceAll(' ', '-')}`)
      .attr('fill', cat.color)

    const labelXDir = catAnnotationPointOuterLabel(cat.id).x > 0 ? 1 : -1
    const labelYDir = catAnnotationPointOuterLabel(cat.id).y > 0 ? 1 : -1
    const labelWidth = catLabelWidthHeightMap[cat.id].width
    const labelHeight = catLabelWidthHeightMap[cat.id].height
    const labelAnchorPoint = useSmartLabelPositioning
      ? {
          x:
            (catAnnotationPointOuterLabel(cat.id).x > 0 ? 0 : -labelWidth) +
            catAnnotationPointOuterLabel(cat.id).x * (outerRadius + annotationPadding),
          y: catAnnotationPointOuterLabel(cat.id).y,
        }
      : {
          x:
            (catAnnotationPointOuter(cat.id).x > 0 ? 0 : -labelWidth) +
            catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding),
          y:
            catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding) +
            labelYDir * fontSize,
        }
    const outerAnnotationLineAnchor = {
      x: catAnnotationPointOuter(cat.id).x * (outerRadius + annotationPadding),
      y: catAnnotationPointOuter(cat.id).y * (outerRadius + annotationPadding),
    }

    const baseOfCategoryAnchor = {
      x: catAnnotationPointInner(cat.id).x * (innerRadius - 3),
      y: catAnnotationPointInner(cat.id).y * (innerRadius - 3),
    }

    // Arc at base of category
    annotationGroup
      .append('path')
      .attr('d', categoryBaseArc(cat.id))
      .attr('fill', cat.color)
      .attr('stroke', 'none')
      .attr('stroke-width', lineThickness)

    // Line from base of category to outer radius
    annotationGroup
      .append('line')
      .attr('x1', baseOfCategoryAnchor.x)
      .attr('y1', baseOfCategoryAnchor.y)
      .attr('x2', outerAnnotationLineAnchor.x)
      .attr('y2', outerAnnotationLineAnchor.y)
      .attr('stroke', cat.color)
      .attr('fill', 'none')
      .attr('stroke-width', lineThickness)
      .attr('opacity', 1)

    // Line from outer radius to category label
    annotationGroup
      .append('line')
      .attr('x1', outerAnnotationLineAnchor.x)
      .attr('y1', outerAnnotationLineAnchor.y)
      .attr('x2', labelAnchorPoint.x + (labelXDir > 0 ? 0 : labelWidth))
      .attr('y2', labelAnchorPoint.y)
      .attr('stroke', cat.color)
      .attr('fill', 'none')
      .attr('stroke-width', lineThickness)
      .attr('opacity', 1)

    // Line beneath category label
    annotationGroup
      .append('line')
      .attr('x1', labelAnchorPoint.x)
      .attr('y1', labelAnchorPoint.y)
      .attr('x2', labelAnchorPoint.x + labelWidth)
      .attr('y2', labelAnchorPoint.y)
      .attr('stroke', cat.color)
      .attr('fill', 'none')
      .attr('stroke-width', lineThickness)

    // Category label text box
    annotationGroup
      .append('rect')
      .attr('class', 'label-box')
      .attr('x', labelAnchorPoint.x)
      .attr('y', labelAnchorPoint.y + (labelYDir === 1 ? 0 : -labelHeight))
      .attr('width', labelWidth)
      .attr('height', labelHeight)
      .attr('color', labelTextColor)
      .attr('opacity', 0.8) // increased on hover
      .attr('fill', cat.color)

    console.info(cat.id, { labelAnchorPoint, labelXDir })

    const highlightLineThickness = 10
    // Line On Side of category label
    annotationGroup
      .append('line')
      .attr('class', 'highlight-line')
      .attr(
        'x1',
        labelAnchorPoint.x +
          labelXDir * highlightLineThickness +
          (labelXDir === 1 ? labelWidth : 0)
      )
      .attr('y1', labelAnchorPoint.y)
      .attr(
        'x2',
        labelAnchorPoint.x +
          labelXDir * highlightLineThickness +
          (labelXDir === 1 ? labelWidth : 0)
      )
      .attr('y2', labelAnchorPoint.y + labelHeight * labelYDir)
      .attr('stroke', cat.color)
      .attr('opacity', 0) // only shown on hover
      .attr('fill', 'none')
      .attr('stroke-width', highlightLineThickness)

    // Category label text
    // Split the text into blocks of maxLabelWidth
    const newLabel = splitTextToFitWidth(cat.id, config.maxLabelWidth, fontSize)
    const labelDirected = labelYDir === 1 ? newLabel : newLabel.reverse()
    labelDirected.forEach((line, i) => {
      annotationGroup
        .append('text')
        .attr('x', labelAnchorPoint.x + labelWidth / 2)
        .attr(
          'y',
          labelAnchorPoint.y + i * fontSize * labelYDir + (fontSize / 2) * labelYDir
        )
        .attr('fill', labelTextColor)
        .attr('font-weight', 700)
        .attr('font-size', fontSize)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('color', labelTextColor)
        .text(line)
    })
    // annotationGroup
    //   .append('text')
    //   .attr('x', labelAnchorPoint.x + labelWidth / 2)
    //   .attr(
    //     'y',
    //     labelAnchorPoint.y + labelHeight / 2 + (labelYDir === 1 ? 0 : labelHeight)
    //   )
    //   .attr('fill', labelTextColor)
    //   .attr('font-weight', 700)
    //   .attr('font-size', fontSize)
    //   .attr('text-anchor', 'middle')
    //   .attr('color', labelTextColor)
    //   .text(newLabel)

    // Category lvl annotations
    if (lvlLabelType !== 'none')
      lvlsArray.forEach((lvl) => {
        annotationGroup
          .append('text')
          .attr('x', 0)
          .attr('y', -getYPoint(lvl.level + 1) + fontSize / 2) // level + 1 as we want this at the top of the level
          .attr('fill', lvlTextColor)
          .attr('text-anchor', 'middle')
          .attr('font-size', fontSize)
          .text(lvl.name)
      })
  })

  return svg
}

const defaultConfig = {
  width: 640,
  height: undefined,
  innerRadius: 80, // Radius of the inner empty circle
  outerPadding: 100, // Padding between the outermost bars and the edge of the svg
  categoryPadding: 0.1, // Proportion of space between categories
  skillPadding: 0.05, // Proportion of space between skills in a category
  arcPercent: 0.8, // Proportion of the circle to use for the bars (1 = full circle, 0.5 = half circle)
  arcStartOffset: 0.1, // Proportion of the circle to offset the start of the bars (0 = start at top, 0.25 = start at right)
  annotationPadding: 10, // Padding between the outermost bars and the annotation lines
  lineThickness: 2, // Thickness of the annotation lines
  labelTextColor: 'black', // Color of the category label text
  lvlTextColor: '#ccc', // Color of the level annotation text
  lvlArcColor: '#444', // Color of the level annotation arcs
  colourList: d3.schemeAccent, // List of colours to use for the categories
  fontSize: 10, // Font size for the category and level labels
  labelXOffset: 1.1, // Sets the distance of the category label from the outer radius as a multiple of the outer radius
  labelYSpacing: 10, // Sets the spacing of the category labels from each other as a multiple of the font size
  maxLabelWidth: 150, // Maximum width of the category label in pixels
  lvlLabelType: 'name', // 'none' | 'name' | 'level' - Whether to show the lvl name or lvl number in the lvl annotation
  useSmartLabelPositioning: true, // Whether to use smart positioning for the category labels to avoid overlap
  plotYOffset: 0, // Y offset for the entire plot to allow for annotations above the plot
}

/**
 * RadialBarChart component renders a radial bar chart using D3.js.
 *
 * @param {Object} target - The target DOM element to append the chart to.
 * @param {Array} data - The data to be visualized in the radial bar chart as array of objects.
 * Each data item should have the following structure:
 * {
 *   skill: 'Skill Name',
 *   category: 'Category Name',
 *   skill_level: number
 * }
 * @param {Array} levels - Array of skill levels to be used in the chart.
 * Each level should have the following structure:
 * {
 *   level: number,
 *   name: 'Level Name',
 *   description: 'Level Description'
 * }
 * @param {Object} config - Configuration parameters for the chart.
 * See `defaultConfig` for available options and their default values.
 *
 */
export function RadialBarChart({ target, data, levels, config: configIn }) {
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
    labelXOffset = 1.1,
    labelYSpacing = 10,
    plotYOffset = 0,
    fontSize = 14,
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
    .attr('viewBox', `0 ${plotYOffset} ${width} ${height}`)

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
    labelXOffset,
    labelYSpacing,
    fontSize: config.fontSize,
  })
  const { lvlRing, lvlsArray } = getArcs({
    skillsData,
    levels,
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
    // group
    //   .append('text')
    //   .attr('y', 0)
    //   .attr('text-anchor', 'middle')
    //   .attr('fill', labelTextColor)
    //   .attr('class', 'skill-highlight-text-skill')
    //   .text('')

    group.append('g').attr('class', 'skill-highlight-text-skill')
    // Skill level text
    group
      .append('line')
      .attr('class', 'skill-highlight-text-lvl-line')
      .attr('x1', -innerRadius * 0.7)
      .attr('y1', 50 - fontSize / 1.3)
      .attr('x2', innerRadius * 0.7)
      .attr('y2', 50 - fontSize / 1.3)
      .attr('stroke', '#FFF')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('opacity', 0)

    group
      .append('text')
      .attr('y', 60)
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFF')
      .attr('font-size', fontSize)
      // .attr('fill', labelTextColor)
      .attr('class', 'skill-highlight-text-lvl')
      .text('')
  }

  // D3.js function to render the skill highlight
  function refreshSkillHighlightD3(svg, highlightedSkill, innerCircleWidth, fontSize) {
    const group = svg.select('.skill-highlight')

    if (!highlightedSkill) {
      const t = d3.transition().delay(200).duration(200).ease(d3.easeLinear)
      // Renders a circle
      group
        .select('.skill-highlight-circle')
        .transition(t) // Transition to the new highlight
        .attr('opacity', 0)

      // Category text TEMPORARILY DISABLED
      // group
      //   .select('.skill-highlight-text-cat')
      //   .transition(t)
      //   .attr('opacity', 0)
      //   .text('')

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

      group.select('.skill-highlight-text-lvl-line').transition(t).attr('opacity', 0)

      svg.selectAll('.highlight-line').transition(t).attr('opacity', 0)
      svg.selectAll('.label-box').transition(t).attr('opacity', 0.8)

      group.selectAll('.skill-highlight-text-skill-central').remove()
    } else {
      const t = d3.transition().duration(200).ease(d3.easeLinear)
      // Circle for skill highlight
      group
        .select('.skill-highlight-circle')
        .transition(t) // Transition to the new highlight
        .attr('opacity', 1)
        .attr('fill', highlightedSkill.color)

      // Category text TEMPORARILY DISABLED
      // group
      //   .select('.skill-highlight-text-cat')
      //   .transition(t)
      //   .attr('opacity', 1)
      //   .text(highlightedSkill.category)

      // Skill text

      const skillTextSplit = splitTextToFitWidth(
        highlightedSkill.skill,
        innerCircleWidth * 2.5,
        fontSize
      )
      group.select('.skill-highlight-text-skill').transition(t).attr('opacity', 1)
      // .text(highlightedSkill.skill)
      // const annotationSkillTextGroup = group.select('.skill-highlight-text-skill')
      // console.info(skillTextSplit)
      // skillTextSplit.forEach((skillTextRow, i) =>
      //   annotationSkillTextGroup
      //     .append('text')
      //     .attr('x', 0)
      //     .attr('y', i * 1)
      //     .attr('text-anchor', 'middle')
      //     .attr('fill', labelTextColor)
      //     .attr('class', 'skill-highlight-text-skill-central')
      //     .text(skillTextRow)
      // )
      // console.info("annotationSkillTextGroup", annotationSkillTextGroup)
      group
        .select('.skill-highlight-text-skill')
        .selectAll('skill-highlight-text-skill-central')
        .data(skillTextSplit)
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('font-size', fontSize)
        .attr(
          'y',
          (_, i) => -((0.5 * fontSize * skillTextSplit.length) / 2) + i * fontSize * 1.2
        )
        .attr('class', 'skill-highlight-text-skill-central')
        .attr('text-anchor', 'middle')
        .attr('fill', labelTextColor)
        .text((skillText) => skillText)

      // Skill level text
      group
        .select('.skill-highlight-text-lvl')
        .transition(t)
        .attr('opacity', 1)
        .text(lvlsArray.find((lvl) => lvl.level === highlightedSkill.skill_level)?.name)

      group.select('.skill-highlight-text-lvl-line').transition(t).attr('opacity', 1)

      svg
        .select(`.Annotation-${highlightedSkill.category.replaceAll(' ', '-')}`)
        .selectAll('.highlight-line')
        .transition(t)
        // .attr('fill', "#333")
        .attr('opacity', 1)

      svg
        .select(`.Annotation-${highlightedSkill.category.replaceAll(' ', '-')}`)
        .selectAll('.label-box')
        .transition(t)
        .attr('opacity', 1)
    }
  }

  const setHighlightedSkill = (skill) => {
    refreshSkillHighlightD3(g, skill, innerRadius, fontSize)
  }

  // eslint-disable-next-line no-unused-vars
  const handleSkillSelect = (categoryFocus) => {
    refreshBarsD3({
      svg: g,
      sortedCategories,
      categoryFocus,
      skillsData,
      getArcs,
      levels,
      groupedByCategory,
      handleSkillSelect,
      setHighlightedSkill,
    })
    renderAnnotationsD3({
      svg: g,
      sortedCategories,
      categoryFocus,
      skillsData,
      levels,
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
        .attr('d', lvlRing(lvl.level))
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
    levels,
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
    levels,
    getArcs,
    groupedByCategory,
    handleSkillSelect,
    setHighlightedSkill,
  })
  return svg
}
