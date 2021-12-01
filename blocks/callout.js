const h = require('hyperscript')
const blocksToHyperScript = require('@sanity/block-content-to-hyperscript')

module.exports = function CalloutModule(props) {
  const blocks = props.node.callout_content

  if (!blocks) {
    return null
  }

  return h('m-callout', { attrs: { subtle: "" } }, blocksToHyperScript({ blocks: blocks }))
}