const h = require('hyperscript')
const blocksToHyperScript = require('@sanity/block-content-to-hyperscript')

module.exports = function CalloutModule(props) {
  if (!props.node.content) {
    return null
  }

  return [
    h('style', `
      .callout {
        padding: var(--space-medium) var(--space-large);
        border-top: solid 1px var(--color-neutral-100);
        border-right: solid 1px var(--color-neutral-100);
        border-bottom: solid 1px var(--color-neutral-100);
        border-left: solid 1px var(--color-teal-400);
        border-radius: 4px;
        border-left-width: 4px;
      }
      .callout--success {
        border-left-color: var(--color-green-400);
      }
      .callout--warning {
        border-left-color: var(--color-maize-400);
      }
      .callout--error {
        border-left-color: var(--color-pink-400);
      }
    `),
    h(`div`, { className: `callout callout--${props.node.variant}` },
      blocksToHyperScript({ blocks: props.node.content })
    )
  ]
}