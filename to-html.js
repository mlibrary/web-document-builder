const sanityToHtml = require('@sanity/block-content-to-html')
const serializer = require('./module-serializer')
const h = require('hyperscript')

/**
 * https://www.sanity.io/docs/block-type
 */
module.exports = function toHtml(blockContent) {
  if (!blockContent) {
    return `<p>Add body modules.</p>`
  }

  return sanityToHtml({
    blocks: blockContent,
    serializers: serializer
  })
}