## zero-config-modern-webapp

Zero-config modern front-end web app template, with Webpack (bundler), Babel (compiler), Eslint/Airbnb (strict code style linting), Jest (unit tests), and D3 (data visualization) – all **pre-configured** and ready to go. You just add your code! You don't have to configure a thing (except when you want to deploy to remote server).

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
|  |- index.js (entry point)
|  |- module.js
|  |- module.test.js
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
1. To run any of the commands listed below do **`npm run <command>`**, or **`yarn <command>`** 
1. Start the dev server by running the **`start-dev-server`** command
1. With your browser, head to **`http://localhost:8080`** and open the browser's debugger
1. Verify that you see the similar logs in the browser console output as the section below, and that you see **no** errors. If you don't see the expected output or if you see errors, revisit your steps

```
Testing Babel...
default export/import works
non-default export/import works
template string works
tagged template works
arrow works
arrow iife works
async function works
async iife works
spread works
generator works
Map works
Set works
WeakMap works
WeakSet works
getter works
setter works
optional chaining works
async/await works
```

1. Run the command **`test`** to test the **unmodified** project. If the tests don't run clean, again please retrace your steps
1. Run the command **`lint`** to verify that there are no lint errors in the **unmodified** project. If you see errors, again retrace your steps
1. If you see **any** errors when compiling/running the app, testing or linting it, there is **no point** in proceeding further. Please retrace your steps
1. If you don't plan to use **D3** in your project, do the following
- Remove the **`d3`** dependency in the **`package.json`** file, 
- Remove any references to **`d3`** in the **`./src/index.js`** file
- Do **`rm -rf node_modules`**
- Re-install the now-slimmed dependencies by running **`npm install`** (or just **`yarn`**)

#### Developing Your Project

1. Properly configured **Sublime** and **VS-Code** editors will pick up the Eslint/Airbnb settings and show you lint errors immediately in the editor
1. Keep the Webpack dev server running (by using the `start-dev-server` command) while working on your project. You'll see Webpack's **hot reloading** in action, meaning that you won't have to manually reload the app to see code changes as you save them in your editor (as the app is auto-reloaded upon save)
1. In general while developing the project, make frequent saves and inspect the app as it is being reloaded after each save. Also do frequent git commits (and push to origin)
1. Modify the **`README.md`** file to describe **your** project
1. Change the `favicon.ico` image file in the project root to an icon of your liking
1. Modify the **`./dist/index.html`** file to your needs (but don't change the `script` tag, nor the `license` reference)
1. Modify the **`./src/index.js`** and **`./src/styles.css`** to your needs. The `./src/module.js` is there only to demonstrate that `import/export` works, so remove it (and the associated test) if not needed. You can/should add other files as your app grows, and those new files need to use `export` of whatever symbols other files need to `import` and use. Please see MDN and other web resources for how `import/export` works
1. While in development mode, full source maps are produced so you can debug effectively in the browser's debugger (for example setting breakpoints)
1. When ready to build a **production** bundle, run the command `build-prod`. This will produce a smaller, minified version of the app, which will load faster
1. To view the production build in action, run the command `start-server`. In it's default configuration, it makes the app available at `localhost:8000`

#### Deployment (to a Linux type system)

Please note: Setting up deployment is **not** zero-config

1. If you have a public server somewhere on the internet, ensure that you have set up **`ssh`** access to that system, and that **`rsync`** works. 
1. If you **don't** have a working `ssh` connection to your remote system, find other resources on the web on how to set up `ssh`, then verify that you can login to your remote system over `ssh`, then return here. **No** point in proceeding if you don't have `ssh` working
1. In most Linux type systems, `rsync` is available and running by default. If not, please see other web resources how to get `rsync` working on your remote system
1. Head to your remote system with `ssh` and create a directory for the app somwhere under your **user** directory
1. Make sure that you have required versions of `node`, `npm`, and `yarn` (please see required versions above) and that they are installed globally on the remote system. If not, see other resources on the web for how to install these required dependencies. Do such install(s), and then return here. Please **do not** proceed until you've verified that these dependencies are available from the command line on your remote system
1. **Exit** from your remote system
1. On your **local** system, modify the **`deploy`** command in the `package.json` file to set the correct path argument to `rsync` to the just-created remote directory. Please note that the initial `deploy` command in package.json (`"deploy": "rsync -rzv --exclude 'node_modules' . username@host:/path-from-user-dir-to-project"`) is a placeholder and **must** be modified
1. Test and lint your project again locally (please see 'Developing your project' above), and fix any remaining issues before proceeding
1. Run the command `build-prod` to produce a production bundle in the local `./dist` directory
1. Fire up the production bundle locally, using the `start-server` command described above
1. Verify that the production app behaves as expected. If it doesn't, there is **no point** in proceeding
1. Deploy your app to the remote server by using the `deploy` command. **If** you have `ssh` access to your remote system and **if** you have configured the `deploy` command properly, the **whole repo** except for the `node_modules` directory will be copied to the remote system
1. Commit the changes to the **`package.json`** file to git

The following instructions and commands are done on the **remote** system:

1. **`ssh`** to the remote system and navigate to the target directory
1. Install the projects dependencies, by running either **`npm install`** or just **`yarn`**.
1. To view the production build in action on the remote server, run the command **`start-server`**. Use your browser to navigate to the server's IP address/url and port 8000, (for example `http://123.123.123.123:8000` or `http://mydemosite.org:8000`)
1. Check out that the app works as expected
1. Exit out of the `start-server` command
1. Run the **`start-remote-server`** command. This will run the server as a background process, no longer connected to your `ssh` session (so you can log out of the remote system without killing the server process). Hit enter until you get the command prompt
1. Do a hard reload of the app with your browser to verify that it still loads
1. Log out from the remote server
1. Your app is now deployed!

When you have made changes to the app and want to deploy the updates to the remote server, repeat the Deployment steps
