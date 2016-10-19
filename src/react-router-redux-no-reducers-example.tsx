//basically a 1:1 implementation of the Redux todo-undo example, but in typescript and as a single file.


import * as blib from "blib";
import { React, ReactDom, Redux, ReactRedux, ReactRouter, ReactRouterRedux, ReduxLogger } from "blib";

import * as xlib from "xlib";
import _ = xlib.lodash;

var log = new xlib.logging.Logger(__filename);





interface IAction {
    type: string;
    amount: number;
}

//import {  } from "redux-simple-router";



////////////////////////  CREATE REDUCERS

module constants {
    export const INCREASE = "INCREASE";
    export const DECREASE = "DECREASE";
}

module reducers {

    export module count {
        const initialState = { number: 1 };

        export function update(state = initialState, action: IAction) {
            if (action.type === constants.INCREASE) {
                return { number: state.number + action.amount };
            } else if (action.type === constants.DECREASE) {
                return { number: state.number - action.amount };
            }
            return state;
        }
    }
}



var reducerObj = _.assign({}, reducers, { routing: ReactRouterRedux.routerReducer });
const reducer = Redux.combineReducers(reducerObj);
const store = Redux.createStore(reducer);
const history = ReactRouter.hashHistory;//.createHashHistory();

//ReactRouterRedux.syncHistoryWithStore(history, store);
ReactRouterRedux.syncHistoryWithStore(history, store);



class MyAwesomeReactComponent extends React.Component<{}, {}> {

    render() {
        return (<div>
            {//<RaisedButton label="Default"/>
            }
            <div className="btn btn-primary">My Uber Buttan</div>
        </div>);
    }
}



class About extends React.Component<{}, {}>{
    render() {
        return (<h1>About</h1>);
    }
}
class Home extends React.Component<{}, {}>{
    render() {
        return (<h1>Home</h1>);
    }
}

class Message extends React.Component<MyComponentProps, {}>{
    render() {
        return <h3>message = {this.props.routeParams.id}</h3>;
    }
}
class Inbox extends React.Component<MyComponentProps, {}>{
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                { //render the child route component
                }
                {this.props.children}
            </div>
        );
    }
}


interface MyComponentProps extends ReactRouter.RouteComponentProps<{}, { id: number }> {
}

let Link = ReactRouter.Link;

class RouterExampleApp extends React.Component<MyComponentProps, {}>{
    public render() {

        //return (
        //    <div className="content">hi</div>
        //    );
        return (
            <div>
                <h1>RouterExampleApp</h1>
                {/* change the <a>'s to <Link>'s */}
                <ul>
                    <li><Link to="#">Main</Link></li>
                    <li><Link to="about">About</Link></li>
                    <li><Link to="inbox">Inbox</Link></li>
                </ul>
                {/* next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us */
                }
                {this.props.children}

            </div>
        );
    }
}










let Router = ReactRouter.Router;
let IndexRoute = ReactRouter.IndexRoute;
let Route = ReactRouter.Route;
let Provider = ReactRedux.Provider;

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={RouterExampleApp}>
                <IndexRoute component={Home} />
                <Route path="/about" component={About} />
                <Route path="/inbox" component={Inbox} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("react-mount")
);
