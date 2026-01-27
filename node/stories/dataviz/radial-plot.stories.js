import { RadialBarChart } from '../../src/js/dataviz/radial-plot'
import { generateRandomData } from '../../src/js/dataviz/mock-data'
import { levels as defaultLevels } from '../../src/js/dataviz/defaults'
import '../../src/scss/dataviz.scss'

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
    fontSize: {
      control: 'number',
    },
    labelYSpacing: {
      control: 'number',
    },
    maxLabelWidth: {
      control: 'number',
    },
    useSmartLabelPositioning: {
      control: 'boolean',
    },
    plotYOffset: {
      control: 'number',
    },
  },
}

export const Primary = {
  args: {
    data: generateRandomData(50, 10, 4),
    levels: defaultLevels,
  },
}

export const StressTest = {
  args: {
    data: generateRandomData(80, 30, 4),
    levels: defaultLevels,
    arcPercent: 0.99,
    arcStartOffset: 0.01,
    categoryPadding: 0.1,
    skillPadding: 0.01,
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
    useSmartLabelPositioning: false,
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
    height: 600,
    arcPercent: 0.98,
    arcStartOffset: 0.01,
    lvlLabelType: 'none',
    innerRadius: 140,
    fontSize: 20,
    labelYSpacing: 1.2, // Sets the spacing of the category labels from each other as a multiple of the font size
  },
}
