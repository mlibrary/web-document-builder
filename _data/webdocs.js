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
    title, description, body, slug, website->{ name, codename, landing_web_document->, main_navigation[]-> },
    "local_navigation": *[_type == "local_navigation" && references(^._id)]{ local_navigation_landing->, local_navigation_links[]-> }
  }`
  const allWebDocuments = await client.fetch(query)
  // https://app.netlify.com/sites/umich-lib-design-system/settings/deploys#environment
  const theseWebDocuments = allWebDocuments.filter(doc => doc.website.codename === process.env.WEB_DOCUMENT_WEBSITE_CODENAME)

  return theseWebDocuments.map(webDocument => {
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