
import * as blib from "blib";
import { React, ReactDom, Redux, ReactRedux, ReactRouter, ReactRouterRedux, ReduxLogger } from "blib";

export interface HelloProps {
    compiler: string;
    framework: string;
}




export class Hello extends React.Component<HelloProps, {}>{
    render() {
        return <h1>Hello this is the Xlib framework running with {this.props.compiler} and {this.props.framework}!</h1>;
    }
}