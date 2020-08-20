const dependecies = [
  { name: 'lodash', isDev: false, types: '@types/lodash', isDefault: true, isMandatory: false },
  { name: 'd3', isDev: false, types: '@types/d3', isDefault: true, isMandatory: false },
  {
    name: 'tachyons',
    isDev: false,
    types: '',
    isDefault: true,
    isMandatory: false,
  },
  {
    name: 'tachyons-extra',
    isDev: false,
    types: '',
    isDefault: true,
    isMandatory: false,
  },
  {
    name: 'eslint',
    isDev: true,
    types: '@typescript-eslint/parser', // The parser that will allow ESLint to lint TypeScript code
    isDefault: false,
    isMandatory: true,
  },
  {
    name: 'prettier',
    isDev: true,
    types: '',
    isDefault: false,
    isMandatory: true,
  },
  {
    name: 'eslint-config-prettier', // Disables ESLint rules that might conflict with prettier
    isDev: true,
    types: '@typescript-eslint/eslint-plugin', // A plugin that contains a bunch of ESLint rules that are TypeScript specific
    isDefault: false,
    isMandatory: true,
  },
  {
    name: 'parcel', // Bundler
    isDev: false,
    types: '',
    isDefault: true,
    isMandatory: true,
  },
]

///////////////////////////////

const dependenciesToAskUser = dependecies.filter((d) => !d.isMandatory)
const mandatoryDependencies = dependecies.filter((d) => d.isMandatory)

///////////////////////////////

// not dev dependencies names choosen by user
const dependenciesToInstall = (choosenDependenciesNamesByUser, useTypescript) =>
  dependenciesToAskUser
    .filter((d) => choosenDependenciesNamesByUser.includes(d.name) && !d.isDev)
    .map((d) => d.name)

// dev dependencies names choosen by user
const devDependenciesToInstall = (choosenDependenciesNamesByUser) =>
  dependenciesToAskUser
    .filter((d) => choosenDependenciesNamesByUser.includes(d.name) && d.isDev)
    .map((d) => d.name)

// typescript types related to user choosen dependencies
const typesDependencies = (choosenDependenciesNamesByUser) =>
  dependenciesToAskUser
    .filter((d) => choosenDependenciesNamesByUser.includes(d.name) && d.types !== '')
    .map((d) => d.types)

// mandatory dependencies (the ones useful for setup and config)
const dependenciesMandatory = mandatoryDependencies.map((d) => d.name)

// typescript types related to mandatory dependencies
const dependenciesMandatoryTypes = mandatoryDependencies.filter((d) => d.types).map((d) => d.types)

// dev dependencies to install (includes typescript if necessary and mandatory dependencies)
const devDependenciesWithTypesToInstall = (choosenDependenciesNamesByUser, useTypescript) => [
  ...devDependenciesToInstall(choosenDependenciesNamesByUser),
  ...dependenciesMandatory,
  ...(useTypescript
    ? [
        'typescript',
        ...typesDependencies(choosenDependenciesNamesByUser),
        ...dependenciesMandatoryTypes,
      ]
    : []),
]

module.exports = {
  dependenciesToAskUser,
  dependenciesToInstall,
  devDependenciesWithTypesToInstall,
}
