import { RadialBarChart } from '../src/js/dataviz/radial-plot'
import '../src/scss/dataviz.scss'

const generateRandomData = (n, categoryCount, maxLvl) =>
  Array.from({ length: n }, (_, i) => ({
    skill: `skill-${i}`,
    category: `category-${Math.floor(Math.random() * categoryCount)}`,
    skill_level: Math.floor(Math.random() * maxLvl),
  }))
    .concat([
      { skill: 'Zero Skill', category: 'category-0', skill_level: 0 },
      { skill: 'Max Skill', category: 'category-0', skill_level: maxLvl - 1 },
    ])
    .concat([
      {
        skill: 'long name skill using max char count of about 20 etc',
        category: 'Really long category name that is about 30 chars',
        skill_level: maxLvl - 1,
      },
    ])

export default {
  title: 'Dataviz/radial-plot',
  tags: ['autodocs'],
  render: ({ data, levels, ...args }) => {
    const container = document.createElement('div')
    // Add styles here that would normally be in your app
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.minHeight = '500px'
    container.style.border = '1px solid red'
    RadialBarChart({
      target: container,
      data,
      config: args,
      levels,
    })
    return container
  },
  argTypes: {
    // data: {

    // },
    // levels: {

    // },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    categoryPadding: {
      control: 'number',
    },
    skillPadding: {
      control: 'number',
    },
    innerRadius: {
      control: 'number',
    },
    outerPadding: {
      control: 'number',
    },
    arcPercent: {
      control: 'number',
    },
    arcStartOffset: {
      control: 'number',
    },
    annotationPadding: {
      control: 'number',
    },
    lineThickness: {
      control: 'number',
    },
    labelTextColor: {
      control: 'color',
    },
    lvlTextColor: {
      control: 'color',
    },
    lvlArcColor: {
      control: 'color',
    },
    // colourList: readonly string[];
    lvlLabelType: {
      control: { type: 'select' },
      options: ['none', 'name', 'level'],
    },
  },
}

const defaultLevels = [
  // { level: 0, name: 'None' },
  { level: 1, name: 'Beginner' },
  { level: 2, name: 'Intermediate' },
  { level: 3, name: 'Advanced' },
  { level: 4, name: 'Advanced Plus' },
  { level: 5, name: 'Advanced Plus' },
]

export const Primary = {
  args: {
    data: generateRandomData(50, 10, 4),
    levels: defaultLevels,
  },
}

export const Option1 = {
  args: {
    data: generateRandomData(50, 10, 4),
    levels: defaultLevels,
    arcPercent: 0.99,
    arcStartOffset: 0.01,
    categoryPadding: 0.1,
    skillPadding: 0.01,
  },
}

export const Option2 = {
  args: {
    data: generateRandomData(10, 5, 4),
    levels: defaultLevels,
    height: 474,
    arcPercent: 0.98,
    arcStartOffset: 0.1,
    lvlLabelType: 'none',
  },
}

export const Option3 = {
  args: {
    data: generateRandomData(50, 10, 4),
    levels: defaultLevels,
    arcPercent: 0.8,
    arcStartOffset: 0.1,
    categoryPadding: 0.1,
    skillPadding: 0.01,
    annotationPadding: 19,
  },
}

export const TestFontSize = {
  args: {
    data: generateRandomData(10, 4, 4),
    levels: defaultLevels,
    height: 474,
    arcPercent: 0.98,
    arcStartOffset: 0,
    lvlLabelType: 'none',
    fontSize: 24,
  },
}
