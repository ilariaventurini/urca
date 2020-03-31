'use strict'

// Require dependencies
const Generator = require('yeoman-generator')
const chalk = require('chalk')

// All that this code is doing is creating this generator object and exporting it out, 
// Yeoman will actually retrieve the exported object and run it.
// The way it runs, is by first calling the constructor method to set the object up and then 
// it will go through all the methods you create on this object (in the order you created them) 
// and run them one at a time
const MyGenerator = class extends Generator {
  ////////////////////////////////////////
  // (1) initializing - Your initialization methods (checking current project state, getting configs, etc)
  ////////////////////////////////////////
  constructor(args, opts) {
    super(args, opts)
    this.log('constructor...')
  }
  
  ////////////////////////////////////////
  // (2) prompting - Where you prompt users for options (where you’d call this.prompt())
  ////////////////////////////////////////
  // Ask for user input
  prompting() {
    this.log('prompting...')

    // Yeoman tries to run your methods in the order that they are defined, but if you run any async code, 
    // the function will exit before the actual work gets completed and Yeoman will start the next function early.
    // To get around this, you can call the async method, which will return a callback and then Yeoman will wait 
    // to go on to the next function until that callback gets executed, which you can see it does at the end, 
    // after prompting the user
    const done = this.async()

    // We defined a list of prompts, each prompt has a type, a name and a message. 
    // If no type was specified, it will default to ‘input' which is for standard text entry
    const prompts = [
      {
        name: `appName`,
        type: 'input',
        message: `What is your app's name?`
      },
      {
        name: `addDemoSection`,
        type: `confirm`,
        message: `Would you like to generate a demo section?`,
        default: true
      }
    ]
    
    // With the array of questions ready, we can pass it to the prompt method along with a callback function. 
    // The first parameter of the callback function is the list of answers received back from the user
    this.prompt(prompts, function (answers) {
      // Attach answers properties onto our main object
      this.appName = answers.appName
      this.addDemoSection = answers.addDemoSection

      // Call the done method to go on to the next function
      done()
    }.bind(this))
  }

  // (3) configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
  // (4) default - If the method name doesn’t match a priority, it will be pushed to this group.
  // (5) writing - Where you write the generator specific files (routes, controllers, etc)
  // (6) conflicts - Where conflicts are handled (used internally)
  // (7) install - Where installations are run (npm, bower)
  // (8) end - Called last, cleanup, say good bye, etc

  scaffolding() {
    console.log('scaffolding...');
    this.mkdir('src')
    this.mkdir('src/utils')
    this.mkdir('test')
  }

  generateDemoSection() {
    if(this.addDemoSection) {
      this.mkdir('demo')
    } 
  }
}

module.exports = MyGenerator