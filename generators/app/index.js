'use strict'

// Require dependencies
const Generator = require('yeoman-generator')
const _ = require('lodash')

const { getCurrentYear, kebabCase, capitalizeFirstCase, formatKeywords } = require('./utils')
const { dependencies, devDependencies } = require('./constants')

// All that this code is doing is creating this generator object and exporting it out,
// Yeoman will actually retrieve the exported object and run it.
// The way it runs, is by first calling the constructor method to set the object up and then
// it will go through all the methods you create on this object (in the order you created them)
// and run them one at a time
const MyGenerator = class extends Generator {
  ////////////////////////////////////////
  // (0) constructor
  ////////////////////////////////////////
  constructor(args, opts) {
    super(args, opts)
    this.log('\n(0) constructor...')
    // this.log(`args: ${args}`)
    // this.log(`opts: ${JSON.stringify(opts, null, 2)}`)
  }

  ////////////////////////////////////////
  // (1) initializing - Your initialization methods (checking current project state, getting configs, etc)
  ////////////////////////////////////////
  initializing() {
    this.log('\n(1) initializing...')
    // this.log('this:', JSON.stringify(this, null, 2))
    this.currentYear = getCurrentYear()
  }

  ////////////////////////////////////////
  // (2) prompting - Where you prompt users for options (where you’d call this.prompt())
  ////////////////////////////////////////
  // Ask for user input
  async prompting() {
    this.log('\n(2) prompting...')
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
        message: `What is your app's name? Use kebab case format`,
        default: kebabCase(this.appname), // Default to current folder name
        filter: kebabCase, // Transform input to kebab case
        validate: (str) => str.length > 0,
      },
      {
        type: 'input',
        name: `appDescription`,
        message: `Insert a description`,
      },
      {
        name: 'keywords',
        message: 'Throw here some keywords of your project (comma separated)',
      },
      {
        type: 'confirm',
        name: 'privateRepository',
        message: `Would you like to create a private repository?`,
        default: true,
      },
      {
        type: 'confirm',
        name: 'license',
        message: `Do you want a MIT license?`,
        default: true,
      },
      {
        type: 'input',
        name: `githubUsername`,
        message: `Insert GitHub username`,
        store: true,
      },
      {
        type: 'input',
        name: `githubEmail`,
        message: `Insert GitHub email`,
        store: true,
      },
      {
        type: 'input',
        name: `firstLastName`,
        message: `Insert first name and last name`,
        store: true,
      },
      // {
      //   type: 'list',
      //   name: 'dependencies',
      //   message: `What dependencies you want install?`,
      //   choices: DEPENDENCIES,
      //   default: ['lodash', 'd3'],
      // },
    ]

    return this.prompt(prompts).then(answers => {
      this.answers = answers
      this.answers.appName = this.appname
      this.answers.appNameCapitalizeFirst = capitalizeFirstCase(this.appname)
      this.answers.keywords = formatKeywords(answers.keywords)
      this.answers.repositoryUrl = `https://${this.answers.githubUsername}@github.com/${this.answers.githubUsername}/${this.answers.appNameKebabCase}.git`
    })
  }

  ////////////////////////////////////////
  // (3) configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
  ////////////////////////////////////////
  configuring() {
    this.log('\n(3) configuring...')
  }

  ////////////////////////////////////////
  // (5) writing - Where you write the generator specific files (routes, controllers, etc)
  ////////////////////////////////////////
  writing() {
    this.log('\n(4) writing...')
    this.log(`this.destinationRoot(): ${this.destinationRoot()}`)
    this.log(`this.appname: ${this.appname}`)
    // this.log('this:', JSON.stringify(this, null, 2))
    this.log('this.answers:', JSON.stringify(this.answers, null, 2))

    const {
      appName,
      appNameKebabCase,
      appNameCapitalizeFirst,
      appDescription,
      privateRepository,
      githubUsername,
      firstLastName,
      license,
      keywords,
    } = this.answers

    // package.json
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
      appNameKebabCase,
      appDescription,
      privateRepository,
      githubUsername,
      firstLastName,
      githubUsername,
      license,
      keywords,
    })

    // LICENSE
    if (license) {
      this.fs.copyTpl(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'), {
        currentYear: this.currentYear,
        firstLastName,
      })
    }

    // README.md and assets
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), {
      appName,
      appNameKebabCase,
      appNameCapitalizeFirst,
      appDescription,
      githubUsername,
    })
    this.fs.copyTpl(this.templatePath('assets/_logo.png'), this.destinationPath('assets/logo.png'))

    // git
    this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'))
    
    // prettier
    this.fs.copyTpl(this.templatePath('_prettierrc'), this.destinationPath('.prettierrc'))
    this.fs.copyTpl(this.templatePath('_prettierignore'), this.destinationPath('.prettierignore'))

    // lib functions
    this.fs.copyTpl(this.templatePath('src/_index.ts'), this.destinationPath('src/index.ts'))

    this.fs.copyTpl(
      this.templatePath('src/lib/_hello.ts'),
      this.destinationPath('src/lib/hello.ts')
    )
  }

  ////////////////////////////////////////
  // (4) default - If the method name doesn’t match a priority, it will be pushed to this group.
  ////////////////////////////////////////
  default() {
    this.log('\n(5) default...')
  }

  ////////////////////////////////////////
  // (6) conflicts - Where conflicts are handled (used internally)
  ////////////////////////////////////////
  conflicts() {
    this.log('\n(6) conflicts...')
  }

  ////////////////////////////////////////
  // (7) install - Where installations are run (npm, bower)
  ////////////////////////////////////////
  install() {
    this.log('\n(7) install...')
    
    this.log('I will install dependencies:', dependencies)
    this.log('I will install devDependencies:', devDependencies)
    this.yarnInstall(dependencies, { dev: false })
    this.yarnInstall(devDependencies, { dev: true })
    
  }

  ////////////////////////////////////////
  // (8) end - Called last, cleanup, say good bye, etc
  ////////////////////////////////////////
  end() {
    this.log('\n(8) end...')

    const { githubEmail, repositoryUrl } = this.answers

    // Git initialization
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('git', ['config', 'user.email', githubEmail])
    this.spawnCommandSync('git', ['add', '--all'])
    this.spawnCommandSync('git', ['commit', '-m', '"🚀 First commit"'])
    this.spawnCommandSync('git', ['remote', 'add', 'origin', repositoryUrl])
    this.spawnCommandSync('git', ['push', '-u', 'origin', 'master'])

    this.log(`Application ${this.appname} generated successfully. Bye :)`)
  }
}

module.exports = MyGenerator
