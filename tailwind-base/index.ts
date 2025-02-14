import type {Config} from 'tailwindcss'

import colors from 'tailwindcss/colors.js'

import pluginContainerQueries from './plugins/container-queries.js'
import pluginDefault from './plugins/default.js'
import animations from './theme/animations.js'
import score from './theme/score.js'
import severity from './theme/severity.js'
import sizes from './theme/sizes.js'

const tailwindBase = {
  darkMode: ['variant', [
    '.dark &:not(:is(.light *))',
  ]],
  content: [
    './node_modules/eco-vue-js/dist/components/**/*.vue.js',
    './node_modules/eco-vue-js/dist/components/**/*.js',
  ],
  theme: {
    colors: {
      current: 'currentColor',
      default: '#ffffff',
      'default-dark': colors.zinc['900'], // '#101827',

      primary: {
        darkest: '#23222e',
        dark: '#5b4fc4', // '#4d42ad',
        default: '#9087e2',
        light: '#f4f3fc',
      },

      secondary: {
        default: '#ffffff',
      },

      black: {
        default: '#333333',
        light: '#4f4f4f',
      },

      gray: colors.gray,
      slate: colors.slate,

      negative: '#f35555',
      'negative-dark': '#cc3636',
      positive: '#77d460',
      'positive-dark': '#5bb245',
      warning: '#ffda56',
      'warning-dark': '#e6b919',
      info: '#82adff',
      'info-dark': '#407ae5',

      severity,
      score,

      transparent: 'transparent',
    },
    extend: {
      ...sizes,
      ...animations,
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1728px',
        '4xl': '1920px',
        '5xl': '2560px',

        'xs-not': {max: '479px'},
        'sm-not': {max: '639px'},
        'md-not': {max: '767px'},
        'lg-not': {max: '1023px'},
        'xl-not': {max: '1279px'},
        '2xl-not': {max: '1535px'},
        '3xl-not': {max: '1727px'},
        '4xl-not': {max: '1919px'},
        '5xl-not': {max: '2559px'},
      },
      scale: {
        120: '1.2',
        180: '1.8',
        190: '1.9',
        200: '2.0',
      },
      borderRadius: {
        '2.75xl': '1.375rem',
        '3.5xl': '1.75rem',
        '4xl': '2rem',
      },
      boxShadow: {
        md: '0px 0px 8px rgba(0, 0, 0, 0.15)',
      },
      dropShadow: {
        md: '0px 0px 8px rgba(0, 0, 0, 0.15)',
      },
      chunks: {
        110: '27.5rem',
        120: '30rem',
      },
      'chunk-span': {
        1: '1',
        2: '2',
        3: '3',
      },
      overflow: {
        overlay: 'overlay',
      },
    },
    fontFamily: {
      sans: ['MontSerrat', 'system-ui'],
      roboto: ['Roboto', 'system-ui'],
      mono: ['RobotoMono', 'system-ui'],
    },
  },
  plugins: [
    pluginDefault,
    pluginContainerQueries,
  ],
} satisfies Config

export default tailwindBase
