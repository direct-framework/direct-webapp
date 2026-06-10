import * as d3 from 'd3'
import { splitTextToFitWidth } from './utils'

const fullCircleAngle = Math.PI * 2

/* Use d3's schemeSpectral color scheme to get a color for each category

Usage:
const colorFn = getColor(sortedCategories);
const color = colorFn(category);
*/
export function getColor(categories, colourList = d3.schemeAccent) {
  return d3.scaleOrdinal().domain(categories).range(colourList).unknown('#ccc')
}

/* Get the point at the bottom left of the category.

Used as the start point of the line from category segments to category label  */
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

/* Calculates label position based on offset from y centre */
// NOTE: This is an alternate method. Delete once confirmed using the other one
// export const catAnnotationPointOuterLabel =
//   (categoryStartAngleMap, catLabelWidthHeightMap, xPadding, yPadding) =>
//   (categoryId) => {
//     const angle = categoryStartAngleMap[categoryId] % fullCircleAngle
//     const xSide = Math.sin(angle) > 0 ? 1 : -1
//     const ySide = -Math.cos(angle) > 0 ? 1 : -1

//     const catsOnThisSide = Object.keys(categoryStartAngleMap)
//       .filter((catId) => {
//         const inXSide = Math.sin(categoryStartAngleMap[catId]) > 0 ? 1 : -1
//         const inYSide = -Math.cos(categoryStartAngleMap[catId]) > 0 ? 1 : -1
//         return inXSide === xSide && inYSide === ySide
//       })
//       .sort((a, b) =>
//         (ySide === -1 && xSide === -1) || (ySide === 1 && xSide === 1)
//           ? categoryStartAngleMap[a] > categoryStartAngleMap[b]
//             ? 1
//             : -1
//           : categoryStartAngleMap[a] > categoryStartAngleMap[b]
//           ? -1
//           : 1
//       )

//     const thisCatIndex = catsOnThisSide.indexOf(categoryId)
//     const preCatHeights = catsOnThisSide
//       .slice(0, thisCatIndex)
//       .reduce((acc, catId) => acc + catLabelWidthHeightMap[catId].height, 0)
//     const x = xSide * xPadding
//     const y = ySide * (preCatHeights + (thisCatIndex + 3) * yPadding)

//     return { x, y }
//   }

/* Calculates label position based on position in quadrant*/
export const catAnnotationPointOuterLabel =
  (categoryStartAngleMap, catLabelWidthHeightMap, xPadding, yPadding, plotHeight) =>
  (categoryId) => {
    const angle = categoryStartAngleMap[categoryId] % fullCircleAngle
    const xSide = Math.sin(angle) > 0 ? 1 : -1
    const ySide = -Math.cos(angle) > 0 ? 1 : -1

    const catsInThisQuadrant = Object.keys(categoryStartAngleMap)
      .filter((catId) => {
        const inXSide = Math.sin(categoryStartAngleMap[catId]) > 0 ? 1 : -1
        const inYSide = -Math.cos(categoryStartAngleMap[catId]) > 0 ? 1 : -1
        return inXSide === xSide && inYSide === ySide
      })
      .sort((a, b) =>
        (ySide === -1 && xSide === -1) || (ySide === 1 && xSide === 1)
          ? categoryStartAngleMap[a] > categoryStartAngleMap[b]
            ? 1
            : -1
          : categoryStartAngleMap[a] > categoryStartAngleMap[b]
            ? -1
            : 1
      )

    const thisCatIndex =
      catsInThisQuadrant.length - catsInThisQuadrant.indexOf(categoryId) - 1
    const preCatHeights = catsInThisQuadrant
      .slice(0, thisCatIndex)
      .reduce((acc, catId) => acc + catLabelWidthHeightMap[catId].height, 0)

    const topPadding = 2.8 // TODO: Make this clearer and configurable
    const x = xSide * xPadding
    const y =
      ySide * (plotHeight / topPadding - preCatHeights - thisCatIndex * yPadding)

    return { x, y }
  }

