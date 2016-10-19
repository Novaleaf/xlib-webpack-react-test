webpackJsonp([0,3,4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {//basically a 1:1 implementation of the Redux todo-undo example, but in typescript and as a single file.
	"use strict";
	var blib_1 = __webpack_require__(1);
	var xlib = __webpack_require__(270);
	//import xlib = blib.xlib;
	var _ = xlib.lodash;
	var log = new xlib.logging.Logger(__filename);
	var _ezStates = [];
	var counter = __webpack_require__(603);
	_ezStates.push(counter);
	//log.info("here");
	//console.log("here");
	//const history = ReactRouter.createMemoryHistory(); //this works, at least in chrome, but no hashtag for location hints.
	var history = blib_1.ReactRouter.hashHistory; //works, creates hash fragments to store location
	/////////////// apply middleware
	var middleware = blib_1.Redux.applyMiddleware(
	/** need to apply this to use the push method,  see: https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions or https://github.com/reactjs/react-router-redux/issues/366 */
	blib_1.ReactRouterRedux.routerMiddleware(history), blib_1.ReduxLogger());
	///////////////  apply redux-devtools chrome extension if present
	//see: https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
	// get the extension from here:  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
	//procedurally inject the redux devtools extension if it's present
	var composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || blib_1.Redux.compose;
	//import our redux state objects and bind them
	var _rawReducers = {};
	_.forEach(_ezStates, function (state) {
	    state._initializeStart(_rawReducers);
	});
	_rawReducers["routing"] = blib_1.ReactRouterRedux.routerReducer; //include our routing module
	/**
	 *  //create a single reducer function from our components
	 */
	var reducer = blib_1.Redux.combineReducers(_rawReducers);
	/**
	 * the whole state tree of the app  use actions to manipulate
	 */
	var reduxStore = blib_1.Redux.createStore(reducer, composeEnhancers(middleware));
	blib_1.ReactRouterRedux.syncHistoryWithStore(history, reduxStore);
	_.forEach(_ezStates, function (state) {
	    state._initializeFinish(reduxStore);
	});
	var app_1 = __webpack_require__(604);
	var home_1 = __webpack_require__(605);
	var foo_1 = __webpack_require__(606);
	var bar_1 = __webpack_require__(607);
	var Router = blib_1.ReactRouter.Router;
	var IndexRoute = blib_1.ReactRouter.IndexRoute;
	var Route = blib_1.ReactRouter.Route;
	var Provider = blib_1.ReactRedux.Provider;
	/////////////  render to the page, a-la normal React.
	blib_1.ReactDom.render(blib_1.React.createElement(Provider, {store: reduxStore}, 
	    blib_1.React.createElement("div", null, 
	        blib_1.React.createElement(Router, {history: history}, 
	            blib_1.React.createElement(Route, {path: "/", component: app_1.App}, 
	                blib_1.React.createElement(IndexRoute, {component: home_1.Home}), 
	                blib_1.React.createElement(Route, {path: "foo", component: foo_1.Foo}), 
	                blib_1.React.createElement(Route, {path: "bar", component: bar_1.Bar}))
	        )
	    )
	), document.getElementById('react-mount') //make sure a dom-element with this id exists on the page
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ },

/***/ 603:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var blib = __webpack_require__(1);
	var ActionType;
	(function (ActionType) {
	    ActionType.INCREASE = "count.INCREASE";
	    ActionType.DECREASE = "count.DECREASE";
	})(ActionType || (ActionType = {}));
	var initialState = { countValue: 0 };
	exports.actions = {
	    increase: function (n) {
	        var toReturn = {
	            type: ActionType.INCREASE,
	            value: n,
	        };
	        return toReturn;
	    },
	    decrease: function (n) {
	        var toReturn = {
	            type: ActionType.DECREASE,
	            value: n,
	        };
	        return toReturn;
	    }
	};
	/**
	 * our reducer for applying the action to redux state.
	 * @param state
	 * @param action
	 */
	function _reducer(state, action) {
	    if (state === void 0) { state = initialState; }
	    switch (action.type) {
	        case ActionType.INCREASE:
	            return { countValue: state.countValue + action.value };
	        case ActionType.DECREASE:
	            return { countValue: state.countValue - action.value };
	        default:
	            //some situations such as actionType=="@@redux/INIT" occur.  so we need to return the entered state.
	            return state;
	    }
	}
	/**
	 *  set to true when the .initialize() method is invoked, by the app at startup.
	 */
	var _isInitialized = false;
	/**
	 * binds this state to your reactredux containers.  do not call manually, call as part of the redux app initialization
	 */
	function _initializeStart(
	    /** collection of reducers that will be combined later.   add your state reducer here */
	    reducers) {
	    if (_isInitialized === true) {
	        throw new Error("already initialized");
	    }
	    //add our reducer to be combined in the parent app
	    reducers["count"] = _reducer;
	}
	exports._initializeStart = _initializeStart;
	/**
	 *  set to true when the .initialize() method is invoked, by the app at startup.
	 */
	var _isInitializedAddReducer = false;
	/**
	 * do not call manually, call as part of the redux app initialization
	 */
	function _initializeFinish(
	    /** in case you need it, such as creating bound actions */
	    reduxStore) {
	    if (_isInitialized === true) {
	        throw new Error("already initialized");
	    }
	    _isInitialized = true;
	    exports.boundActions = blib.Redux.bindActionCreators(exports.actions, reduxStore.dispatch);
	}
	exports._initializeFinish = _initializeFinish;


/***/ },

/***/ 604:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var blib_1 = __webpack_require__(1);
	var xlib = __webpack_require__(270);
	var log = new xlib.logging.Logger(__filename);
	var Link = blib_1.ReactRouter.Link;
	var IndexRoute = blib_1.ReactRouter.IndexRoute;
	var Route = blib_1.ReactRouter.Route;
	var _internal;
	(function (_internal) {
	    var _App = (function (_super) {
	        __extends(_App, _super);
	        function _App(props) {
	            _super.call(this, props);
	            this.state = {};
	        }
	        _App.prototype.render = function () {
	            var _this = this;
	            return (blib_1.React.createElement("div", null, 
	                blib_1.React.createElement("header", null, 
	                    "Links:", 
	                    ' ', 
	                    blib_1.React.createElement(Link, {to: "/"}, "Home"), 
	                    ' ', 
	                    blib_1.React.createElement(Link, {to: "/foo"}, "Foo"), 
	                    ' ', 
	                    blib_1.React.createElement(Link, {to: "/bar"}, "Bar")), 
	                blib_1.React.createElement("div", null, 
	                    blib_1.React.createElement("button", {onClick: function () { return _this.props.pushPath('/foo'); }}, "Go to /foo")
	                ), 
	                blib_1.React.createElement("div", {style: { marginTop: '1.5em' }}, this.props.children)));
	        };
	        return _App;
	    }(blib_1.React.Component));
	    _internal._App = _App;
	})(_internal = exports._internal || (exports._internal = {}));
	/**
	 * a connected instance of the App component (bound to redux)
	 */
	exports.App = blib_1.ReactRedux.connect(null, { pushPath: blib_1.ReactRouterRedux.push } //redux-binds, then includes the pushPath() method for use in our _App Component
	)(_internal._App);
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ },

/***/ 605:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var blib_1 = __webpack_require__(1);
	var xlib = __webpack_require__(270);
	var log = new xlib.logging.Logger(__filename);
	var count = __webpack_require__(603);
	var _internal;
	(function (_internal) {
	    var _Home = (function (_super) {
	        __extends(_Home, _super);
	        function _Home() {
	            _super.apply(this, arguments);
	        }
	        _Home.prototype.render = function () {
	            var _this = this;
	            return (blib_1.React.createElement("div", null, 
	                "Some state change:", 
	                blib_1.React.createElement("div", null, 
	                    "countValue = ", 
	                    this.props.countState.countValue, 
	                    blib_1.React.createElement("br", null), 
	                    blib_1.React.createElement("button", {onClick: function () { _this.props.increase(1); } //the suggested way to execute actions is via bound props like this.
	                    }, "Increase"), 
	                    blib_1.React.createElement("button", {onClick: function () { return count.boundActions.decrease(1); } //but another way of doing it is via Redux.bindActionCreators
	                    }, "Decrease"))));
	        };
	        return _Home;
	    }(blib_1.React.Component));
	    _internal._Home = _Home;
	})(_internal = exports._internal || (exports._internal = {}));
	/**
	 * a connected instance of the Home component (bound to redux)
	 */
	exports.Home = blib_1.ReactRedux.connect(function (reduxState) {
	    return { countState: reduxState.count }; //map reduxStoreState to a property you use in the _Home component
	}, count.actions //redux-binds, then include our count actions as properties.   using Typescript, we have to cast as any for our class type signature to work
	)(_internal._Home);
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ },

/***/ 606:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var blib_1 = __webpack_require__(1);
	var xlib = __webpack_require__(270);
	var log = new xlib.logging.Logger(__filename);
	var Foo = (function (_super) {
	    __extends(Foo, _super);
	    function Foo() {
	        _super.apply(this, arguments);
	    }
	    Foo.prototype.render = function () {
	        return (blib_1.React.createElement("div", null, "And I am Foo!"));
	    };
	    return Foo;
	}(blib_1.React.Component));
	exports.Foo = Foo;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ },

/***/ 607:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var blib_1 = __webpack_require__(1);
	var xlib = __webpack_require__(270);
	var log = new xlib.logging.Logger(__filename);
	var Bar = (function (_super) {
	    __extends(Bar, _super);
	    function Bar() {
	        _super.apply(this, arguments);
	    }
	    Bar.prototype.render = function () {
	        return (blib_1.React.createElement("div", null, "And I am Bar!"));
	    };
	    return Bar;
	}(blib_1.React.Component));
	exports.Bar = Bar;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ }

});
//# sourceMappingURL=app.js.map