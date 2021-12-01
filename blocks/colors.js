const tokens = require('../design-tokens') // TODO: once this file is on production for @umich-lib/web, get it from there insteaad of a locally copied file.
const h = require('hyperscript')

const paletteTokens = tokens.props.reduce((acc, prop) => {
  if (prop.meta && prop.meta.palette && !acc.includes(prop.meta.palette)) {
    acc.push(prop.meta.palette)
  }

  return acc
}, [])

const palettes = paletteTokens.map((palette) => {
  const shades = tokens.props.filter(prop => {
    if (prop.meta && prop.meta.palette === palette) {
      return true
    }

    return false
  })

  return shades
}, [])

module.exports = function Colors() {
 return h('div.color-palettes',
    palettes.map(palette => {
      return h('ol.color-palette',
        palette.map(color => h('li', {
          id: color.name,
          style: `background: var(--${color.name})`
        },
          [
            h('code', `var(--${color.name})`),
            h('code', `${color.value}`)
          ]
        ))
      )
    }
  ))
}