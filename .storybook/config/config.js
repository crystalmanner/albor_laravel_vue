/* eslint-disable import/no-extraneous-dependencies */
import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { configure, addDecorator, addParameters } from '@storybook/vue'
import storybookTheme from './theme'
import './vuetify'
import filter from 'lodash/filter'

import '@mdi/font/css/materialdesignicons.css'

// Vuetify has a 12 point grid system. Built using flex-box, the grid is used to layout an application's content. It
// contains 5 types of media breakpoints that are used for targeting specific screen sizes and orientations.
const vuetifyViewports = {
  VuetifyLg: {
    name: 'Vuetify LG',
    styles: {
      width: '1904px'
    },
    type: 'desktop'
  },
  VuetifyXs: {
    name: 'Vuetify XS',
    styles: {
      width: '600px'
    },
    type: 'mobile'
  },
  VuetifySm: {
    name: 'Vuetify SM',
    styles: {
      width: '960px'
    },
    type: 'mobile'
  },
  VuetifyMd: {
    name: 'Vuetify MD',
    styles: {
      width: '1264px'
    },
    type: 'tablet'
  },
  VuetifyXl: {
    name: 'Vuetify XL',
    styles: {
      width: '4096px'
    },
    type: 'desktop'
  }
}

configureViewport({
  defaultViewport: 'VuetifyMd',
  viewports: {
    ...INITIAL_VIEWPORTS,
    ...vuetifyViewports
  }
})

addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
    theme: storybookTheme
  }
})

// Ensures every story is wrapped in a v-app tag. To enable the Storybook background addon to control the background
// color we need to add a hack to VApp, as it sets and controls the background color. We set the background-color on
// VApp to transparent.
addDecorator(() => ({
  template: '<v-app style="background-color: transparent;"><story/></v-app>',
  style: '.theme--light.application { background-color: transparent; }'
}))

const projectComponents = require.context('../../resources/js/components', true, /.stories.js$/)
const projectLayouts = require.context('../../resources/js/layouts', true, /.stories.js$/)
const busComponents = require.context('../../vendor/freshinup/fresh-bus-forms/resources/assets/js/components/ui', true, /.stories.js$/)

function loadStoriesFrom (components) {
  components.keys().forEach(filename => components(filename))
}
function loadStories () {
  require('../../resources/js/components/_Intro.stories')
  filter(projectComponents.keys(), value => value.indexOf('_Intro') === -1).forEach(filename => projectComponents(filename))
  loadStoriesFrom(busComponents)
  loadStoriesFrom(projectLayouts)
}

configure(loadStories, module)
