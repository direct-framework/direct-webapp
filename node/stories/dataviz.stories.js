import { RadialBarChart } from '../src/js/dataviz/radial-plot'
import '../src/scss/dataviz.scss'

const generateRandomData = (n, categoryCount, maxLvl) =>
  Array.from({ length: n }, (_, i) => ({
    skill: `skill-${i}`,
    category: `category-${Math.floor(Math.random() * categoryCount)}`,
    skill_level: Math.floor(Math.random() * maxLvl),
  }))

export default {
  title: 'Dataviz/radial-plot',
  tags: ['autodocs'],
  render: ({ data, levels, ...args }) => {
    const container = document.createElement('div')
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
  },
}

export const Primary = {
  args: {
    data: generateRandomData(50, 10, 4),
    levels: [
      { level: 0, name: 'None' },
      { level: 1, name: 'Beginner' },
      { level: 2, name: 'Intermediate' },
      { level: 3, name: 'Advanced' },
      { level: 4, name: 'Advanced Plus' },
      { level: 5, name: 'Advanced Plus' },
    ],
  },
}
