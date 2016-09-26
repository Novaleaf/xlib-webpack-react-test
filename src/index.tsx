import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/hello";

import * as xlib from "xlib";
//import xlib = require("../../xlib/dist/_index");
import _ = xlib.lodash;



//import _ = require("lodash");

//xlib.lodash.


interface test {
    strategy(name: string, scheme: string, mode?: boolean | string, options?: any): void;
    strategy(name: string, scheme: string, mode?: boolean | string): void;
    strategy(name: string, scheme: string, options?:any): void;
}

var x: test = null;



//console.log("is test = ", xlib.environment.isTest);

//test methods

let testFalsiesObj = {
    aNull: null as any,
    aUndefined: undefined as any,
    aZero: 0,
    aFalse: false,
    aNan: NaN,
    aInfinity:Infinity,
}

//



console.log("enumerating");

_.forEach(testFalsiesObj, (value:any, key:any, collection:any) => {
    console.log({ value, key });
});







ReactDOM.render(
    <Hello compiler="Typescript" framework="React"/>,
    document.getElementById("example")
);


//throw new Error("test lodash falsie enumeration");