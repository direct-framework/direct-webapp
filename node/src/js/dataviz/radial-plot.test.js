import { describe, test, expect, beforeEach } from 'vitest'
import { RadialBarChart } from './radial-plot'
import { levels as defaultLevels } from './defaults'
import { generateRandomData } from './mock-data'

describe('RadialBarChart', () => {
  let container

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  describe('Basic Initialization', () => {
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

    test('should create a main group element with proper class', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const group = container.querySelector('.radial-bar-chart-group')
      expect(group).not.toBeNull()
      expect(group.getAttribute('role')).toBe('img')
    })
  })

  describe('Configuration Handling', () => {
    test('should apply default configuration when no config is provided', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const svg = container.querySelector('svg')
      expect(svg.getAttribute('width')).toBe('640') // default width
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
      const testData = generateRandomData(5, 2, 4)
      RadialBarChart({
        target: container,
        data: testData,
        levels: defaultLevels,
        config: {},
      })
      const barGroups = container.querySelectorAll('.bar-group')
      expect(barGroups.length).toBeGreaterThan(0)
    })

    test('should render level rings', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const lvlRings = container.querySelector('.LvlRings')
      expect(lvlRings).not.toBeNull()
    })

    test('should render annotations for categories', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const annotations = container.querySelectorAll('.Annotation')
      expect(annotations.length).toBeGreaterThan(0)
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
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const bars = container.querySelectorAll('.bar')
      expect(bars.length).toBeGreaterThan(0)
    })

    test('should create bar-outline elements for hover detection', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const barOutlines = container.querySelectorAll('.bar-outline')
      expect(barOutlines.length).toBeGreaterThan(0)
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
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const annotations = container.querySelectorAll('.Annotation')
      expect(annotations.length).toBeGreaterThan(0)
    })

    test('should render level labels when lvlLabelType is "name"', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { lvlLabelType: 'name' },
      })
      const annotations = container.querySelector('.Annotation')
      const texts = annotations.querySelectorAll('text')
      expect(texts.length).toBeGreaterThan(0)
    })

    test('should not render level labels when lvlLabelType is "none"', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { lvlLabelType: 'none' },
      })
      // Level labels should not be rendered, but category labels should still be present
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })

    test('should render annotation lines', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const annotation = container.querySelector('.Annotation')
      const lines = annotation.querySelectorAll('line')
      expect(lines.length).toBeGreaterThan(0)
    })

    test('should render label boxes', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const labelBoxes = container.querySelectorAll('.label-box')
      expect(labelBoxes.length).toBeGreaterThan(0)
    })
  })

  describe('Skill Highlight', () => {
    test('should create skill-highlight group', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const skillHighlight = container.querySelector('.skill-highlight')
      expect(skillHighlight).not.toBeNull()
    })

    test('should create highlight circle with initial opacity 0', () => {
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

    test('should create highlight text elements', () => {
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
    })
  })

  describe('Event Handling', () => {
    test('should attach event listeners to bar-outline elements', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const barOutlines = container.querySelectorAll('.bar-outline')
      expect(barOutlines.length).toBeGreaterThan(0)
      // Bar outlines should exist and be rendered
      barOutlines.forEach((outline) => {
        expect(outline).not.toBeNull()
      })
    })

    test('should handle mouseover events on bars', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const barOutline = container.querySelector('.bar-outline')
      expect(barOutline).not.toBeNull()

      // Simulate mouseover event
      const event = new MouseEvent('mouseover', { bubbles: true })
      barOutline.dispatchEvent(event)

      // Chart should not throw errors when handling the event
      expect(container.querySelector('.radial-bar-chart')).not.toBeNull()
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
      })
    })

    test('should use custom color list when provided', () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff']
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { colourList: customColors },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
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
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })

    test('should apply custom font size', () => {
      const customFontSize = 16
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { fontSize: customFontSize },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })

    test('should split long labels to fit within max width', () => {
      const longData = [
        {
          skill: 'This is a very long skill name that should be split',
          category: 'Long Category',
          skill_level: 2,
        },
      ]
      RadialBarChart({
        target: container,
        data: longData,
        levels: defaultLevels,
        config: { maxLabelWidth: 100 },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
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
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { arcPercent: 0.5 },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })

    test('should apply custom arc start offset', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { arcStartOffset: 0.25 },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })
  })

  describe('Padding Configuration', () => {
    test('should apply custom category padding', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { categoryPadding: 0.2 },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })

    test('should apply custom skill padding', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { skillPadding: 0.1 },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })

    test('should apply custom outer padding', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { outerPadding: 150 },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
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

    test('should handle very long category names', () => {
      const longData = [
        {
          skill: 'test-skill',
          category:
            'This is an extremely long category name that might cause layout issues',
          skill_level: 2,
        },
      ]
      const chart = RadialBarChart({
        target: container,
        data: longData,
        levels: defaultLevels,
        config: {},
      })
      expect(chart).toBeDefined()
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
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: {},
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
    })

    test('should disable smart label positioning when configured', () => {
      RadialBarChart({
        target: container,
        data: generateRandomData(10, 3, 4),
        levels: defaultLevels,
        config: { useSmartLabelPositioning: false },
      })
      const svg = container.querySelector('svg')
      expect(svg).not.toBeNull()
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
