# xlib-webpack-react-test

boilerplate that shows how to use xlib, typescript, react, webpack together.

This mostly following instructions from http://www.typescriptlang.org/docs/handbook/react-&-webpack.html but using ts2 and types (not typings), and loading xlib, which is a library written in typescript.

### features

- webpack works
- bundles and minifies ```xlib``` to it's own file.
- typescript source maps load properly
- works down to ie9

### problems encountered:

- typescript projects don't work via ```npm link``` so have to publish to **@next** for dev builds
- webpack builtin modules don't play nicely with preloaders.  this is fixed in the webpack.config.js file (see the ```exclude``` sections)
- webpack doesn't like the ```source-map-support``` module that ```xlib``` uses, so we no-op it (see the ```module.loaders``` section in the webpack.config.js)

# prerequisites

1) Node+NPM installed (tested with 6.x)

# usage instructions

### dev building:  

you can do a syntax check build via ```tsc``` commandline or visual studio.

we strongly suggest using **Chrome** for testing because the ```xlib.logging``` is designed with Chrome in mind.

Also, you can use the chrome ```LiveReload``` extension along with ```webpack --watch``` to easily simulate hot reloading.

### running:  
1. checkout this repo, and run ```npm
1. ```npm install --global typescript webpack```
1. ```npm install```
1. ```webpack``` from the commandline
1. open the ```dist/index.html``` file in a webbrowser *(chrome suggested)*



