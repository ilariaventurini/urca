'use strict'

// Require dependencies
const Generator = require('yeoman-generator')
const _ = require('lodash')
const { getCurrentYear, kebabCase, capitalizeFirstCase, formatKeywords } = require('./utils')
const {
  dependenciesToAskUser,
  dependenciesToInstall,
  devDependenciesWithTypesToInstall,
} = require('./dependencies-utils')

// All that this code is doing is creating this generator object and exporting it out,
// Yeoman will actually retrieve the exported object and run it.
// The way it runs, is by first calling the constructor method to set the object up and then
// it will go through all the methods you create on this object (in the order you created them)
// and run them one at a time
const MyGenerator = class extends Generator {
  ////////////////////////////////////////
  // (0) Constructor
  ////////////////////////////////////////
  constructor(args, opts) {
    super(args, opts)
    // this.log('\n(0) constructor...')
  }

  ////////////////////////////////////////
  // (1) Initializing
  // Your initialization methods (checking current project state, getting configs, etc)
  ////////////////////////////////////////
  initializing() {
    // this.log('\n(1) initializing...')
    this.currentYear = getCurrentYear()
  }

  ////////////////////////////////////////
  // (2) Prompting
  // Where you prompt users for options (where you’d call this.prompt())
  ////////////////////////////////////////
  // Ask for user input
  async prompting() {
    // this.log('\n(2) prompting...')

    this.log(
      `\nNote: the project stuff you are creating, will be created in the current folder (${process.cwd()}).\nAre you sure you want to continue? If no press ⌃C.`
    )
    this.log(`Note: Remember to create a GitHub repository with the same name of your app.\n\n`)

    // Yeoman tries to run your methods in the order that they are defined, but if you run any async code,
    // the function will exit before the actual work gets completed and Yeoman will start the next function early.
    // To get around this, you can call the async method, which will return a callback and then Yeoman will wait
    // to go on to the next function until that callback gets executed, which you can see it does at the end,
    // after prompting the user

    // We defined a list of prompts, each prompt has a type, a name and a message.
    // If no type was specified, it will default to ‘input' which is for standard text entry
    const prompts = [
      {
        type: 'input',
        name: `appNameKebabCase`,
        message: `App name in kebab-case-format`,
        default: kebabCase(this.appname), // Default to current folder name
        filter: kebabCase, // Transform input to kebab case
        validate: (str) => str.length > 0,
      },
      {
        type: 'input',
        name: `appDescription`,
        message: `App description`,
      },
      {
        name: 'keywords',
        message: `App keywords (comma separated)`,
      },
      {
        type: 'confirm',
        name: 'privateRepository',
        message: `Private repository?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'useTypescript',
        message: `Do you want use TypeScript?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'addReactToDemoPage',
        message: `Do you want to add React to demo page?`,
        default: true,
      },
      {
        type: 'input',
        name: `githubUsername`,
        message: `GitHub username`,
        store: true,
      },
      {
        type: 'input',
        name: `githubEmail`,
        message: `GitHub email`,
        store: true,
      },
      {
        type: 'input',
        name: `firstLastName`,
        message: `First name and last name`,
        store: true,
      },
      {
        type: 'checkbox',
        name: 'dependencies',
        message: `Which dependencies you want install?`,
        choices: dependenciesToAskUser.map((d) => d.name),
        default: dependenciesToAskUser.filter((d) => d.isDefault).map((d) => d.name),
      },
    ]

    return this.prompt(prompts).then((answers) => {
      this.answers = answers
      this.answers.appName = this.appname
      this.answers.appNameCapitalizeFirst = capitalizeFirstCase(this.appname)
      this.answers.keywords = formatKeywords(answers.keywords)
      this.answers.repositoryUrl = `https://${this.answers.githubUsername}@github.com/${this.answers.githubUsername}/${this.answers.appNameKebabCase}.git`
    })
  }

  ////////////////////////////////////////
  // (3) Configuring
  // Saving configurations and configure the project(creating .editorconfig files and other metadata files)
  ////////////////////////////////////////
  configuring() {
    // this.log('\n(3) configuring...')
  }

  ////////////////////////////////////////
  // (5) Writing
  // Where you write the generator specific files (routes, controllers, etc)
  ////////////////////////////////////////
  writing() {
    // this.log('\n(4) writing...')
    const {
      appName,
      appNameKebabCase,
      appNameCapitalizeFirst,
      appDescription,
      privateRepository,
      githubUsername,
      githubEmail,
      firstLastName,
      license,
      keywords,
      useTypescript,
      addReactToDemoPage,
    } = this.answers

    // package.json
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
      appNameKebabCase,
      appDescription,
      privateRepository,
      githubUsername,
      firstLastName,
      githubEmail,
      license,
      keywords,
    })

    // TypeScript
    if (useTypescript) {
      this.fs.copyTpl(this.templatePath('_tsconfig.json'), this.destinationPath('tsconfig.json'))
    }

    // LICENSE
    this.fs.copyTpl(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'), {
      currentYear: this.currentYear,
      firstLastName,
    })

    // README.md
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), {
      appName,
      appNameKebabCase,
      appNameCapitalizeFirst,
      appDescription,
      githubUsername,
      firstLastName,
    })

    // git
    this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'))

    // eslint
    // I prefer using a JavaScript file (.eslintrc.js) for the .eslintrc file
    // instead of a JSON file (.eslintrc) as it supports comments that can be used to better describe rules.
    this.fs.copyTpl(this.templatePath('_eslintrc.js'), this.destinationPath('.eslintrc.js'), {
      useTypescript,
    })

    // prettier
    // I prefer using a JavaScript file (.prettierrc.js) for the .prettierrc file
    // instead of a JSON file (.prettierrc) as it supports comments that can be used to better describe rules.
    this.fs.copyTpl(this.templatePath('_prettierrc.js'), this.destinationPath('.prettierrc.js'))
    this.fs.copyTpl(this.templatePath('_prettierignore'), this.destinationPath('.prettierignore'))

    // lib functions
    this.fs.copyTpl(
      this.templatePath(`src/_index.ts`),
      this.destinationPath(`src/index.${useTypescript ? 'ts' : 'js'}`)
    )
    this.fs.copyTpl(
      this.templatePath(`src/lib/_hello.ts`),
      this.destinationPath(`src/lib/hello.${useTypescript ? 'ts' : 'js'}`),
      { useTypescript }
    )

    // demo
    // .html
    if (addReactToDemoPage) {
      this.fs.copyTpl(
        this.templatePath('demo/_index_html_react.ejs'),
        this.destinationPath('demo/index.html'),
        { useTypescript, appName }
      )
    } else {
      this.fs.copyTpl(
        this.templatePath('demo/_index_html.ejs'),
        this.destinationPath('demo/index.html'),
        { useTypescript, appName }
      )
    }
    // .css
    this.fs.copyTpl(this.templatePath('demo/_style.css'), this.destinationPath('demo/style.css'))
    // .tsx | ts
    if (addReactToDemoPage) {
      this.fs.copyTpl(
        this.templatePath('demo/_index.tsx'),
        this.destinationPath(`demo/index.${useTypescript ? 'tsx' : 'jsx'}`),
        { useTypescript }
      )
    } else {
      this.fs.copyTpl(
        this.templatePath('demo/_index.ts'),
        this.destinationPath(`demo/index.${useTypescript ? 'ts' : 'js'}`),
        { useTypescript }
      )
    }
  }

  ////////////////////////////////////////
  // (4) Default
  // If the method name doesn’t match a priority, it will be pushed to this group.
  ////////////////////////////////////////
  default() {
    // this.log('\n(5) default...')
  }

  ////////////////////////////////////////
  // (6) Conflicts
  // Where conflicts are handled(used internally)
  ////////////////////////////////////////
  conflicts() {
    // this.log('\n(6) conflicts...')
  }

  ////////////////////////////////////////
  // (7) Install
  // Where installations are run (yarn)
  ////////////////////////////////////////
  install() {
    // this.log('\n(7) install...')

    const { useTypescript, dependencies } = this.answers

    const dependenciesNamesToInstall = dependenciesToInstall(dependencies, useTypescript)
    const devDependenciesNamesToInstall = devDependenciesWithTypesToInstall(
      dependencies,
      useTypescript
    )

    this.yarnInstall(dependenciesNamesToInstall, { dev: false })
    this.yarnInstall(devDependenciesNamesToInstall, { dev: true })
  }

  ////////////////////////////////////////
  // (8) End
  // Called last, cleanup, say goodbye, etc
  ////////////////////////////////////////
  end() {
    // this.log('\n(8) end...')

    const { githubEmail, repositoryUrl, appNameKebabCase } = this.answers

    // Git initialization
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('git', ['config', 'user.email', githubEmail])
    this.spawnCommandSync('git', ['add', '--all'])
    this.spawnCommandSync('git', ['commit', '-m', '🚀 First commit'])
    this.spawnCommandSync('git', ['remote', 'add', 'origin', repositoryUrl])
    this.spawnCommandSync('git', ['push', '-u', 'origin', 'master'])

    this.log(
      `\nNOTE: Create a GitHub repository named '${appNameKebabCase}', if you haven't already.`
    )
    this.log(`Bye :)`)
  }
}

module.exports = MyGenerator
