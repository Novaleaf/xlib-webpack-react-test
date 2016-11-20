
import * as blib from "blib";
import { React, ReactDom, Redux, ReactRedux, ReactRouter, ReactRouterRedux, ReduxLogger } from "blib";


import * as xlib from "xlib";

import _ = xlib.lodash;

var log = new xlib.logging.Logger(__filename);


let Link = ReactRouter.Link;

let IndexRoute = ReactRouter.IndexRoute;
let Route = ReactRouter.Route;

import { Home } from "./home";
import { Foo } from "./foo";
import { Bar } from "./bar";


export module _internal {

    /** any component that is routed to by react-router will get a ReactRouter.RouteComponentProps */
    export interface _AppProps extends ReactRouter.RouteComponentProps<{}, { /**specify signature of props.routeParams*/ id: number }> {
        pushPath: (path: string, state?: any, avoidRouterUpdate?: boolean | {}) => void;
    }
    export class _App extends React.Component<_AppProps, {}>{
        constructor(props: any) {
            super(props);
            this.state = {};
        }
        render() {
//            log.info(this.props);
            return (
                <div>
                    <header>
                        Links:
                        {' '}
                        <Link to="/">Home</Link>
                        {' '}
                        <Link to="/foo">Foo</Link>
                        {' '}
                        <Link to="/bar">Bar</Link>
                    </header>
                    <div>
                        <button onClick={() => this.props.pushPath('/foo')}>Go to /foo</button>
                    </div>
                    <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
                </div>
            );
        }
    }
}
/**
 * a connected instance of the App component (bound to redux)
 */
export var App: typeof _internal._App = ReactRedux.connect(null, { pushPath: ReactRouterRedux.push } //redux-binds, then includes the pushPath() method for use in our _App Component
)(_internal._App) as any;