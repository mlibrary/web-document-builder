# Web Document Builder

Builds Web Documents for one to many websites based on content from the Web Document Manager.

## Configure what website to build

The `codename` is entered in the Web Document Manager for a Website. To build Web Documents it is **required** to set a the following environment variable.

```env
WEB_DOCUMENT_WEBSITE_CODENAME
```

We use Netlify for production build and deploys, although this could be done anywhere.