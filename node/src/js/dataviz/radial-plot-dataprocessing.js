import * as d3 from 'd3'

const fullCircleAngle = Math.PI * 2

/* Use d3's schemeSpectral color scheme to get a color for each category

Usage:
const colorFn = getColor(sortedCategories);
const color = colorFn(category);
*/
export function getColor(categories, colourList = d3.schemeAccent) {
  return d3.scaleOrdinal().domain(categories).range(colourList).unknown('#ccc')
}

/* Get the point at the bottom left of the category. Used as the start point of
the line from category segments to category label  */
export const catAnnotationPointInner = (categoryStartAngleMap) => (categoryId) => {
  const angle = categoryStartAngleMap[categoryId]
  const x = Math.sin(angle)
  const y = -Math.cos(angle)
  return { x, y }
}

/* Get the point where the category label should start

categoryStartAngleMap: Record<Category, number>
*/
export const catAnnotationPointOuter = (categoryStartAngleMap) => (categoryId) => {
  const angle = +categoryStartAngleMap[categoryId]
  const x = Math.sin(angle)
  const y = -Math.cos(angle)
  return { x, y }
}

/* Preprocess the data for the radial bar chart. This includes calculating the
  start and end angles for each skill, the height of each level, and the
  category start angles. It also includes creating the arc generators for the
  skill bars, category base, and level rings.

  The function takes in the following parameters:
    data: IDataItem[];
    width: number;
    height: number;
    categoryPadding?: number;
    skillPadding?: number;
    innerRadius?: number;
    outerPadding?: number;
    arcPercent?: number;
    arcStartOffset?: number;
    categoryFocus: Category | false;

  Where IDataItem is an object with the following properties:
    skill: string;
    category: string;
    skill_level: number;
*/
export function radialBarChartPreProcessing({
  data,
  width,
  height,
  innerRadius = 90,
  outerPadding = 140,
  categoryPadding = 0.1,
  skillPadding = 0.05,
  arcPercent = 0.8,
  arcStartOffset = 0.1,
  categoryFocus,
}) {
  const outerRadius = Math.min(width, height) / 2 - outerPadding

  const maxLvl = d3.max(data, (d) => d.skill_level) ?? 0
  const lvlsArray = Array.from({ length: maxLvl }, (_, k) => k + 1)
  const groupedByCategory = d3.group(data, (d) => d.category)
  const categoryIds = [...d3.union(data.map((d) => d.category)).keys()]
  const sortedCategories = categoryIds.sort()

  const filteredCategories = categoryFocus ? [categoryFocus] : sortedCategories

  /* Only show the data in the focus category or all categories */
  const filteredData = data.filter((d) => filteredCategories.includes(d.category))

  /* Total angle used by skills. Remaining is left blank */
  const totalArcAngle = fullCircleAngle * arcPercent
  const totalSkillCount = filteredData.length

  /* Calculate the column widths based on the available width
    shared between the categories and the skills with padding
    included
    */
  const columnAngle =
    (totalArcAngle -
      categoryPadding * (filteredCategories.length - 1) -
      skillPadding * totalSkillCount) /
    totalSkillCount

  /* Calculate the start angle for each category based on the number of skills
    in each category and the position of previous categories
    */
  const categoryStartAngle = filteredCategories.reduce(
    (acc, category) => [
      ...acc,
      acc[acc.length - 1] +
        ((groupedByCategory.get(category)?.length ?? 0) * columnAngle +
          (groupedByCategory.get(category)?.length ?? 0) * skillPadding +
          categoryPadding),
    ],
    [fullCircleAngle * arcStartOffset]
  )

  /* Convert the category start angles to a map for easy access

  categoryStartAngleMap: Record<Category, number>
  */
  const categoryStartAngleMap = categoryStartAngle
    .slice(0, -1)
    .reduce((acc, v, i) => ({ ...acc, [filteredCategories[i]]: v }), {})

  /* Calculate the start angle for each skill based on the category start angle
    and the position of previous skills.
    Stored as a map where key = category-skill

    skillAngleStart: Record<string, number>
  */
  const skillAngleStart = filteredData.reduce(
    (acc, d) => ({
      ...acc,
      [`${d.category}-${d.skill}`]:
        categoryStartAngleMap[d.category] +
        skillPadding +
        (groupedByCategory.get(d.category)?.findIndex((s) => s.skill == d.skill) ?? 0) *
          columnAngle +
        (groupedByCategory.get(d.category)?.findIndex((s) => s.skill == d.skill) ?? 0) *
          skillPadding,
    }),
    {}
  )

  /* Function to get skill AngleStart using the data item

  args:
    d: IDataItem
  returns:
    number: angle in radians
  */
  const getSkillAngleStart = (d) => skillAngleStart[`${d.category}-${d.skill}`]

  /* Function to get the distance from the center of the circle to a y value
    using the radial scale */
  const lvlHeight = d3
    // .scaleRadial()
    .scaleLinear()
    .domain([0, maxLvl])
    .range([innerRadius, outerRadius])

  /* A d3.js arc generator for the skill bar where height = skill level  */
  const barArc = d3
    .arc()
    .startAngle((d) => getSkillAngleStart(d))
    .endAngle((d) => getSkillAngleStart(d) + columnAngle)
    .innerRadius(innerRadius + 1)
    .outerRadius((d) => lvlHeight(d.skill_level))

  const barFullHeightArc = d3
    .arc()
    .startAngle((d) => getSkillAngleStart(d))
    .endAngle((d) => getSkillAngleStart(d) + columnAngle)
    .innerRadius(innerRadius + 1)
    .outerRadius(outerRadius - 1)

  /* A d3.js arc generator for each segment of a skills bar where a single bar
  is split into segments per level.
  */
  const barSegmentArc = d3
    .arc()
    .startAngle((d) => getSkillAngleStart(d))
    .endAngle((d) => getSkillAngleStart(d) + columnAngle)
    .innerRadius((_, lvl) => lvlHeight(lvl - 1) + 1)
    .outerRadius((_, lvl) => lvlHeight(lvl + 0) - 1)
    .padRadius(-1)
    .padAngle(0.01)

  /* A d3.js arc generator for the arc that is at the base of the category. */
  const categoryBaseArc = d3
    .arc()
    .innerRadius(innerRadius - 1)
    .outerRadius(innerRadius - 3)
    .startAngle((category) => categoryStartAngleMap[category])
    .endAngle(
      (category) =>
        categoryStartAngleMap[category] +
        columnAngle * (groupedByCategory.get(category)?.length ?? 0) +
        (groupedByCategory.get(category)?.length ?? 0) * skillPadding
    )

  /* A d3.js arc generator for the ring that shows each level for the entire plot */
  const lvlRing = d3
    .arc()
    .innerRadius((lvl) => lvlHeight(lvl) - 0.5)
    .outerRadius((lvl) => lvlHeight(lvl) + 0)
    .startAngle(0)
    .endAngle(totalArcAngle + (fullCircleAngle - totalArcAngle) / 2)

  return {
    sortedCategories,
    filteredCategories,
    groupedByCategory,
    catAnnotationPointInner: catAnnotationPointInner(categoryStartAngleMap),
    catAnnotationPointOuter: catAnnotationPointOuter(categoryStartAngleMap),
    barArc,
    barFullHeightArc,
    barSegmentArc,
    categoryBaseArc,
    lvlRing,
    lvlsArray,
    outerRadius,
    innerRadius,
    getYPoint: lvlHeight,
  }
}

/* Get the width of the category label based on the length of the category string */
export function getCatLabelWidth(cat) {
  return cat.length * 10
}
