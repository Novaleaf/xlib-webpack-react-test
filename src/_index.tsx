//basically a 1:1 implementation of the Redux todo-undo example, but in typescript and as a single file.


import * as blib from "blib";
import { React, ReactDom, Redux, ReactRedux, ReactRouter, ReactRouterRedux, ReduxLogger } from "blib";

import * as xlib from "xlib";


//import xlib = blib.xlib;
import _ = xlib.lodash;

var log = new xlib.logging.Logger(__filename);





let _ezStates: blib.IReduxStateModule[] = [];
import * as counter from "./state/count";
_ezStates.push(counter);



//log.info("here");
//console.log("here");



//const history = ReactRouter.createMemoryHistory(); //this works, at least in chrome, but no hashtag for location hints.
const history = ReactRouter.hashHistory;//works, creates hash fragments to store location
/////////////// apply middleware
const middleware = Redux.applyMiddleware(

    /** need to apply this to use the push method,  see: https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions or https://github.com/reactjs/react-router-redux/issues/366 */
    ReactRouterRedux.routerMiddleware(history),
    ReduxLogger(),
    //redux-thunk goes here too
);


///////////////  apply redux-devtools chrome extension if present
//see: https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
// get the extension from here:  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

//procedurally inject the redux devtools extension if it's present
const composeEnhancers = (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || Redux.compose;



//import our redux state objects and bind them
let _rawReducers: blib.Redux.ReducersMapObject = {};

_.forEach(_ezStates, (state) => {
    state._initializeStart(_rawReducers);
});
_rawReducers["routing"] = ReactRouterRedux.routerReducer; //include our routing module
/**
 *  //create a single reducer function from our components
 */
const reducer = Redux.combineReducers(_rawReducers);

/**
 * the whole state tree of the app  use actions to manipulate 
 */
const reduxStore = Redux.createStore(reducer,
    composeEnhancers(middleware)
);
ReactRouterRedux.syncHistoryWithStore(history, reduxStore);


_.forEach(_ezStates, (state) => {
    state._initializeFinish(reduxStore);
});

import { App } from "./components/app";
import { Home } from "./components/home";
import { Foo } from "./components/foo";
import { Bar } from "./components/bar";

let Router = ReactRouter.Router;
let IndexRoute = ReactRouter.IndexRoute;
let Route = ReactRouter.Route;
let Provider = ReactRedux.Provider;
/////////////  render to the page, a-la normal React.
ReactDom.render(
    <Provider store={reduxStore}>
        <div>
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="foo" component={Foo} />
                    <Route path="bar" component={Bar} />
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('react-mount') //make sure a dom-element with this id exists on the page
);
