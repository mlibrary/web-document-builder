require('dotenv').config()

const h = require('hyperscript')
const blocksToHtml = require('@sanity/block-content-to-html')
const blocksToHyperScript = require('@sanity/block-content-to-hyperscript')
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'ods34681', // https://www.sanity.io/manage/personal/project/ods34681
  dataset: 'production',
  apiVersion: '2021-11-11', // https://www.sanity.io/docs/js-client#specifying-api-version
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})

function CalloutSerializer(props) {
  return h('div', { className: 'message' },
    [
      h('p', 'This is not an actual production callout, but an exampe that this is renderable and the Web Document Content Manager can configure some structured data and then render that to page with a serializer to our own HTML, such as this or even a web component if say the user wanted this to be dissmisable.'),
      blocksToHyperScript({ blocks: props.node.content })
    ]
  )
}

const serializers = {
  types: {
    callout: CalloutSerializer
  }
}

async function fetchWebDocuments() {
  const query = '*[_type == "webdoc"]{ title, description, body, website->{ name } }'
  const result = await client.fetch(query)

  function handleBodyToHtml(body) {
    if (!body) {
      return `<p>Hey! Go add some body content to this Web Document. You haven't added any content yet here.</p>`
    }

    return blocksToHtml({
      blocks: body,
      serializers: serializers
    })
  }

  const webdocs = result.map(doc => {
    return {
      ...doc,
      body: handleBodyToHtml(doc.body)
    }
  })

  return webdocs
}

module.exports = async function() {
  return fetchWebDocuments()
};