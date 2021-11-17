require('dotenv').config()

const sanityClient = require('@sanity/client')
const toHtml = require('../to-html')

const client = sanityClient({
  // https://www.sanity.io/manage/personal/project/ods34681
  projectId: 'ods34681',
  dataset: 'production',
  // https://www.sanity.io/docs/js-client#specifying-api-version
  apiVersion: '2021-11-11',
  // or leave blank for unauthenticated usage
  token: process.env.SANITY_TOKEN,
  // `false` if you want to ensure fresh data
  useCdn: false,
})

async function fetchWebDocuments() {
  const query = `*[_type == "webdoc"]{
    title, description, body, slug, website->{ name, landing_web_document->, main_navigation[]-> }
  }`
  const result = await client.fetch(query)

  return result.map(webDocument => {
    return {
      ...webDocument,
      bodyHtml: toHtml(webDocument.body)
    }
  })
}

module.exports = async function() {
  const webDocuments = await fetchWebDocuments()

  return webDocuments
};