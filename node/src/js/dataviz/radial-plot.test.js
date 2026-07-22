import { afterEach, vitest as vi } from 'vitest'
import { describe, test, expect, beforeEach } from 'vitest'
import * as d3 from 'd3'
import { RadialBarChart } from './radial-plot'
import { defaultConfig, levels as defaultLevels } from './defaults'
import { generateRandomData } from './mock-data'

function flushAllD3Transitions() {
  let now = performance.now
  performance.now = function () {
    return Infinity
  }
  d3.timerFlush()
  performance.now = now
}

//  Mock the transition multiplier to speed up tests that involve transitions
vi.mock('./config', () => ({
  transitionMultiplier: 0, // Set to 0 to disable delays in transitions
}))

describe('RadialBarChart', () => {
  let container

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // Clean up the container after each test
    document.body.removeChild(container)
    container = null
  })

  /* Function to test that changing a config option changes the bar positions

  Used for tests where testing the actual position is tricky.
  */
  const checkChangesBarPosition = (config1, config2) => {
    RadialBarChart({
      target: container,
      data: generateRandomData(10, 3, 4),
      levels: defaultLevels,
      config: config1,
    })
    const bars = container.querySelectorAll('.bar-outline')
    const shapeDatas = Array.from(bars).map((bar) => bar.getAttribute('d'))

    document.body.removeChild(container)
    container = null
    container = document.createElement('div')
    document.body.appendChild(container)

    RadialBarChart({
      target: container,
      data: generateRandomData(10, 3, 4),
      levels: defaultLevels,
      config: config2,
    })

    const bars2 = container.querySelectorAll('.bar-outline')
    const shapeDatas2 = Array.from(bars2).map((bar) => bar.getAttribute('d'))

    shapeDatas.forEach((d, i) => {
      expect(d).not.equal(shapeDatas2[i], 0) // Should be different with different arcPercent
    })
  }

  /* Function to test that changing a config option changes the group label positions

  Used for tests where testing the actual position is tricky.
  */
  const checkChangesGroupPosition = (config1, config2) => {
    RadialBarChart({
      target: container,
      data: generateRandomData(10, 3, 4),
      levels: defaultLevels,
      config: config1,
    })
    const groupLabels = container.querySelectorAll('.annotation-cat-label')
    const shapeDatas = Array.from(groupLabels).map((label) =>
      parseFloat(label.getAttribute('x'))
    )

    document.body.removeChild(container)
    container = null
    container = document.createElement('div')
    document.body.appendChild(container)

    RadialBarChart({
      target: container,
      data: generateRandomData(10, 3, 4),
      levels: defaultLevels,
      config: config2,
    })

    const groupLabels2 = container.querySelectorAll('.annotation-cat-label')
    const shapeDatas2 = Array.from(groupLabels2).map((label) =>
      parseFloat(label.getAttribute('x'))
    )

    shapeDatas.forEach((d, i) => {
      expect(d).not.toBeCloseTo(shapeDatas2[i], 0) // Should be different with different arcPercent
    })
  }

  describe('Basic Initialization', () => {
    /* Sense check we created a d3 svg container */
    test('should create a RadialBarChart instance without errors', () => {
      const chart = RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      expect(chart).toBeDefined()
    })

    test('should create an SVG element in the target container', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
      expect(svg.classList.contains('radial-bar-chart')).toBe(true)
    })
  })

  describe('Configuration Handling', () => {
    /* Check that we can configure the chart correctly */
    test('should apply default configuration when no config is provided', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const svg = container.querySelector('svg')
      expect(svg.getAttribute('width')).toBe(defaultConfig.width.toString()) // default width
    })

    test('should apply custom width from config', () => {
      const customWidth = 800
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { width: customWidth },
      })
      const svg = container.querySelector('svg')
      expect(svg.getAttribute('width')).toBe(customWidth.toString())
    })

    test('should apply custom height from config', () => {
      const customHeight = 600
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { height: customHeight },
      })
      const svg = container.querySelector('svg')
      expect(svg.getAttribute('height')).toBe(customHeight.toString())
    })

    test('should calculate height as 0.8 * width when height is not provided', () => {
      const customWidth = 800
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { width: customWidth },
      })
      const svg = container.querySelector('svg')
      const expectedHeight = customWidth * 0.8
      expect(svg.getAttribute('height')).toBe(expectedHeight.toString())
    })
  })

  describe('Data Rendering', () => {
    test('should render bars for all data items', () => {
      const skillCount = 5
      const testData = generateRandomData(skillCount, 2, 4)
      RadialBarChart({
        target: container,
        data: testData,
        levels: defaultLevels,
        config: {},
      })
      const barGroups = container.querySelectorAll('.bar-group')
      expect(barGroups.length).toEqual(skillCount)
    })

    test('should render level rings', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const lvlRings = container.querySelectorAll('.lvl-rings-ring')
      expect(lvlRings.length).toEqual(defaultLevels.length)
    })

    test('should handle empty data array', () => {
      const chart = RadialBarChart({
        target: container,
        data: [],
        levels: defaultLevels,
        config: {},
      })
      expect(chart).toBeDefined()
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })

    test('should handle single data point', () => {
      const singleData = [
        { skill: 'test-skill', category: 'test-category', skill_level: 2 },
      ]
      const chart = RadialBarChart({
        target: container,
        data: singleData,
        levels: defaultLevels,
        config: {},
      })
      expect(chart).toBeDefined()
      const barGroups = container.querySelectorAll('.bar-group')
      expect(barGroups.length).toBe(1)
    })
  })

  describe('Bar Rendering', () => {
    test('should create bar elements for each data point', () => {
      const skillCount = 10
      const skillsData = generateRandomData(skillCount, 3, 4)
      const skillSegmentCount = skillsData.reduce(
        (sum, skill) => sum + skill.skill_level,
        0
      )
      RadialBarChart({
        target: container,
        data: skillsData,
        levels: defaultLevels,
        config: {},
      })
      const bars = container.querySelectorAll('.bar-segment')
      expect(bars.length).toEqual(skillSegmentCount)
    })

    test('should create bar-outline elements for hover detection', () => {
      const skillCount = 10
      RadialBarChart({
        target: container,
        data: generateRandomData(skillCount, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const barOutlines = container.querySelectorAll('.bar-outline')
      expect(barOutlines.length).toEqual(skillCount)
    })

    test('should create bar segments for skill levels', () => {
      const testData = [
        { skill: 'test-skill-1', category: 'test-category', skill_level: 3 },
        { skill: 'test-skill-2', category: 'test-category', skill_level: 2 },
      ]
      RadialBarChart({
        target: container,
        data: testData,
        levels: defaultLevels,
        config: {},
      })
      const barSegments = container.querySelectorAll('.bar-segment')
      // Should have 3 + 2 = 5 segments total
      expect(barSegments.length).toBe(5)
    })

    test('should create bars grouped by category', () => {
      const testData = [
        { skill: 'skill-1', category: 'cat-1', skill_level: 2 },
        { skill: 'skill-2', category: 'cat-1', skill_level: 3 },
        { skill: 'skill-3', category: 'cat-2', skill_level: 1 },
      ]
      RadialBarChart({
        target: container,
        data: testData,
        levels: defaultLevels,
        config: {},
      })
      const barsGroups = container.querySelectorAll('[class*="Bars-"]')
      expect(barsGroups.length).toBe(2) // 2 categories
    })
  })

  describe('Annotation Rendering', () => {
    test('should render category labels', () => {
      const catCount = 3
      const data = generateRandomData(10, catCount, 4)
      RadialBarChart({
        target: container,
        data,
        levels: defaultLevels,
        config: {},
      })
      const annotations = container.querySelectorAll('.annotation-cat')
      expect(annotations.length).toEqual(catCount)
    })

    test('should render level labels when lvlLabelType is "name"', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { lvlLabelType: 'name' },
      })
      const annotations = container.querySelectorAll('.annontation-lvl')
      expect(annotations.length).toEqual(defaultLevels.length)
    })

    test('should not render level labels when lvlLabelType is "none"', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { lvlLabelType: 'none' },
      })
      // Level labels should not be rendered, but category labels should still be present
      const annotations = container.querySelectorAll('.annontation-lvl')
      expect(annotations.length).toEqual(0)
    })

    test('should render annotation line for each category', () => {
      const catCount = 3
      const data = generateRandomData(10, catCount, 4)

      RadialBarChart({
        target: container,
        data,
        levels: defaultLevels,
        config: {},
      })
      const annotationLines = container.querySelectorAll('.annotation-cat-line')
      expect(annotationLines.length).toEqual(catCount)
    })
  })
  describe('Skill Highlight', () => {
    /* These tests check that when a user hovers over a skill we should additional details */
    test('should create highlighted skill circle with initial opacity 0', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const highlightCircle = container.querySelector('.skill-highlight-circle')
      expect(highlightCircle).not.toBeNull()
      expect(highlightCircle.getAttribute('opacity')).toBe('0')
    })
    test('should set highlighted skill circle opacity to 1 when mouse hovers over a skill', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })

      const skillBar = container.querySelector('.bar-outline')
      const event = new MouseEvent('mouseover', { bubbles: true })
      skillBar.dispatchEvent(event)
      flushAllD3Transitions() // Ensure all D3 transitions have completed
      const highlightCircle = container.querySelector('.skill-highlight-circle')
      expect(highlightCircle.getAttribute('opacity')).toBe('1')
    })

    test('should create highlight text elements', () => {
      /* These are placeholder elements for showing the skill and category name in the centre of the
      skill wheel on hover - they are empty until filled on hover */
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })

      const highlightTextCat = container.querySelector('.skill-highlight-text-cat')
      const highlightTextSkill = container.querySelector('.skill-highlight-text-skill')
      const highlightTextLvl = container.querySelector('.skill-highlight-text-lvl')

      expect(highlightTextCat).not.toBeNull()
      expect(highlightTextSkill).not.toBeNull()
      expect(highlightTextLvl).not.toBeNull()
      expect(highlightTextCat.textContent).toBe('')
      expect(highlightTextSkill.textContent).toBe('')
      expect(highlightTextLvl.textContent).toBe('')
    })
  })

  describe('Color Handling', () => {
    test('should apply colors to categories from color list', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const barGroups = container.querySelectorAll('[class*="Bars-"]')
      barGroups.forEach((group) => {
        const fill = group.getAttribute('fill')
        expect(fill).not.toBeNull()
        expect(d3.schemeAccent).toContain(fill)
      })
    })

    test('should use custom color list when provided', () => {
      const customColors = ['#ff0001', '#00ff01', '#1000ff']
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { colourList: customColors },
      })
      const barGroups = container.querySelectorAll('[class*="Bars-"]')
      barGroups.forEach((group) => {
        const fill = group.getAttribute('fill')
        expect(fill).not.toBeNull()
        expect(customColors).toContain(fill)
      })
    })
  })

  describe('Label Configuration', () => {
    test('should apply custom label text color', () => {
      const customColor = '#123456'
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { labelTextColor: customColor },
      })
      const annotationLabelsContainer = container.querySelectorAll('.annotation-cat')
      annotationLabelsContainer.forEach((labelContainer) => {
        const label = labelContainer.querySelector('.annotation-cat-label')
        const fill = label.getAttribute('color')
        expect(fill).toBe(customColor)
      })
    })

    test('should apply custom font size', () => {
      const customFontSize = 16
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { fontSize: customFontSize },
      })
      const annotationLabelsContainer = container.querySelectorAll('.annotation-cat')
      annotationLabelsContainer.forEach((labelContainer) => {
        const label = labelContainer.querySelector('.annotation-cat-label')
        const fill = label.getAttribute('font-size')
        expect(fill).toBe(customFontSize.toString())
      })
    })

    test('should split long labels to fit within max width', () => {
      const longData = [
        {
          skill: 'skill 1',
          category:
            'Long Category with a long name that should be split into multiple lines',
          skill_level: 2,
        },
      ]
      RadialBarChart({
        target: container,
        data: longData,
        levels: defaultLevels,
        config: { maxLabelWidth: 100 },
      })
      const annotationLabelsContainer = container.querySelectorAll('.annotation-cat')
      annotationLabelsContainer.forEach((labelContainer) => {
        const label = labelContainer.querySelectorAll('.annotation-cat-label')
        expect(label.length).toBeGreaterThan(1) // Should be split into multiple lines
      })
    })
  })

  describe('Arc Configuration', () => {
    test('should apply custom inner radius', () => {
      const customInnerRadius = 100
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { innerRadius: customInnerRadius },
      })
      const highlightCircle = container.querySelector('.skill-highlight-circle')
      expect(highlightCircle).not.toBeNull()
      // Circle radius should be related to inner radius
      const radius = parseFloat(highlightCircle.getAttribute('r'))
      expect(radius).toBeCloseTo(customInnerRadius - 10, 0)
    })

    test('should apply custom arc percent', () => {
      /* This is the percent of the circle that the bars should take up */

      // This is tricky to test so should be tested visually
      // Instead we just check it changes the bar locations
      checkChangesBarPosition({ arcPercent: 0.5 }, { arcPercent: 0.6 })
    })

    test('should apply custom arc start offset', () => {
      /* This is the offset of where the bars start from (0 = top, 0.25 = right etc) */

      // This is tricky to test so should be tested visually
      // Instead we just check it changes the bar locations
      checkChangesBarPosition({ arcStartOffset: 0.5 }, { arcStartOffset: 0.6 })
    })
  })

  describe('Padding Configuration', () => {
    test('should apply custom category padding', () => {
      // This is tricky to test so should be tested visually
      // Instead we just check it changes the bar locations

      checkChangesBarPosition({ categoryPadding: 0.5 }, { categoryPadding: 0.6 })
    })

    test('should apply custom skill padding', () => {
      // This is tricky to test so should be tested visually
      // Instead we just check it changes the bar locations
      checkChangesBarPosition({ skillPadding: 0.1 }, { skillPadding: 0.2 })
    })

    test('should apply custom outer padding', () => {
      // This is tricky to test so should be tested visually
      // Instead we just check it changes the bar locations
      checkChangesBarPosition({ outerPadding: 50 }, { outerPadding: 100 })
    })
  })

  describe('Edge Cases', () => {
    test('should handle data with zero skill level', () => {
      const testData = [{ skill: 'zero-skill', category: 'test-cat', skill_level: 0 }]
      const chart = RadialBarChart({
        target: container,
        data: testData,
        levels: defaultLevels,
        config: {},
      })
      expect(chart).toBeDefined()
      const barSegments = container.querySelectorAll('.bar-segment')
      expect(barSegments.length).toBe(0)
    })

    test('should handle data with maximum skill level', () => {
      const maxLevel = defaultLevels[defaultLevels.length - 1].level
      const testData = [
        { skill: 'max-skill', category: 'test-cat', skill_level: maxLevel },
      ]
      const chart = RadialBarChart({
        target: container,
        data: testData,
        levels: defaultLevels,
        config: {},
      })
      expect(chart).toBeDefined()
      const barSegments = container.querySelectorAll('.bar-segment')
      expect(barSegments.length).toBe(maxLevel)
    })

    test('should handle multiple skills in same category', () => {
      const testData = [
        { skill: 'skill-1', category: 'same-cat', skill_level: 1 },
        { skill: 'skill-2', category: 'same-cat', skill_level: 2 },
        { skill: 'skill-3', category: 'same-cat', skill_level: 3 },
      ]
      const chart = RadialBarChart({
        target: container,
        data: testData,
        levels: defaultLevels,
        config: {},
      })
      expect(chart).toBeDefined()
      const barsGroups = container.querySelectorAll('[class*="Bars-"]')
      expect(barsGroups.length).toBe(1) // All in same category
    })

    test('should handle special characters in category names', () => {
      const specialData = [
        {
          skill: 'test-skill',
          category: 'Cat & Dogs / Birds',
          skill_level: 2,
        },
      ]
      const chart = RadialBarChart({
        target: container,
        data: specialData,
        levels: defaultLevels,
        config: {},
      })
      expect(chart).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    test('should include proper ARIA attributes on main group', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const group = container.querySelector('.radial-bar-chart-group')
      expect(group.getAttribute('aria-label')).toBe('Radial Bar Chart')
      expect(group.getAttribute('role')).toBe('img')
      expect(group.getAttribute('aria-describedby')).toBe(
        'radial-bar-chart-description'
      )
    })
  })

  describe('Smart Label Positioning', () => {
    test('should use smart label positioning by default', () => {
      // This is tricky to test so should be tested visually
      // It should position the labels differently so we just check it changes the label positions
      checkChangesGroupPosition(
        { useSmartLabelPositioning: true },
        { useSmartLabelPositioning: false }
      )
    })

    test('should disable smart label positioning when configured', () => {
      // This is tricky to test so should be tested visually
      // It should position the labels differently so we just check it changes the label positions
      checkChangesGroupPosition(
        { useSmartLabelPositioning: false },
        { useSmartLabelPositioning: true }
      )
    })
  })

  describe('Plot Offset', () => {
    test('should apply custom plot Y offset', () => {
      const customOffset = -50
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { plotYOffset: customOffset },
      })
      const svg = container.querySelector('svg')
      const viewBox = svg.getAttribute('viewBox')
      expect(viewBox).toContain(customOffset.toString())
    })
  })
})
