import * as blib from "blib";




module ActionType {
    export const INCREASE = "count.INCREASE";
    export const DECREASE = "count.DECREASE";
}

export type ICountState = {
    countValue: number;
}
const initialState: ICountState = { countValue: 0 };



export let actions = {
    increase(n: number): blib.IReduxActionResult<number> {
        let toReturn: blib.IReduxActionResult<number> = {
            type: ActionType.INCREASE,
            value: n,
        };
        return toReturn;
    },
    decrease(n: number): blib.IReduxActionResult<number> {
        let toReturn: blib.IReduxActionResult<number> = {
            type: ActionType.DECREASE,
            value: n,
        };
        return toReturn;
    }
};
/**
   *  an example of how to bind actions to redux without going through bound-components
   * IMPORTANT USAGE NOTE:  this is undefined until the initialize() method is called during app initialization.
   */
export let boundActions: typeof actions;

/**
 * our reducer for applying the action to redux state.
 * @param state
 * @param action
 */
function _reducer(state = initialState, action: blib.IReduxActionResult<number>): ICountState {
    switch (action.type) {
        case ActionType.INCREASE:
            return { countValue: state.countValue + action.value }

        case ActionType.DECREASE:
            return { countValue: state.countValue - action.value }
        default:
            //some situations such as actionType=="@@redux/INIT" occur.  so we need to return the entered state.
            return state;
    }
}

/**
 *  set to true when the .initialize() method is invoked, by the app at startup.
 */
let _isInitialized = false;

/**
 * binds this state to your reactredux containers.  do not call manually, call as part of the redux app initialization
 */
export function _initializeStart(
    /** collection of reducers that will be combined later.   add your state reducer here */
    reducers: blib.Redux.ReducersMapObject
) {
    if (_isInitialized === true) {
        throw new Error("already initialized");
    }

    //add our reducer to be combined in the parent app
    reducers["count"] = _reducer;

}


/**
 *  set to true when the .initialize() method is invoked, by the app at startup.
 */
let _isInitializedAddReducer = false;

/**
 * do not call manually, call as part of the redux app initialization
 */
export function _initializeFinish(
    /** in case you need it, such as creating bound actions */
    reduxStore: blib.Redux.Store<any>,
) {
    if (_isInitialized === true) {
        throw new Error("already initialized");
    }
    _isInitialized = true;

    boundActions = blib.Redux.bindActionCreators(actions, reduxStore.dispatch);

}

