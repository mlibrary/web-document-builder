const h = require('hyperscript')
const blocksToHyperScript = require('@sanity/block-content-to-hyperscript')

module.exports = function DontAndDos(props) {
  return h('table.m-table', [
    h('thead',
      h('tr', [
        h('th', "Don't"),
        h('th', "Do")
      ])
    ),
    h('tbody',
      h('tr', [
        h('td', blocksToHyperScript({ blocks: props.node.dont_and_do_dont })),
        h('td', blocksToHyperScript({ blocks: props.node.dont_and_do_do }))
      ])
    )
  ])
}