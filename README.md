<div align="center" style="text-align: center;">

  <h1>🌳 Urca generator</h1>
  A Yeoman generator to author JavaScript and TypeScript libraries.

</div>

<p align="center">
  <!-- npm version -->
  <a href="https://www.npmjs.com/package/generator-urca">
    <img alt="npm"
      src="https://img.shields.io/npm/v/generator-urca">
  </a>
</p>

---

## How to use

The _urca_ generator will help you create a JavaScript or TypeScript application in your working directory.
To create your library project, **navigate to a new project folder** and then use [Yeoman](https://yeoman.io/learning/index.html) to generate your application:

```bash
npm init yo urca
```

The generator will ask you a few questions and will generate it for you.

## Questions the generator will ask

- app name
- app description
- app keywords
- public or private repository
- JavaScript or TypeScript
- add or not React to demo page
- GitHub username
- GitHub email
- first and last name
- dependencies:
  - [lodash](https://lodash.com/)
  - [d3](https://github.com/d3/d3)
  - [tachyons](https://github.com/tachyons-css/tachyons)
  - [tachyons-extra](https://github.com/accurat/tachyons-extra)

## Directory structure

When the installation process is over, this is the file structure that will be generated:

```bash
.
├── demo/              # demo page
│   └── index.html
│   └── index.j(t)s(x)
│   └── style.css
├── dist/              # distributable version of app built using Parcel
├── node_modules/      # npm managed libraries
├── src/               # project source code
│   └── lib/           # folder for your library
│      └── hello.j(t)s
│   └── index.j(t)s    # app entry point
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc.js
├── .yo-rc.json
├── LICENSE
├── package.json
├── README.md
├── (tsconfig.json)
├── yarn.lock
```

## Features

- [Prettier](https://prettier.io/) to format your code
- [Eslint](https://eslint.org/) to lint your code
- [Parcel](https://parceljs.org/) to automagically compile ES6
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [React](https://reactjs.org) to simplify the demo page development
- Git initialization
- README
- MIT license

## Scripts

Once you have created the structure of your new app, these are the prompt commands you can run:

- `yarn start:demo`: to preview and watch for demo page changes ([http://localhost:1234](http://localhost:1234))
- `yarn build`: to build your webapp for production in `/dist`

## Issues & contributing

This project is still in progress. Anyway, if you open an issue (or a PR), I will be happy :)

## Todo

- [ ] Jest because testing matters
- [ ] React
  - [ ] to lib
  - [x] to demo page

## License

[MIT](https://github.com/ilariaventurini/urca/blob/master/LICENSE) © [Ilaria
Venturini](https://github.com/ilariaventurini)
