'use strict'

// Require dependencies
const Generator = require('yeoman-generator')
const _ = require('lodash')

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
    this.licenseYear = new Date().getFullYear()
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

    const appnameKebabCase = _.kebabCase(this.appname) // from `app name` to `app-name`

    // We defined a list of prompts, each prompt has a type, a name and a message.
    // If no type was specified, it will default to ‘input' which is for standard text entry
    const prompts = [
      {
        type: 'input',
        name: `appname`,
        message: `What is your app's name?`,
        default: appnameKebabCase, // Default to current folder name
      },
      {
        type: 'input',
        name: `description`,
        message: `Insert a description`,
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
        name: 'githubUsername',
        message: `What's your GitHub username?`,
      },
      // {
      //   type: 'list',
      //   name: 'license',
      //   message: `What license should be used?`,
      //   choices: ['UNLICENSED', 'MIT'],
      //   default: 'MIT',
      // },
    ]

    // TODO:
    // - keywords

    return this.prompt(prompts).then(answers => {
      this.answers = answers
      this.answers.appname = this.appname
      this.answers.appnameKebabCase = appnameKebabCase
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
    this.log('this.answers:', JSON.stringify(this.answers, null, 2))

    const {
      appnameKebabCase,
      description,
      privateRepository,
      license,
      githubUsername,
    } = this.answers
    const appname = this.appname

    // package.json
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {
      appnameKebabCase,
      description,
      privateRepository,
      license,
    })

    // LICENSE
    this.fs.copyTpl(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'), { licenseYear: this.licenseYear })

    // README.md and assets
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), {
      appname,
      appnameKebabCase,
      description,
    })
    this.fs.copyTpl(this.templatePath('assets/_logo.png'), this.destinationPath('assets/logo.png'))

    // git
    this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'))

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
  }

  ////////////////////////////////////////
  // (8) end - Called last, cleanup, say good bye, etc
  ////////////////////////////////////////
  end() {
    this.log('\n(8) end...')
    this.log(`Application ${this.appname} generated successfully. Bye :)`)
  }
}

module.exports = MyGenerator
