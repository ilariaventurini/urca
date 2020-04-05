const _ = require('lodash')

function getCurrentYear() {
  return new Date().getFullYear()
}

// from `app name` to `app-name`
function kebabCase(name) {
  return _.kebabCase(name) 
}

// from `app name` to `App name`
function capitalizeFirstCase(name) {
  return name[0].toUpperCase() + name.slice(1)
}

// remove white spaces and split by ,
// from `lib1, lib 2` to `['lib1', 'lib2']`
function formatKeywords(keywords) {
  if (keywords) {
    return keywords.replace(/\s/g, '').split(',')
  } else {
    return []
  }
}

module.exports = { getCurrentYear, kebabCase, capitalizeFirstCase, formatKeywords }