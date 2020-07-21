## zero-config-react-webapp

Zero-config React app template, with Webpack (bundler), Babel (compiler), Eslint/Airbnb (strict code style linting) and Jest (unit tests) – all **pre-configured** and ready to go. You just add your code! You don't have to configure a thing (except when you want to deploy to a remote server).

### Supported Javascript features

ES6, ES2018 and beyond – via Babel (and the syntax is picked up by Sublime/VS Code editors):

- Export/Import
- Tagged templates
- Async functions 
- Await operator
- Spread operator
- Generator functions
- Map/Set objects
- WeakMap/WeakSet objects
- Object getters/setters
- Optional chaining
- and more...

### Awesome Linting

The project template uses a strict, highly disciplined Javascript code style (via Eslint/Airbnb). Please see Airbnb code style defaults [here](https://github.com/airbnb/javascript). When using Eslint/Airbnb, the code style will be virtually in-distinguishable from one developer to another (code **quality** may be different matter...). By enforcing a strict code style, the "mental friction" of getting into a new project is greatly reduced. 

As you are coding, lint issues show up in real time in **Sublime** and **VS Code** (when configured for linting), so you can fix lint errors right then and there. 

In some cases you'll have to override the strict linting rules, which is easy to do. This template project uses several such overrides.

To do a **lint** check of your project, run the command **`npm run lint`** or **`yarn lint`**.

## Directory Structure

```
Project
|- .babelrc (Babel compiler settings)
|– .eslintrc.json (Eslint linter settings)
|- .git
|- .gitignore
|- LICENSE.txt (MIT)
|- README.md (this file)
|- dist (distribution directory, can be rsync'ed somewhere else)
|  |- bundle.js (generated by Webpack, and included by index.html)
|  |- favicon.ico (static file)
|  |- index.html (static file)
|- node_modules
|- package.lock.json
|- package.json
|- src (code, tests and css go here)
|  |- App.js (Top level React component)
|  |- index.js (entry point)
|  |- test-babel.js
|  |- test-babel.test.js
|  |- styles.css
|– webpack.config.js (Webpack bundler settings)
```

### Commands

**`build-dev`** - Uses **Webpack** for a development build

**`build-prod`** - Uses **Webpack** for a production build

**`clean`** - Removes the **`./dist/build.js`** file

**`deploy`** - Deploys the app to an external server (using **ssh/rsync**, requires configuration)

**`lint`** - Lints the **`./src/js`** files using **Eslint**

**`start-dev-server`** - Starts the **Webpack** dev server

**`start-server`** - Starts a static server (using **http-server**)

**`start-remote-server`** - Starts a remote static server (**http-server**) in the background

**`test`** - Runs **Jest** on the test files in **`./src/js`**

### How to use

#### Required Global Depencies

- Node: ^14.2.0
- Npm: ^6.14.4
- Yarn: ^1.22.4 (it is not required to use Yarn, but it's is a convenient alternative to Npm)

#### Initial Steps

1. Make sure that you have recent versions of **`node`** (`node --version`) and **`npm`** (`npm --version`), and optionally **`yarn`** (`yarn --version`) on your system, see above. If not, find other resources on the web on how to install these utilities on your system
1. Decide on a **name** of your new front-end project
1. Log in to Github (or sign up). Without logging in, the following steps will **not** work
1. Go to [this repo](https://github.com/boeric/zero-config-modern-webapp) and then click the green **Use this template** button above and use the **name** for your new the **repository name**, decide on whether to make your repo public or private, then click the green **Create repository from template**, after which your new repository is created on GitHub
1. Clone the repo to your local system (see Github instructions if needed)
1. Install the dependencies by running **`npm install`** (or just **`yarn`**)
1. Start the dev server by running the **`start-dev-server`** command
1. With your browser, head to **`http://localhost:8080`** and open the browser's debugger
