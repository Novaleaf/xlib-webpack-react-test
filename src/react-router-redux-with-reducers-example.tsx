//basically a 1:1 implementation of the Redux todo-undo example, but in typescript and as a single file.


import * as blib from "blib";
import { React, ReactDom, Redux, ReactRedux, ReactRouter, ReactRouterRedux, ReduxLogger } from "blib";

import * as xlib from "xlib";
import _ = xlib.lodash;

var log = new xlib.logging.Logger(__filename);










log.info("here");

console.log("here");


/**
 * organize by feature:  "count"
 * this contains all logic for incrementing/decrementing a counter for use in redux (manipulate the redux state)
 */
module count {

    module ActionType {
        export const INCREASE = "count.INCREASE";
        export const DECREASE = "count.DECREASE";
    }

    /**
     * using a class instead of an interface so we can combine implementation with typing.
     * 
     */
    export class IAction {
        public increase(n: number): IActionResult<number> {
            var action: IActionResult<number> = {
                type: ActionType.INCREASE,
                value: n,
            }
            return action;
        }
        public decrease(n: number): IActionResult<number> {
            var action: IActionResult<number> = {
                type: ActionType.DECREASE,
                value: n,
            }
            return action;
        }
    }
    /**
     * an instance of our class, these are the "actions" that are executable by our React components.
     * unfortunately you can't pass class-instances to redux, (the functions are not own-enumerable) so we need to use the prototype instead
     */
    export var action: IAction = (new IAction() as any)["__proto__"];


    const initialState = { number: 0 };
    /**
     * our reducer for applying the action to redux state.
     * @param state
     * @param action
     */
    export function reducer(state = initialState, action: IActionResult<number>) {
        if (action.type === ActionType.INCREASE) {
            return { number: state.number + action.value };
        } else if (action.type === ActionType.DECREASE) {
            return { number: state.number - action.value };
        }
        return state;
    }


}
/** the output of all redux actions should be in this form */
interface IActionResult<T> {
    type: string;  //required by redux
    value: T; // our opinionated encapsulation of state changes
}


module components {

    let Link = ReactRouter.Link;

    interface _AppProps extends ReactRouter.RouteComponentProps<{}, { id: number }> {
        pushPath: (path: string, state?: any, avoidRouterUpdate?: boolean | {}) => void;
    }
    class _App extends React.Component<_AppProps, {}>{
        constructor(props: any) {
            super(props);
            this.state = {};
        }
        render() {
            return (
                <div>
                    <header>
                        Links:
                        {' '}
                        <ReactRouter.Link to="/">Home</ReactRouter.Link>
                        {' '}
                        <ReactRouter.Link to="/foo">Foo</ReactRouter.Link>
                        {' '}
                        <ReactRouter.Link to="/bar">Bar</ReactRouter.Link>
                    </header>
                    <div>
                        <button onClick={() => this.props.pushPath('/foo')}>Go to /foo</button>
                    </div>
                    <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
                </div>
            );
        }
    }

    /**
     * a connected instance of the App component (bound to redux)
     */
    export var App: typeof _App = ReactRedux.connect(null, { pushPath: ReactRouterRedux.push } //redux-binds, then includes the pushPath() method for use in our _App Component
    )(_App) as any;

    export class Bar extends React.Component<{}, {}>{
        render() {
            return (<div>And I am Bar!</div>);
        }
    }

    export class Foo extends React.Component<{}, {}>{
        render() {
            return (<div>And I am Foo!</div>);
        }
    }

    interface _HomeProps extends ReactRouter.RouteComponentProps<{}, { id: number }> {
        number: number;
    }

    class _Home extends React.Component<_HomeProps & count.IAction, {}>{  //note: the "&" type operator was added in Typescript 1.6, allowing intersection of types (mixins).

        render() {
            return (
                <div>
                    Some state changes:
                    {this.props.number}
                    <button onClick={
                        () => { this.props.increase(1); } //the suggested way to execute actions is via bound props like this.
                    }>Increase</button>
                    <button onClick={
                        () => boundActions.decrease(1) //but another way of doing it is via Redux.bindActionCreators
                    }>Decrease</button>
                </div>

            );
        }
    }
    /**
     * a connected instance of the Home component (bound to redux)
     */
    export var Home: typeof _Home = ReactRedux.connect(
        (reduxState: any) => { //subscribes to reduxStore updates.  this method is called every time an update occurs.         
            return { number: reduxState.count.number }; //map reduxStoreState to a property you use in the _Home component
        },
        count.action as any //redux-binds, then include our count actions as properties.   using Typescript, we have to cast as any for our class type signature to work
    )(_Home) as any;

}


/**
 *  //create a single reducer function from our components
 */
const reducer = Redux.combineReducers({
    count: count.reducer, //our example 'count' reducer
    routing: ReactRouterRedux.routerReducer //include our routing module
});

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


/**
 * the whole state tree of the app  use actions to manipulate 
 */
const reduxStore = Redux.createStore(reducer,
    composeEnhancers(middleware)
);
ReactRouterRedux.syncHistoryWithStore(history, reduxStore);

/**
 *  an example of how to bind actions to redux without going through bound-components
 */
var boundActions = Redux.bindActionCreators(count.action as any, reduxStore.dispatch);



let Router = ReactRouter.Router;
let IndexRoute = ReactRouter.IndexRoute;
let Route = ReactRouter.Route;
let Provider = ReactRedux.Provider;
/////////////  render to the page, a-la normal React.
ReactDom.render(
    <Provider store={reduxStore}>
        <div>
            <Router history={history}>
                <Route path="/" component={components.App}>
                    <IndexRoute component={components.Home} />
                    <Route path="foo" component={components.Foo} />
                    <Route path="bar" component={components.Bar} />
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('react-mount') //make sure a dom-element with this id exists on the page
);
