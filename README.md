# xlib-webpack-react-test

boilerplate that shows how to use xlib, typescript, react, webpack together.

This mostly following instructions from http://www.typescriptlang.org/docs/handbook/react-&-webpack.html but using ts2 and types (not typings), and loading xlib, which is a library written in typescript.

### features

- webpack works
- typescript source maps load properly
- works down to ie9

### problems encountered:

- typescript projects don't work via ```npm link``` so have to publish to **@next** for dev builds
- webpack builtin modules don't play nicely with preloaders.  this is fixed in the webpack.config.js file (see the ```exclude``` sections)


# prerequisites



# usage instructions

### dev building:  

you can do a syntax check build via ```tsc``` commandline or visual studio.

### running:  
1. checkout this repo, and run ```npm
1. ```npm install webpack -g```
1. ```npm install```
1. ```webpack``` from the commandline
1. open the ```dist/index.html``` file in a webbrowser *(chrome suggested)*



