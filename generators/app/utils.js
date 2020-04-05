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

module.exports = { getCurrentYear, kebabCase, capitalizeFirstCase }