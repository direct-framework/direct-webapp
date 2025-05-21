import { renderRadialPlot } from 'skills-competencies-dataviz'
import 'skills-competencies-dataviz/styles.css'

const generateRandomData = (n, categoryCount) =>
  Array.from({ length: n }, (_, i) => ({
    skill: `skill-${i}`,
    category: `category-${Math.floor(Math.random() * categoryCount)}`,
    skill_level: Math.floor(Math.random() * 10),
  }))

export default {
  title: 'Dataviz/radial-plot',
  tags: ['autodocs'],
  render: ({ data, ...args }) => {
    const container = document.createElement('div')
    renderRadialPlot(container, data, args)
    return container
  },
  argTypes: {
    // data: {

    // };
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
    data: generateRandomData(10, 5),
  },
}
