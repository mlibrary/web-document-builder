const sanityToHtml = require('@sanity/block-content-to-html')
const serializer = require('./block-serializer')

/**
 * https://www.sanity.io/docs/block-type
 */
module.exports = function toHtml(blockContent) {
  if (!blockContent) {
    return `<m-callout variant="warning" icon><p>This web document doesn't have any body content yet. Contact the Design System Team to contribute.</p></m-callout>`
  }

  return sanityToHtml({
    blocks: blockContent,
    serializers: serializer
  })
}