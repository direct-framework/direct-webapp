import * as d3 from 'd3'

export const defaultConfig = {
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

export const levels = [
  // { level: 0, name: 'None' },
  { level: 1, name: 'Beginner' },
  { level: 2, name: 'Intermediate' },
  { level: 3, name: 'Advanced' },
  { level: 4, name: 'Advanced Plus' },
  { level: 5, name: 'Advanced Plus 2' },
]
