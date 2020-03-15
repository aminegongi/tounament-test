/*
  Do not copy/paste this file. It is used internally
  to manage end-to-end test suites.
*/

const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig

const localeSubpathVariations = {
    none: {},
    foreign: {
        fr: 'fr',
    },
    all: {
        en: 'en',
        fr: 'fr',
    },
    keySeparator: false

}

module.exports = new NextI18Next({
    detection: {
      order: ["querystring", "navigator"],
      lookupQuerystring: "lang"
    },
    defaultLanguage: 'en',
    otherLanguages: [ 'fr'],
    // debug: true,

    localeSubpaths: localeSubpathVariations[localeSubpaths],
    
})