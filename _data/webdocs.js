require('dotenv').config()

const blocksToHtml = require('@sanity/block-content-to-html')
const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'ods34681', // https://www.sanity.io/manage/personal/project/ods34681
  dataset: 'production',
  apiVersion: '2021-11-11', // https://www.sanity.io/docs/js-client#specifying-api-version
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})

async function fetchWebDocuments() {
  const query = '*[_type == "webdoc"]{ title, description, body, website->{ name } }'
  const result = await client.fetch(query)

  const webdocs = result.map(doc => {
    return {
      ...doc,
      body: bodyToHtml(doc.body)
    }
  })

  return webdocs
}

/**
 * https://github.com/sanity-io/block-content-to-html#customizing-default-serializer-for-block-type
 */
function bodyToHtml(body) {
  if (!body) {
    return `<p>Body content for this Web Document is yet to be written and or published.</p>`
  }

  return blocksToHtml({
    blocks: body
  })
}

module.exports = async function() {
  const webdocs = fetchWebDocuments()

  console.log('webdocs.11tydata.js', webdocs)

  return webdocs
};