/* Get the arcs for the radial bar chart. This includes the skill bars, category
  base, and level rings. It also includes the start angles for each skill and
  category, and the height of each level.

  The function takes in the following parameters:
    width: number;
    height: number;
    innerRadius: number;
    outerRadius: number;
    categoryPadding: number;
    skillPadding: number;
    arcPercent: number;
    arcStartOffset: number;
    labelXOffset = 1.1,
    labelYSpacing = 10,
    maxLabelWidth = 150,
    fontSize = 14,

  The function returns a function that takes in the following parameters:
    skillsData: IDataItem[];
    categories: Category[];
    groupedByCategory: Map<Category, IDataItem[]>;

    where IDataItem is an object with the following properties:
      skill: string;
      category: string;
      skill_level: number;
      color: string;

    Category is an object with the following properties:
      skillsData: IDataItem[];
      levels: Level[];
      categories: Category[];
      groupedByCategory: Map<Category, IDataItem[]>;
*/
export const getArcsFn =
  ({
    width,
    height,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2 - 20,
    categoryPadding = 0.1,
    skillPadding = 0.05,
    arcPercent = 0.8,
    arcStartOffset = 0.1,
    labelXOffset = 1.1,
    labelYSpacing = 10,
    maxLabelWidth = 150,
    fontSize = 14,
  }) =>
  // eslint-disable-next-line indent
  ({ skillsData, levels, categories, groupedByCategory }) => {
    const maxLvl = d3.max(levels, (d) => d.level) ?? 0
    const minLvl = d3.min(levels, (d) => d.level) ?? 0

    const lvlsArray = levels.sort((a, b) => a.level - b.level)

    /* Total angle used by skills. Remaining is left blank */
    const totalArcAngle = fullCircleAngle * arcPercent
    const totalSkillCount = skillsData.length

    /* Calculate the column widths based on the available width
        shared between the categories and the skills with padding
        included
        */
    const columnAngle =
      (totalArcAngle -
        categoryPadding * (categories.length - 1) -
        skillPadding * totalSkillCount) /
      totalSkillCount

    /* Calculate the start angle for each category based on the number of skills
        in each category and the position of previous categories
        */
    const categoryStartAngle = categories.reduce(
      (acc, category) => [
        ...acc,
        (acc[acc.length - 1] +
          ((groupedByCategory.get(category.id)?.length ?? 0) * columnAngle +
            (groupedByCategory.get(category.id)?.length ?? 0) * skillPadding +
            categoryPadding)) %
          (Math.PI * 2),
      ],
      [fullCircleAngle * arcStartOffset]
    )

    /* Convert the category start angles to a map for easy access

      categoryStartAngleMap: Record<Category, number>
      */
    const categoryStartAngleMap = categoryStartAngle
      .slice(0, -1)
      .reduce((acc, v, i) => ({ ...acc, [categories[i]?.id]: v }), {})
    /* Calculate the start angle for each skill based on the category start angle
        and the position of previous skills.
        Stored as a map where key = category-skill

        skillAngleStart: Record<string, number>
      */
    const skillAngleStart = skillsData.reduce(
      (acc, d) => ({
        ...acc,
        [`${d.category}-${d.skill}`]:
          categoryStartAngleMap[d.category] +
          skillPadding +
          (groupedByCategory.get(d.category)?.findIndex((s) => s.skill == d.skill) ??
            0) *
            columnAngle +
          (groupedByCategory.get(d.category)?.findIndex((s) => s.skill == d.skill) ??
            0) *
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
        at the bottom of the level */
    const lvlHeight = d3
      .scaleLinear()
      .domain([minLvl, maxLvl + 1]) // Use max lvl + 1 as we need the top and bottom of each lvl
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
      .innerRadius((_, lvl) => lvlHeight(lvl))
      .outerRadius((_, lvl) => lvlHeight(lvl + 1)) // + 1 as top of level
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

    const thicknessOfLvlRing = 0.5
    /* A d3.js arc generator for the ring that shows each level for the entire plot */
    const lvlRing = d3
      .arc()
      .innerRadius((lvl) => lvlHeight(lvl + 1) - thicknessOfLvlRing) // use + 1 as ring at top of lvl
      .outerRadius((lvl) => lvlHeight(lvl + 1)) // use + 1 as ring at top of lvl
      .startAngle(0)
      .endAngle(totalArcAngle + (fullCircleAngle - totalArcAngle) / 2)

    const getCatLabelWidth = getCatLabelWidthFn(fontSize)
    const catLabelWidthHeightMap = categories.reduce((acc, cat) => {
      // TODO: This is repeated
      const newLabel = splitTextToFitWidth(cat.id, maxLabelWidth, fontSize)
      const labelWidthCalced = getCatLabelWidth(cat.id)
      const labelWidth = Math.min(labelWidthCalced, maxLabelWidth)
      // If the label width is greater than the max label width, wrap the text
      // by increasing the labelHeight to be a multiple of the font size
      // TODO: Move label padding to config
      const labelPadding = 5 // Padding between lines
      const labelHeight = fontSize * newLabel.length + labelPadding

      acc[cat.id] = {
        width: labelWidth,
        height: labelHeight,
      }
      return acc
    }, {})

    return {
      catAnnotationPointInner: catAnnotationPointInner(categoryStartAngleMap),
      catAnnotationPointOuter: catAnnotationPointOuter(categoryStartAngleMap),
      catAnnotationPointOuterLabel: catAnnotationPointOuterLabel(
        categoryStartAngleMap,
        catLabelWidthHeightMap,
        labelXOffset,
        labelYSpacing,
        height
      ),
      barArc,
      barFullHeightArc,
      barSegmentArc,
      categoryBaseArc,
      lvlRing,
      lvlsArray,
      outerRadius,
      innerRadius,
      getYPoint: lvlHeight,
      catLabelWidthHeightMap,
    }
  }

/* Preprocess the data for the radial bar chart. This includes calculating the
  start and end angles for each skill, the height of each level, and the
  category start angles. It also includes creating the arc generators for the
  skill bars, category base, and level rings.

  The function takes in the following parameters:
    data: IDataItem[];
    colourList?: string[];

  Where IDataItem is an object with the following properties:
    skill: string;
    category: string;
    skill_level: number;
*/
export function radialBarChartPreProcessing({ data, colourList }) {
  const categoryIds = [...d3.union(data.map((d) => d.category)).keys()]
  const sortedCategories = categoryIds.sort()

  const colorFn = getColor(sortedCategories, colourList)

  const augmentedData = data /* Add color to each data item based on its category */
    .map((d) => ({
      ...d,
      color: colorFn(d.category),
    }))
  const groupedByCategory = d3.group(augmentedData, (d) => d.category)
  const categoriesData = sortedCategories.map((cat) => ({
    id: cat,
    skills: groupedByCategory.get(cat) ?? [],
    color: colorFn(cat),
  }))
  return {
    sortedCategories: categoriesData,
    groupedByCategory,
    skillsData: augmentedData,
  }
}

/* Get the width of the category label based on the length of the category string */
export const getCatLabelWidthFn = (fontSize) => (cat) => {
  const width = cat.length * fontSize
  return width
}
