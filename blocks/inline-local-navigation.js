const h = require('hyperscript')
const blocksToHyperScript = require('@sanity/block-content-to-hyperscript')

module.exports = function InlineLocalNavigation(props) {
  console.log('inline_local_navigation', props)

  return `<p>Inline local nav placeholder</p>`
}