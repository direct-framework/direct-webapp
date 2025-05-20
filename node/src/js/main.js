/** Root of all javascript scripts to be compiled to static assets directory
 *
 * This file is the entry point for all JavaScript files in the project.
 * It imports all the necessary components and libraries required for the project.
 */

/* Dataviz dependencies */
import { renderRadialPlot } from 'skills-competencies-dataviz'

/**
 * Around | Multipurpose Bootstrap HTML Template
 * Copyright 2023 Createx Studio
 * Theme core scripts
 *
 * @author Createx Studio
 * @version 3.2.0
 */

// Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle'

// Smooth scroll
import 'smooth-scroll/dist/smooth-scroll.polyfills'

import './components/animation-on-scroll'
import './components/binded-content'
import './components/binded-label'
import './components/calendar'
import './components/carousel'
import './components/charts'
import './components/checkbox-toggle'
import './components/count-input'
import './components/countdown'
import './components/date-picker'
import './components/form-validation'
import './components/gallery'
import './components/input-autofocus'
import './components/input-formatter'
import './components/interactive-map'
import './components/masonry-grid'
import './components/parallax'
import './components/password-visibility-toggle'
import './components/popover'
import './components/price-switch'
import './components/range-slider'
import './components/scroll-top-button'
import './components/smooth-scroll'
import './components/sticky-navbar'
import './components/subscription-form'
import './components/toast'
import './components/tooltip'
import './components/video-button'

/** export functions accessible in the global scope
 *
 * Usage example:  main().renderRadialPlot(...args)
 *
 */
export default () => {
  return { renderRadialPlot }
}
