# Web Document Builder

Builds Web Documents for one to many websites based on content from the Web Document Manager.

## Configure what website to build

The `codename` is entered in the Web Document Manager for a Website. To build Web Documents it is **required** to set a the following environment variable.

```env
WEB_DOCUMENT_WEBSITE_CODENAME
```

We use Netlify for production build and deploys, although this could be done anywhere.

## What's going on here?

`_/data/webdocs.js` Where we connect to the Sanity client (Web Document Manager) and download Web Documents.

- https://umich-lib-webdocs.sanity.studio
- https://www.sanity.io/docs/js-client

`blocks/*` is where Body Content inserts are transformed from content into HTML using HyperScript for the Web Document.

- https://github.com/hyperhype/hyperscript

`templates/web-document.njk` This is the single template that renders every web document. It's not too long since much of the page is determined by `blocks`.

## Known oddities

Changing a block requires two refreshes by 11ty to see them in development. I don't know why. I save twice to see the change.