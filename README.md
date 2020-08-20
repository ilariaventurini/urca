<div align="center" style="text-align: center;">

  <h1>Urca generator</h1>

</div>

<!--<p align="center">
   npm version
  <a href="https://www.npmjs.com/package/urca">
    <img alt="npm"
      src="https://img.shields.io/npm/v/urca">
  </a>
</p>-->

---

A Yeoman generator to author JavaScript and TypeScript libraries.

## ⚙️ Getting started

Before we begin, make sure you have the [Yeoman scaffolding toolset](https://yeoman.io/learning/index.html) installed (`yo`), since it is part of the Yeoman tool set you might have installed it before.
Use npm to globally install `yo`:

```bash
npm install --global yo
```

If you have permissions problems installing a package globally, use a _super user_ or _sudo_:

```bash
sudo npm install --global yo
```

Once you have `yo` installed, you will need to install the _urca generator_ as well:

```bash
npm install --global urca
```

You are now ready to create your library!

---

## How to use

The _urca_ generator will help you create a JavaScript or TypeScript application in your working directory.
To create your library project, navigate to a new project folder and then use `yo` to generate your application:

```bash
yo urca
```

The generator will ask you a few questions and will generate it for you.

## Directory structure

When the installation process is over, this is the file structure that will be generated:

```bash
.
├── demo/              # demo page
│   └── index.html     # html entry point
│   └── index.j(t)s
│   └── style.css      # global style entry point
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

- [Prettier](https://prettier.io/) to format your Javascript
- [Eslint](https://eslint.org/) to lint your code
- [Parcel](https://parceljs.org/) to automagically compile ES6
- [TypeScript](https://github.com/Microsoft/TypeScript) - strongly-typed version of ES6
- Git initialization
- README
- MIT license

## Scripts

Once you have created the structure of your new app, these are the prompt commands you can run:

- `yarn start:demo`: to preview and watch for demo page changes ([http://localhost:1234](http://localhost:1234))
- `yarn build`: to build your webapp for production in `/dist`

## Questions the generator will ask

- app name
- app description
- keywords
- public or private repository
- JavaScript or TypeScript
- GitHub username
- GitHub email
- first and last name
- dependencies:
  - [lodash](https://lodash.com/)
  - [d3](https://github.com/d3/d3)
  - [tachyons](https://github.com/tachyons-css/tachyons)
  - [tachyons-extra](https://github.com/accurat/tachyons-extra)

## 🐛 Issues & contributing

This project is still in progress. Anyway, if you open an issue (or a PR), I will be happy :)

## Todo

- [] Jest because testing matters

## License

[MIT](https://github.com/ilariaventurini/urca/blob/master/LICENSE) © [Ilaria
Venturini](https://github.com/ilariaventurini)

<!--
TODO:
- [ ]
-->
