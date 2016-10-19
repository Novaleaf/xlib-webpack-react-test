
import * as blib from "blib";
import { React, ReactDom, Redux, ReactRedux, ReactRouter, ReactRouterRedux, ReduxLogger } from "blib";

import * as xlib from "xlib";

import _ = xlib.lodash;

var log = new xlib.logging.Logger(__filename);


import count = require("../state/count");




export module _internal {

    export interface _HomeProps extends ReactRouter.RouteComponentProps<{}, { id: number }> {
        countState: count.ICountState;
    }

    export class _Home extends React.Component<_HomeProps & (typeof count.actions), {}>{  //note: the "&" type operator was added in Typescript 1.6, allowing intersection of types (mixins).

        render() {
            return (
                <div>
                    Some state change:
                <div>
                        countValue = {this.props.countState.countValue}<br/>
                        <button onClick={
                            () => { this.props.increase(1); } //the suggested way to execute actions is via bound props like this.
                        }>Increase</button>
                        <button onClick={
                            () => count.boundActions.decrease(1) //but another way of doing it is via Redux.bindActionCreators
                        }>Decrease</button>
                    </div>
                </div>

            );
        }
    }

}
/**
 * a connected instance of the Home component (bound to redux)
 */
export var Home: typeof _internal._Home = ReactRedux.connect(
    (reduxState: any) => { //subscribes to reduxStore updates.  this method is called every time an update occurs.         
        return { countState: reduxState.count }; //map reduxStoreState to a property you use in the _Home component
    },
    count.actions //redux-binds, then include our count actions as properties.   using Typescript, we have to cast as any for our class type signature to work
)(_internal._Home) as any;



