const h = require('hyperscript')
const blockTools = require('@sanity/block-tools')
const blocksToHyperScript = require('@sanity/block-content-to-hyperscript')

module.exports = function CodePreview(props) {
  const html = props.node.code_preview_code.code

  // blocksToHyperScript({ blocks: blockTools.htmlToBlocks(html) })

  return [
    h('div.code-preview', 'This is where the code will be rendered.'),
    h('pre.code-source', h('code', html))
  ]
}