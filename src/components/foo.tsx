
import * as blib from "blib";
import { React, ReactDom, Redux, ReactRedux, ReactRouter, ReactRouterRedux, ReduxLogger } from "blib";

import * as xlib from "xlib";

import _ = xlib.lodash;

var log = new xlib.logging.Logger(__filename);


export class Foo extends React.Component<{}, {}>{
    render() {
        return (<div>And I am Foo!</div>);
    }
}