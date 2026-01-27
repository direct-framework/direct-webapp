import { describe, test, expect } from 'vitest'
import * as d3 from 'd3'
import {
  getColor,
  catAnnotationPointInner,
  catAnnotationPointOuter,
  catAnnotationPointOuterLabel,
  getArcsFn,
  radialBarChartPreProcessing,
  getCatLabelWidthFn,
} from './radial-plot-dataprocessing'

describe('RadialBarChart-dataprocessing', () => {
  describe('getColor', () => {
    test('should return a d3 color scale function', () => {
      const categories = ['cat1', 'cat2', 'cat3']
      const colorFn = getColor(categories)
      expect(colorFn).toBeDefined()
      expect(typeof colorFn).toBe('function')
    })

    test('should assign colors from the default color list', () => {
      const categories = ['cat1', 'cat2', 'cat3']
      const colorFn = getColor(categories)
      const color1 = colorFn('cat1')
      const color2 = colorFn('cat2')
      expect(color1).toBeDefined()
      expect(color2).toBeDefined()
      expect(color1).not.toBe(color2)
    })

    test('should use custom color list when provided', () => {
      const categories = ['cat1', 'cat2']
      const customColors = ['#ff0000', '#00ff00']
      const colorFn = getColor(categories, customColors)
      expect(colorFn('cat1')).toBe('#ff0000')
      expect(colorFn('cat2')).toBe('#00ff00')
    })

    test('should return unknown color (#ccc) for categories not in domain', () => {
      const categories = ['cat1', 'cat2']
      const colorFn = getColor(categories)
      expect(colorFn('unknown')).toBe('#ccc')
    })

    test('should handle empty categories array', () => {
      const categories = []
      const colorFn = getColor(categories)
      expect(colorFn).toBeDefined()
      expect(typeof colorFn).toBe('function')
    })
  })

  describe('catAnnotationPointInner', () => {
    test('should return a function that calculates inner annotation points', () => {
      const categoryStartAngleMap = { cat1: 0, cat2: Math.PI / 2 }
      const pointFn = catAnnotationPointInner(categoryStartAngleMap)
      expect(typeof pointFn).toBe('function')
    })

    test('should calculate correct point for angle 0 (top)', () => {
      const categoryStartAngleMap = { cat1: 0 }
      const pointFn = catAnnotationPointInner(categoryStartAngleMap)
      const point = pointFn('cat1')
      expect(point.x).toBeCloseTo(0, 5)
      expect(point.y).toBeCloseTo(-1, 5)
    })

    test('should calculate correct point for angle PI/2 (right)', () => {
      const categoryStartAngleMap = { cat2: Math.PI / 2 }
      const pointFn = catAnnotationPointInner(categoryStartAngleMap)
      const point = pointFn('cat2')
      expect(point.x).toBeCloseTo(1, 5)
      expect(point.y).toBeCloseTo(0, 5)
    })

    test('should calculate correct point for angle PI (bottom)', () => {
      const categoryStartAngleMap = { cat3: Math.PI }
      const pointFn = catAnnotationPointInner(categoryStartAngleMap)
      const point = pointFn('cat3')
      expect(point.x).toBeCloseTo(0, 5)
      expect(point.y).toBeCloseTo(1, 5)
    })

    test('should calculate correct point for angle 3*PI/2 (left)', () => {
      const categoryStartAngleMap = { cat4: (3 * Math.PI) / 2 }
      const pointFn = catAnnotationPointInner(categoryStartAngleMap)
      const point = pointFn('cat4')
      expect(point.x).toBeCloseTo(-1, 5)
      expect(point.y).toBeCloseTo(0, 5)
    })
  })

  describe('catAnnotationPointOuter', () => {
    test('should return a function that calculates outer annotation points', () => {
      const categoryStartAngleMap = { cat1: 0, cat2: Math.PI / 2 }
      const pointFn = catAnnotationPointOuter(categoryStartAngleMap)
      expect(typeof pointFn).toBe('function')
    })

    test('should calculate correct point for angle 0', () => {
      const categoryStartAngleMap = { cat1: 0 }
      const pointFn = catAnnotationPointOuter(categoryStartAngleMap)
      const point = pointFn('cat1')
      expect(point.x).toBeCloseTo(0, 5)
      expect(point.y).toBeCloseTo(-1, 5)
    })

    test('should calculate correct point for angle PI/2', () => {
      const categoryStartAngleMap = { cat2: Math.PI / 2 }
      const pointFn = catAnnotationPointOuter(categoryStartAngleMap)
      const point = pointFn('cat2')
      expect(point.x).toBeCloseTo(1, 5)
      expect(point.y).toBeCloseTo(0, 5)
    })

    test('should handle string angles by converting to number', () => {
      const categoryStartAngleMap = { cat1: '0' }
      const pointFn = catAnnotationPointOuter(categoryStartAngleMap)
      const point = pointFn('cat1')
      expect(point.x).toBeCloseTo(0, 5)
      expect(point.y).toBeCloseTo(-1, 5)
    })
  })

  describe('catAnnotationPointOuterLabel', () => {
    test('should return a function that calculates label positions', () => {
      const categoryStartAngleMap = { cat1: 0 }
      const catLabelWidthHeightMap = { cat1: { width: 100, height: 20 } }
      const labelFn = catAnnotationPointOuterLabel(
        categoryStartAngleMap,
        catLabelWidthHeightMap,
        1.1,
        10,
        500
      )
      expect(typeof labelFn).toBe('function')
    })

    test('should calculate label position for category at angle 0', () => {
      const categoryStartAngleMap = { cat1: 0 }
      const catLabelWidthHeightMap = { cat1: { width: 100, height: 20 } }
      const labelFn = catAnnotationPointOuterLabel(
        categoryStartAngleMap,
        catLabelWidthHeightMap,
        1.1,
        10,
        500
      )
      const point = labelFn('cat1')
      expect(point.x).toBeDefined()
      expect(point.y).toBeDefined()
    })

    test('should position labels on correct side based on angle', () => {
      const categoryStartAngleMap = {
        cat1: 0.1, // Upper right
        cat2: 2 * Math.PI - 0.1, // Upper left
      }
      const catLabelWidthHeightMap = {
        cat1: { width: 100, height: 20 },
        cat2: { width: 100, height: 20 },
        cat3: { width: 100, height: 20 },
        cat4: { width: 100, height: 20 },
      }
      const labelFn = catAnnotationPointOuterLabel(
        categoryStartAngleMap,
        catLabelWidthHeightMap,
        1.1,
        10,
        500
      )
      const point1 = labelFn('cat1')
      const point2 = labelFn('cat2')
      expect(point1.x).toBeGreaterThan(0) // Right side
      expect(point2.x).toBeLessThan(0) // Left side
    })

    test('should stack labels on the same side', () => {
      const categoryStartAngleMap = {
        cat1: 0.1,
        cat2: 0.2,
        cat3: 0.3,
      }
      const catLabelWidthHeightMap = {
        cat1: { width: 100, height: 20 },
        cat2: { width: 100, height: 20 },
        cat3: { width: 100, height: 20 },
      }
      const labelFn = catAnnotationPointOuterLabel(
        categoryStartAngleMap,
        catLabelWidthHeightMap,
        1.1,
        10,
        500
      )
      const point1 = labelFn('cat1')
      const point2 = labelFn('cat2')
      const point3 = labelFn('cat3')
      // All should be on same side
      expect(Math.sign(point1.x)).toBe(Math.sign(point2.x))
      expect(Math.sign(point2.x)).toBe(Math.sign(point3.x))
    })
  })

  describe('radialBarChartPreProcessing', () => {
    test('should process data and return sorted categories', () => {
      const data = [
        { skill: 'skill1', category: 'cat2', skill_level: 1 },
        { skill: 'skill2', category: 'cat1', skill_level: 2 },
      ]
      const result = radialBarChartPreProcessing({ data, colourList: d3.schemeAccent })
      expect(result.sortedCategories).toBeDefined()
      expect(result.sortedCategories.length).toBe(2)
      expect(result.sortedCategories[0].id).toBe('cat1')
      expect(result.sortedCategories[1].id).toBe('cat2')
    })

    test('should add color property to each data item', () => {
      const data = [{ skill: 'skill1', category: 'cat1', skill_level: 1 }]
      const result = radialBarChartPreProcessing({ data, colourList: d3.schemeAccent })
      expect(result.skillsData[0].color).toBeDefined()
      expect(typeof result.skillsData[0].color).toBe('string')
    })

    test('should group data by category', () => {
      const data = [
        { skill: 'skill1', category: 'cat1', skill_level: 1 },
        { skill: 'skill2', category: 'cat1', skill_level: 2 },
        { skill: 'skill3', category: 'cat2', skill_level: 3 },
      ]
      const result = radialBarChartPreProcessing({ data, colourList: d3.schemeAccent })
      expect(result.groupedByCategory).toBeDefined()
      expect(result.groupedByCategory.get('cat1').length).toBe(2)
      expect(result.groupedByCategory.get('cat2').length).toBe(1)
    })

    test('should create category data with id, skills, and color', () => {
      const data = [
        { skill: 'skill1', category: 'cat1', skill_level: 1 },
        { skill: 'skill2', category: 'cat1', skill_level: 2 },
      ]
      const result = radialBarChartPreProcessing({ data, colourList: d3.schemeAccent })
      const category = result.sortedCategories[0]
      expect(category.id).toBe('cat1')
      expect(category.skills).toBeDefined()
      expect(category.skills.length).toBe(2)
      expect(category.color).toBeDefined()
    })

    test('should handle empty data array', () => {
      const data = []
      const result = radialBarChartPreProcessing({ data, colourList: d3.schemeAccent })
      expect(result.sortedCategories).toEqual([])
      expect(result.skillsData).toEqual([])
      expect(result.groupedByCategory.size).toBe(0)
    })

    test('should handle single data item', () => {
      const data = [{ skill: 'skill1', category: 'cat1', skill_level: 1 }]
      const result = radialBarChartPreProcessing({ data, colourList: d3.schemeAccent })
      expect(result.sortedCategories.length).toBe(1)
      expect(result.skillsData.length).toBe(1)
    })

    test('should assign same color to items in same category', () => {
      const data = [
        { skill: 'skill1', category: 'cat1', skill_level: 1 },
        { skill: 'skill2', category: 'cat1', skill_level: 2 },
      ]
      const result = radialBarChartPreProcessing({ data, colourList: d3.schemeAccent })
      expect(result.skillsData[0].color).toBe(result.skillsData[1].color)
    })

    test('should use custom color list when provided', () => {
      const data = [{ skill: 'skill1', category: 'cat1', skill_level: 1 }]
      const customColors = ['#ff0000']
      const result = radialBarChartPreProcessing({ data, colourList: customColors })
      expect(result.skillsData[0].color).toBe('#ff0000')
    })
  })

  describe('getCatLabelWidthFn', () => {
    test('should return a function', () => {
      const widthFn = getCatLabelWidthFn(10)
      expect(typeof widthFn).toBe('function')
    })

    test('should calculate width based on category length and font size', () => {
      const fontSize = 10
      const widthFn = getCatLabelWidthFn(fontSize)
      const category = 'TestCat'
      const width = widthFn(category)
      expect(width).toBe(category.length * fontSize)
    })

    test('should return larger width for longer category names', () => {
      const widthFn = getCatLabelWidthFn(10)
      const shortCatString = 'Cat'
      const longCatString = 'Very Long Category Name'
      expect(widthFn(longCatString)).toBeGreaterThan(widthFn(shortCatString))
    })

    test('should scale with font size', () => {
      const category = 'TestCat'
      const widthFn10 = getCatLabelWidthFn(10)
      const widthFn20 = getCatLabelWidthFn(20)
      expect(widthFn20(category)).toBe(widthFn10(category) * 2)
    })

    test('should return 0 for empty string', () => {
      const widthFn = getCatLabelWidthFn(10)
      expect(widthFn('')).toBe(0)
    })
  })

  describe('getArcsFn', () => {
    const defaultParams = {
      width: 640,
      height: 512,
      innerRadius: 80,
      outerRadius: 200,
      categoryPadding: 0.1,
      skillPadding: 0.05,
      arcPercent: 0.8,
      arcStartOffset: 0.1,
      labelXOffset: 1.1,
      labelYSpacing: 10,
      maxLabelWidth: 150,
      fontSize: 14,
    }

    const sampleData = {
      skillsData: [
        { skill: 'skill1', category: 'cat1', skill_level: 2, color: '#ff0000' },
        { skill: 'skill2', category: 'cat1', skill_level: 3, color: '#ff0000' },
        { skill: 'skill3', category: 'cat2', skill_level: 1, color: '#00ff00' },
      ],
      levels: [
        { level: 1, name: 'Beginner' },
        { level: 2, name: 'Intermediate' },
        { level: 3, name: 'Advanced' },
      ],
      categories: [
        { id: 'cat1', skills: [], color: '#ff0000' },
        { id: 'cat2', skills: [], color: '#00ff00' },
      ],
      groupedByCategory: new Map([
        [
          'cat1',
          [
            { skill: 'skill1', category: 'cat1', skill_level: 2, color: '#ff0000' },
            { skill: 'skill2', category: 'cat1', skill_level: 3, color: '#ff0000' },
          ],
        ],
        [
          'cat2',
          [{ skill: 'skill3', category: 'cat2', skill_level: 1, color: '#00ff00' }],
        ],
      ]),
    }

    test('should return a function', () => {
      const arcsFn = getArcsFn(defaultParams)
      expect(typeof arcsFn).toBe('function')
    })

    test('should return object with all required arc generators', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      expect(result.barArc).toBeDefined()
      expect(result.barFullHeightArc).toBeDefined()
      expect(result.barSegmentArc).toBeDefined()
      expect(result.categoryBaseArc).toBeDefined()
      expect(result.lvlRing).toBeDefined()
    })

    test('should return annotation point functions', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      expect(typeof result.catAnnotationPointInner).toBe('function')
      expect(typeof result.catAnnotationPointOuter).toBe('function')
      expect(typeof result.catAnnotationPointOuterLabel).toBe('function')
    })

    test('should return sorted levels array', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      expect(result.lvlsArray).toBeDefined()
      expect(result.lvlsArray.length).toBe(3)
      expect(result.lvlsArray[0].level).toBe(1)
      expect(result.lvlsArray[2].level).toBe(3)
    })

    test('should return radii values', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      expect(result.outerRadius).toBe(defaultParams.outerRadius)
      expect(result.innerRadius).toBe(defaultParams.innerRadius)
    })

    test('should return getYPoint function', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      expect(typeof result.getYPoint).toBe('function')
    })

    test('should return catLabelWidthHeightMap', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      expect(result.catLabelWidthHeightMap).toBeDefined()
      expect(result.catLabelWidthHeightMap['cat1']).toBeDefined()
      expect(result.catLabelWidthHeightMap['cat1'].width).toBeDefined()
      expect(result.catLabelWidthHeightMap['cat1'].height).toBeDefined()
    })

    test('should handle empty skillsData', () => {
      const arcsFn = getArcsFn(defaultParams)
      const emptyData = {
        ...sampleData,
        skillsData: [],
      }
      const result = arcsFn(emptyData)
      expect(result).toBeDefined()
    })

    test('should use default values when parameters are omitted', () => {
      const minimalParams = {
        width: 640,
        height: 512,
      }
      const arcsFn = getArcsFn(minimalParams)
      expect(typeof arcsFn).toBe('function')
      const result = arcsFn(sampleData)
      expect(result).toBeDefined()
    })

    test('should calculate barArc correctly', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      const arcPath = result.barArc(sampleData.skillsData[0])
      expect(arcPath).toBeDefined()
      expect(typeof arcPath).toBe('string')
    })

    test('should calculate barFullHeightArc correctly', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      const arcPath = result.barFullHeightArc(sampleData.skillsData[0])
      expect(arcPath).toBeDefined()
      expect(typeof arcPath).toBe('string')
    })

    test('should calculate barSegmentArc correctly', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      const arcPath = result.barSegmentArc(sampleData.skillsData[0], 1)
      expect(arcPath).toBeDefined()
      expect(typeof arcPath).toBe('string')
    })

    test('should calculate categoryBaseArc correctly', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      const arcPath = result.categoryBaseArc('cat1')
      expect(arcPath).toBeDefined()
      expect(typeof arcPath).toBe('string')
    })

    test('should calculate lvlRing correctly', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      const arcPath = result.lvlRing(1)
      expect(arcPath).toBeDefined()
      expect(typeof arcPath).toBe('string')
    })

    test('should respect custom arcPercent', () => {
      const customParams = { ...defaultParams, arcPercent: 0.5 }
      const arcsFn = getArcsFn(customParams)
      const result = arcsFn(sampleData)
      expect(result).toBeDefined()
    })

    test('should respect custom arcStartOffset', () => {
      const customParams = { ...defaultParams, arcStartOffset: 0.25 }
      const arcsFn = getArcsFn(customParams)
      const result = arcsFn(sampleData)
      expect(result).toBeDefined()
    })

    test('should respect custom padding values', () => {
      const customParams = {
        ...defaultParams,
        categoryPadding: 0.2,
        skillPadding: 0.1,
      }
      const arcsFn = getArcsFn(customParams)
      const result = arcsFn(sampleData)
      expect(result).toBeDefined()
    })

    test('should handle single category', () => {
      const singleCategoryData = {
        ...sampleData,
        categories: [{ id: 'cat1', skills: [], color: '#ff0000' }],
        groupedByCategory: new Map([
          [
            'cat1',
            [{ skill: 'skill1', category: 'cat1', skill_level: 2, color: '#ff0000' }],
          ],
        ]),
      }
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(singleCategoryData)
      expect(result).toBeDefined()
    })

    test('should handle single skill', () => {
      const singleSkillData = {
        skillsData: [
          { skill: 'skill1', category: 'cat1', skill_level: 2, color: '#ff0000' },
        ],
        levels: [
          { level: 1, name: 'Beginner' },
          { level: 2, name: 'Intermediate' },
        ],
        categories: [{ id: 'cat1', skills: [], color: '#ff0000' }],
        groupedByCategory: new Map([
          [
            'cat1',
            [{ skill: 'skill1', category: 'cat1', skill_level: 2, color: '#ff0000' }],
          ],
        ]),
      }
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(singleSkillData)
      expect(result).toBeDefined()
    })

    test('should correctly map label widths for all categories', () => {
      const arcsFn = getArcsFn(defaultParams)
      const result = arcsFn(sampleData)

      expect(result.catLabelWidthHeightMap['cat1']).toBeDefined()
      expect(result.catLabelWidthHeightMap['cat2']).toBeDefined()
      expect(result.catLabelWidthHeightMap['cat1'].width).toBeGreaterThan(0)
      expect(result.catLabelWidthHeightMap['cat1'].height).toBeGreaterThan(0)
    })

    test('should respect maxLabelWidth in label width calculations', () => {
      const customParams = { ...defaultParams, maxLabelWidth: 50 }
      const longCategoryData = {
        ...sampleData,
        categories: [
          {
            id: 'Very Long Category Name That Exceeds Max Width',
            skills: [],
            color: '#ff0000',
          },
        ],
      }
      const arcsFn = getArcsFn(customParams)
      const result = arcsFn(longCategoryData)

      const labelWidth =
        result.catLabelWidthHeightMap['Very Long Category Name That Exceeds Max Width']
          .width
      expect(labelWidth).toBeLessThanOrEqual(50)
    })

    test('should increase label height for wrapped text', () => {
      const customParams = { ...defaultParams, maxLabelWidth: 50 }
      const longCategoryData = {
        ...sampleData,
        categories: [
          {
            id: 'Very Long Category Name',
            skills: [],
            color: '#ff0000',
          },
        ],
      }
      const arcsFn = getArcsFn(customParams)
      const result = arcsFn(longCategoryData)

      const labelHeight =
        result.catLabelWidthHeightMap['Very Long Category Name'].height
      // Height should be greater than single line (fontSize + padding)
      expect(labelHeight).toBeGreaterThan(customParams.fontSize)
    })

    test('should handle different font sizes', () => {
      const smallFontParams = { ...defaultParams, fontSize: 10 }
      const largeFontParams = { ...defaultParams, fontSize: 20 }

      const arcsFnSmall = getArcsFn(smallFontParams)
      const arcsFnLarge = getArcsFn(largeFontParams)

      const resultSmall = arcsFnSmall(sampleData)
      const resultLarge = arcsFnLarge(sampleData)

      expect(resultSmall.catLabelWidthHeightMap['cat1'].height).toBeLessThan(
        resultLarge.catLabelWidthHeightMap['cat1'].height
      )
    })
  })
})
