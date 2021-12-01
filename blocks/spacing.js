const tokens = require('../design-tokens') // TODO: once this file is on production for @umich-lib/web, get it from there insteaad of a locally copied file.
const h = require('hyperscript')

const spacings = tokens.props
  .filter(token => token.category === 'space')
  .sort((a, b) => {
    const levelA = parseInt(a.meta.level)
    const levelB = parseInt(b.meta.level)

    if (levelA < levelB) {
      return -1
    }

    return 1
  })

module.exports = function Spacing(props) {
  return h('table.m-table', [
    h('thead',
      h('tr', [
        h('th', "Preview"),
        h('th', "CSS Custom Property"),
        h('th', "Value")
      ])
    ),
    h('tbody',
      spacings.map(space => h('tr', [
        h('td', h('div', { style: `height: ${space.value}; width: ${space.value}; background: var(--color-neutral-300);` })),
        h('td', h('code', `var(--${space.name})`)),
        h('td', space.value),
      ]))
    )
  ])
}